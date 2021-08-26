# Start building your bot
I will not be talking about how to create a bot account, get the bot token etc. That should be quite simple. However, should you require any assistance, feel free to refer [here](https://v12.discordjs.guide/preparations/setting-up-a-bot-application.html).

Now, we're finally getting to the exciting parts! Since your bot is in your server now, the next step is to start coding and get it online.

# Creating the bot file
Open up your terminal/Command Prompt, navigate to the root folder of your project and run the following:
```bash
# For Windows, run `npm i -g touch-cli`
touch index.js # or <insert-name>.js
touch .env
```
Now, open `index.js` and `.env` in your text editor.

# Logging into Discord
Once you've created `index.js`, do a quick check to see if you have everything setup correctly. Copy & paste the following code into `index.js` and save it. Don't worry if you don't understand it right away—we explain more in-depth after this.
```js
// index.js
const Eris = require('eris');
require('dotenv').config();
const bot = new Eris(process.env.TOKEN);
// Replace TOKEN with your bot account's token

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.on("messageCreate", (message) => { // When a message is created
    if(message.content === "!ping") { // If the message content is "!ping"
        message.channel.createMessage("Pong!");
        // Send a message in the same channel with "Pong!"
    } else if(message.content === "!pong") { // Otherwise, if the message is "!pong"
        message.channel.createMessage("Ping!");
        // Respond with "Ping!"
    }
});

bot.connect(); // Get the bot to connect to Discord
```
Put the following in `.env`
```
TOKEN=your-bot-token
```
I will now explain it. <br>
First, we require the `eris` and `dotenv` module, and create a bot client:
```js
const Eris = require('eris');
require('dotenv').config();
const bot = new Eris(process.env.TOKEN); // TOKEN from the .env file
```
Get the bot to print "Ready!" in the console when it has logged in, and print the error in the console when it encounters an error:
```js
bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});
```
Listen for the `messageCreate` event:
```js
bot.on("messageCreate", (message) => {
  // ...
});
```
Check the message content, if the content is `!ping`, send "Pong!" in the channel. If the content in `!pong`, send "Ping!" in the channel.
```js{2-8}
bot.on("messageCreate", (message) => { // When a message is created
    if(message.content === "!ping") { // If the message content is "!ping"
        message.channel.createMessage("Pong!");
        // Send a message in the same channel with "Pong!"
    } else if(message.content === "!pong") { // Otherwise, if the message is "!pong"
        message.channel.createMessage("Ping!");
        // Respond with "Ping!"
    }
});
```


Although it's not a lot, at least we learnt how to send and recieve messages. We will be writing more command in the next part.
