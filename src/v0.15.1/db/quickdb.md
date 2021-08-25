# Making a currency system with Quick.db
We will use Quick.db to store data this time. We will be making a currency system with Quick.db, which honestly isn't the best practice, but I'm doing it to demonstrate how use Quick.db. In my opinion, I think that Quick.db is easier to use than Sequelize.<br>
We will be using `async`/`await` operators, so make sure you have a Node.js version that supports it.
## Installation
:::: code-group
:::code-group-item NPM
```sh
npm i quick.db --save
```
:::
::: code-group-item YARN
```sh
yarn add quick.db
```
:::
::::
## Using Quick.db
Quick.db doesn't require much configuration. All you need to do to use it is to require it:
```js
const db = require('quick.db');
```
## Creating an account
Each user who uses your bot needs an account. First, create a `create` command. Then, we check if the user already has an account by using Quick.db's `db.has()` function, and return if they do:
```js
if(db.has(message.author.id)) {
  return message.channel.createMessage(`${message.author.mention}, you already have an account!`);
}
```
If the user doesn't have an account, let's be kind and give them $10: 
```js
db.add(`${message.author.id}.bal`, 10);
```
Just to be sure that it's added properly, let's fetch it:
```js
const bal = db.get(`${message.author.id}.bal`);
```
Now, let's send a message to the user and tell him how much he has:
```js
message.channel.createMessage(`Done! ${message.author.mention}, you now have $${bal}`);
```
There! We have created an account.
### Force the user to create an account
If you want your user to create an account before doing anything else, you can add this after the following:
```js{4-6}
if (!message.content.startsWith(prefix) || message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();
if (!db.has(message.author.id) && commandName != 'create') {
	return message.channel.createMessage(`${message.author.mention}, you don't have an account yet! Run \`${prefix}create\` to create one!`);
}
```
## Making a `beg` command
We need a command to give the user money, so let's make a beg command. As usual, create a `beg` command file.
You can get a random name just for fun, and let's use `got` for it. Run `npm i got --save` and add `const got = require('got');` at the top of your file. Now, look for `execute(...)` in your file and replace it with `async execute(...)` if you haven't done so yet.<br>
Fetch a random user profile and get the name from it: 
```js
const result = await got('https://randomuser.me/api/');
const person = JSON.parse(result.body);
const name = person.results[0].name.first + ' ' + person.results[0].name.last;
```
Calculate the amount of money the user should get: 
```js
const amount = Math.floor(Math.random() * 30) + 1;
```
and add it to the user's balance:
```js
db.add(`${message.author.id}.bal`, amount);
```
Finally, tell the user how much he got:
```js
message.channel.createMessage({
  embed: {
		title: name,
		description: `${message.author.mention}, you went begging and found $${amount}!`,
		footer: {
			text: '😏',
		},
	},
});
```
## Making a shop
Most currency bots have a shop system. Let's make one, too! Create a `shop` command file.

Require Quick.db, and as you might not want to store the shop and user information together in the same table, let's create a new one:
```js
// NOTE: Put this outside of your module.exports
const shop = new db.table('shop');
```
Add a couple of items:
```js{3-25}
// NOTE: Put this outside of your module.exports
const shop = new db.table('shop');
shop.set('🍪 Cookie.cost', 5);
shop.set('🍪 Cookie.type', 'collectable');
shop.set('🍪 Cookie.d', 'A random cookie found on the streets');

shop.set('☠ Poison.cost', 9000);
shop.set('☠ Poison.type', 'collectable');
shop.set('☠ Poison.d', 'Some cyanide that\'s only used for flexing');

shop.set('🍟 Fries.cost', 11);
shop.set('🍟 Fries.type', 'collectable');
shop.set('🍟 Fries.d', 'Some yummy fries from McDonald\'s');

shop.set('🔳 Emoji.cost', 1);
shop.set('🔳 Emoji.type', 'unsellable');
shop.set('🍪 Cookie.type', 'collectable');

shop.set('💵 Cash.cost', 100);
shop.set('💵 Cash.type', 'unbuyable');
shop.set('💵 Cash.d', 'Sell this for some quick cash');

shop.set('🎟 Ticket.cost', 30);
shop.set('🎟 Ticket.type', 'power-up');
shop.set('🎟 Ticket.d', 'Buy this scratch ticket and try your luck?');
```
Add the shop variable to your `module.exports`, so that it looks something like this:
```js{5}
module.exports = {
	name: 'shop',
	description: 'view the shop',
	args: false,
	shop,
	execute(message, args) {
      // ...
    }
};
```
::: warning NOTE
The following code is supposed to be put in `execute(message, args)`
:::
First, we initialize an empty array for the embed fields and fetch all the items of the shop (which is returned in an array):
```js
const shoplist = [];
const shopll = shop.all();
```
We then push the different items and their properties to the array `shoplist`:
```js
for (let i = 0; i < shopll.length; i++) {
  const currentItem = {
    name: shopll[i].ID,
    value: `${shopll[i].data.d}\nCost: \`$${shopll[i].data.cost}\` \n Type: \`${shopll[i].data.type}\` \n ID: \`${shopll[i].ID}\``,
	  inline: false,
  }
};
shoplist.push(currentItem);
```
Finally, we send it:
```js
message.channel.createMessage({
	embed: {
		title: 'Shop',
        fields: shoplist,
		footer: {
			text: '💸',
		},
	},
});
```
## A `buy` command
For this, we will need the package [`fuzzy-search`](https://www.npmjs.com/package/fuzzy-search). Proceed to install it:
:::: code-group
::: code-group-item NPM
```sh
npm i fuzzy-search --save
```
:::
::: code-group-item YARN
```sh
yarn add fuzzy-search 
```
:::
::::
Now, create a `buy` command. Let's change some of the parameters so that your `module.exports` look something like the following:
```js
module.exports = {
	name: 'buy',
	description: 'buy something',
	args: true,
	usage: '<item> <amount?>',
	execute(message, args) {
      // ...
    }
};
```
We need to `require` a couple of things, so add this at the top of the file:
```js
const db = require('quick.db');
const { shop } = require('./shop.js');
const FuzzySearch = require('fuzzy-search');
```
Now, get the item and the amount the user wants to buy, and create a new fuzzy search (pardon me for the weird variable names):
```js
const item = args[0];
const amt = parseInt(args[1]) || 1;
const shoop = shop.all();
const searcher = new FuzzySearch(shoop, ['ID']);
```
Create a `try`/`catch` block to handle errors:
```js
try {
  
}
catch(e) {
  console.error(e);
}
```
::: warning NOTE
The following is to be placed inside the `try {}` block.
:::
Now, get the search result, and in case you haven't noticed, there's and item type called `unbuyables`, which as you guessed, aren't buyable:
```js
const result = searcher.search(item);
if(result[0].data.type == 'unbuyable') {
	return message.channel.createMessage(`${message.author.mention}, you cannot buy \`unbuyables\`!`);
}
```
Get the item cost, check if the user has enough money to buy the item(s), deduct the amount from his balance, and add the items to his inventory:
```js
const res = parseInt(result[0].data.cost);
if(db.get(`${message.author.id}.bal`) < res * amt) return message.channel.createMessage('Hey you don\'t even have enough money LMAO');
db.subtract(`${message.author.id}.bal`, res * amt);
db.add(`${message.author.id}.inv.${result[0].ID}`, amt);
```
Finally, inform the author:
```js
message.channel.createMessage(`${message.author.mention}, you succesfully bought **${amt} ${result[0].ID}(s)**`);
```
Tell the author if the item he requested for doesn't exist (add this to the `catch(e) {}` block):
```js{3}
catch(e) {
	console.warn(e);
	return message.channel.createMessage('Sorry, that item fails to exist. Could you try another one or type in the full name?');
}
```
## The `inv` command
Since the user has items, he should be able to view them. This is what the `inv` command does; it shows the user's inventory.
Here's the complete code for the file:
```js
const db = require('quick.db');

module.exports = {
	name: 'inv',
	aliases: ['inventory'],
	description: 'view your inventory',
	args: false,
	execute(message, args, prefix) { 
		if(!db.has(`${message.author.id}.inv`)) {
			return message.channel.createMessage('Your inventory is empty. Type `' + prefix + 'shop` to view some items.');
		}
		const invdisp = [];
		const inv = db.get(`${message.author.id}.inv`);
		for(i in inv) {
			const str = `${inv[i]} ${i}(s) \n`;
			invdisp.push(str);
		}
		const invstr = invdisp.join('\n');
		message.channel.createMessage({
			embed: {
				title: `${message.author.username}'s inventory`,
				description: invstr,
			},
		});
	},
};
```
This is about the most basics for a currency bot, you can view an example in this [GitHub repository](https://github.com/DET171/Currency-bot-beta).