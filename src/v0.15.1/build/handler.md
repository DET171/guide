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
const Eris = require('eris'); // require eris
require('dotenv').config(); // require variables from .env file
const bot = new Eris(process.env.TOKEN); // create bot instance
// or new Eris.Client(`Bot ${process.env.TOKEN}`);
const fs = require('fs'); // require file system API
const prefix = process.env.PREFIX; // set prefix variable

bot.commands = new Eris.Collection(); // create new command collection
bot.cooldowns = new Eris.Collection(); // create new cooldown collection
/* you can read more about collections here:
https://abal.moe/Eris/docs/Collection */

const commandFolders = fs.readdirSync('./commands'); // read the `./commands` directory for folders

for (const folder of commandFolders) { // repeat for the number of folders in `./commands`
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    /* ^^ read all the files in the different folders ending with `.js` under `./commands` ^^ */
	for (const file of commandFiles) { // repeat for the number of `commandFiles`
		const command = require(`./commands/${folder}/${file}`); // read the exported values in the `.js file`
		bot.commands.set(command.name, command); // set the command in the `commands` collection
		console.log(command.name); // log the command name (to show that it has loaded)
	}
}

bot.on('ready', () => {
	console.log('Ready as ' + bot.user.username + '#' + bot.user.discriminator);
    // log the client (a.k.a. bot) tag when it has logged in
});

bot.on('messageCreate', async (message) => { // `messageCreate` event
	if (!message.content.startsWith(prefix) || message.author.bot) return;
    // return if author is bot or message
	const args = message.content.slice(prefix.length).trim().split(/ +/); // get the arguments
	const commandName = args.shift().toLowerCase(); // get the command

	if(commandName === 'foo') { // if commandName is 'foo'
		bot.createMessage(message.channel.id, 'Bar!'); // send 'bar!'
        // ^^ method 2 for sending messages
	}


	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    // get the command
	if (!command) return;
    // return if command doesn't exist

	if (command.args && !args.length) { // if command requires arguments but no arguments were provided
		let reply = `You didn't provide any arguments, ${message.author.mention}!`;

		if (command.usage) { // if command usage is provided
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.createMessage(reply); // send and stop
	}

	const { cooldowns } = bot; // get the `cooldowns` collection from the client/bot instance

	if (!cooldowns.has(command.name)) { // if the cooldown doesn't have the command
		cooldowns.set(command.name, new Eris.Collection()); // add to collection
	}

	const now = Date.now(); // get current milliseconds elapsed since January 1, 1970 00:00:00 UTC
	const timestamps = cooldowns.get(command.name); // get command from cooldowns
	const cooldownAmount = (command.cooldown || 3) * 1000; // check if there the cooldown duration is provided, if not, take it as 3
    // ^^ convert to ms

	if (timestamps.has(message.author.id)) { // if has author id
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount; // get exp time

		if (now < expirationTime) { // if current time is less than exp time
			const timeLeft = (expirationTime - now) / 1000; // get time left
			return bot.createMessage(message.channel.id, `${message.author.mention}, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            // ^^ tell author time left before he can reuse command
		}
	}

	timestamps.set(message.author.id, now); // set the timestamp
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); // delete author id from list when time is up

	try {
		command.execute(message, args, prefix); // if all goes well, execute the command
        // ^^ pass the `message`, `args`, and `prefix` variable to the command files
	}
	catch (error) { // catch error to stop bot from crashing
		console.error(error); // log error
		bot.createMessage(message.channel.id, `<@${message.author.id}>, there was an error trying to execute that command!`);
        // tell author there was error executing the command
	}
});

bot.connect(); // finally, connect to Discord
```
## The command file code
This is the boilerplate code for the command files:
```js
module.exports = {
	name: 'ping',
	description: 'ping pong 🏓',
	aliases: ['pong'],
    args: false,
	usage: 'command ?<name>',
	cooldown: 5,
	async execute(message, args, prefix) {
  }
};
```
::: warning PARAMETERS
| Parameter name        | Required           | Description      |
| :-------------------: |:----------------:  | :-----:           |
| Name                  | :heavy_check_mark: | Command trigger  |
| Description           | :heavy_check_mark: | command description    |
| aliases               | :x:                |    command trigger aliases        |
| args   | :x: (but recommended)  | whether arguments are needed for this command  |
| usage   | :x: ( :heavy_check_mark: if `args: true`)  | How to use this command  |
| cooldown   | :x: (defaults to 3)  | How long the user needs to wait before reusing this command (in seconds)  |
| `execute(message, args, prefix)`  | :heavy_check_mark:  | The code that should be executed when the command is triggered  |
:::


Now, for the examples.
Under `./commands/misc/`, create a file named `args.js`.
Dump the following code inside:
```js
module.exports = {
	name: 'ping',
	description: 'ping pong 🏓',
	aliases: ['pong'],
    args: false,
	usage: 'command ?<name>',
	cooldown: 5,
	async execute(message, args, prefix) {
    if (!args.length) { // check for arguments
			return message.channel.createMessage(`You didn't provide any arguments, ${message.author}!`);
		} else if (args[0] === 'foo') { // if the first argument is 'foo' (the argument is an array)
			return message.channel.createMessage('bar'); // send 'bar'
		}
		message.channel.createMessage(`Arguments: ${args.join(', ')}`);
      // if none of the above, send the arguments joined with ', '.
	}
};
```
