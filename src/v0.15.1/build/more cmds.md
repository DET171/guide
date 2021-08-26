# Making more commands
First, let's add the one more line to the `.env` file:
```
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

Note that we are using template literals(<code>``</code>), which is ES6 syntax. As I said, go read up about them if you're not familiar with them. We can insert variables in them by using `${variable-name}`. <br>
Now the ping command will trigger whenever the message *starts with* `!ping`! Sometimes this is what you want, but other times, you may want to match only exactly `!ping` - it varies from case to case, so be mindful of what you need when creating commands.

::: warning
Be aware that this will also match `!pingpong`, `!pinguin`, and the like. This behavior may or may not be a problem for you, but don't worry; you'll see better ways to check for commands later.
:::

# Commands that display information

Now let's make a few commands that display information. Install the moment module: `npm i moment --save`
## Server information
Here's the command with the comments that explain it:
```js
if(message.content.startsWith(`${prefix}server`)) { // command name
  const moment = require('moment');
  const guild = message.channel.guild; // get the guild object
  const owner = guild.members.get(guild.ownerID); // get the guild's owner (object)
  message.channel.createMessage({ // send the message
    embed: { // the embed object
      title: 'Guild Information', // embed title
      description: `Guild information for ${guild.name} (id: \`${guild.id}\`)`, // embed description
      color: 11272041, // embed color (base-10 interger)
      thumbnail: { // thumbnail picture
        url: guild.iconURL, // set the guild's icon url as picture url
      },
      fields: [ // embed fields
        {
          name: 'Owner:',
          value: `${owner.username}#${owner.discriminator} (id: \`${guild.ownerID}\`)`, // owner/user information
          inline: false, // if the field should be inline (boolean)
        },
        {
          name: 'Created at:',
          value: `${moment.utc(guild.createdAt).format('MMMM, Do YYYY, h:mm:ss a')}`, // time the guild was created at, displayed as UTC time
          inline: false,
        },
        {
          name: 'Member count:',
          value: `${guild.memberCount} members`, // guild member count
          inline: false,
        },
      ],
      footer: {
        text: 😏, // embed footer text
      },
    },
  });
}
```
So there! We have also learnt how to send an embed!
You can learn more about the `embed`, `user` and `guild` object here:
- [User](https://abal.moe/Eris/docs/User)
- [Guild](https://abal.moe/Eris/docs/Guild)
- [Embed](https://discord.com/developers/docs/resources/channel#embed-object)

That's it for this part!
