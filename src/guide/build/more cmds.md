# Making more commands
First, let's add the one more line to the `.env` file:
```env
PREFIX=!
```
The prefix should now be set as `!`. Now, to access the prefix, we just need to type `process.env.PREFIX` in `index.js`.
::: tip
If you aren't familiar with some of the syntax, it might be ES6. Read up about it [here](https://www.w3schools.com/js/js_es6.asp).
:::
::: warning ATTENTION
Insert the following ***AFTER*** `require('dotenv').config();` in `index.js`
```js
const prefix = process.env.PREFIX;
```
:::
We already have a simple command structure with an `if/else` chain, but since we are using `message.content`, it only check the whole message, which is...well...inflexible. It would work if you typed `!ping`, but not if you typed `!ping test`. The same goes for the other command. If you want your commands to be more flexible, you can do the following:
```js{2-8}
bot.on("messageCreate", (message) => { // When a message is created
    if(message.content.startsWith(`${prefix}ping`)) { // If the message content is "!ping"
        message.channel.createMessage("Pong!");
        // Send a message in the same channel with "Pong!"
    } else if(message.content.startsWith(`${prefix}pong`) { // Otherwise, if the message is "!pong"
        message.channel.createMessage("Ping!");
        // Respond with "Ping!"
    }
});

```

Note that we are using template literals, <code>``</code>, which is ES6 syntax. As I said, go read up about them if you're not familiar with them.
