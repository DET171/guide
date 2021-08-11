# A Command Handler
Unless your bot project is a small one, it's not a very good idea to have a single file with a giant if/else if chain for commands. If you want to implement features into your bot and make your development process a lot less painful, you'll want to implement a command handler. Let's get started on that!  <br>

Here's the base code we'll be using:
```js
const Eris = require('eris');
require('dotenv').config();
const bot = new Eris(process.env.TOKEN);

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("error", (err) => {
  console.error(err);
});

bot.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
		message.channel.createMessage('Pong!');
	} else if (command === 'beep') {
		message.channel.createMessage('Boop!');
	}
});

bot.connect();
```
Note the *slight* changes we have made on lines 14-23. <br>
Let me explain:<br>
Those are to facilitate the command handler we will be making, and and also to make writing `if/else` chains easier, even if you do not plan on using the commad handler. <br>
Now, let me explain the code.

```js
if (!message.content.startsWith(prefix) || message.author.bot) return;
```
The above is to check if the message starts with the prefix or if the author is a bot. If the message does not start with the prefix or the author is a bot or both, then return and end stop the code from running.
<br>
Then, we parse the message:
```js
const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();
```
We separate the prefix (and throw it into the bin) and the message, thus the `prefix.length`. We then [trim](https://www.w3schools.com/jsref/jsref_trim_string.asp) the message, [split](https://www.w3schools.com/jsref/jsref_split.asp) the it by its spaces (any amount of spaces, in fact, between the words) and take the first word of the array and set it as the command (you see, who actually uses a command with a spaces?).
Now, we only need to check the `command` variable to determine the command, instead of using the lengthy `message.content.startsWith()`. Neat.

## The command handler code
We need to create a few folders first.
Again, open the command propmt/terminal. Run the following:
```bash
mkdir commands
cd commands
mkdir misc # command category
```
Note that we created the `misc` folder. As you can see, it is a category for commands. We will place JS files in it.
::: danger
DO NOT place JS files under the `./commands` folder. If you do that, it will throw an error with the following code.
:::
Now, for the code.
Replace the current code in `index.js` (I will explain by comments in the code):
```js
// index.js
const Eris = require('eris');
require('dotenv').config();
const bot = new Eris(process.env.TOKEN);
const fs = require('fs');
const prefix = process.env.PREFIX;

bot.commands = new Eris.Collection();
bot.cooldowns = new Eris.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		bot.commands.set(command.name, command);
		console.log(command.name);
	}
}

bot.on('ready', () => {
	console.log('Ready as ' + bot.user.username + '#' + bot.user.discriminator);
});

bot.on('messageCreate', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if(commandName === 'foo') {
		bot.createMessage(message.channel.id, 'Bar!');
	}


	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;


	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author.mention}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.createMessage(reply);
	}

	const { cooldowns } = bot;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Eris.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return bot.createMessage(message.channel.id, `${message.author.mention}, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, bot, prefix);
	}
	catch (error) {
		console.error(error);
		bot.createMessage(message.channel.id, `<@${message.author.id}>, there was an error trying to execute that command!`);
	}

});

bot.connect();
```
