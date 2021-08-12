# Code examples
Here's a couple of code example for each library to help you decide:

## Yuuko

Usage found on its website:
```js
// index.js
const { Client } = require('yuuko');
const mybot = new Client({
  token: 'token',
  prefix: '!',
});
mybot
  .addDir(path.join(__dirname, 'commands'))
  .addDir(path.join(__dirname, 'events'))
  .connect();
```
```js
// ./commands/category/command-file.js
// OR
// put `command-file.js` anywhere under `./commands`
const { Command } = require('yuuko');
module.exports = new Command(['args', 'arguments'], (message, args) => {
  message.channel.createMessage(`Arguments: ${args.join(', ')}`);
});
```
```js
// ./events/category/event-file.js
// OR
// put `event-file.js` anywhere under `./events`
const { EventListener } = require('yuuko');
module.exports = new EventListener('ready', (context) => {
  // Reference properties of the client directly while handling an event
  console.log(`Ready as ${context.client.user.username}`);
});
```
The API Docs can be found [here](https://eritbh.me/yuuko/docs/).

## Cyclone Engine
Here's some examples found in the README:
```js
const {
  TOKEN
} = process.env

const Eris = require('eris')
const {
  Agent
} = require('cyclone-engine')

const handlerData = require('./data/')

function postFunction (msg, results) {
  if (results) console.log(`${msg.timestamp} - **${msg.author.username}** > *${results.command.name}*`)
}

const agent = new Agent({
  Eris,
  token: TOKEN,
  handlerData,
  options: {
    connectRetryLimit: 5,
    prefix: '.',
    postEventFunctions: {
      message: postFunction,
      reaction: postFunction
    }
  }
})

agent.connect()
```
```js
// place in .js file under ./data
const {
  Command,
  Await
} = require('cylcone-engine')

const data = {
  name: 'ban',
  desc: 'Ban a user',
  options: {
    args: [{ name: 'username', mand: true }]
  },
  action: ({ client, msg, args: [username] }) => {
    const user = client.users.find((u) => u.username.toLowerCase() === username.toLowerCase())

    if (!user) return '`Could not find user.`'

    const rspData = new Await({
      options: {
        args: [{ name: 'response', mand: true }],
        timeout: 10000,
        onCancelFunction: () => msg.channel.createMessage('Ban cancelled.').catch((ignore) => ignore)
      },
      action: ({ args: [response] }) => {
        if (response.toLowerCase() === 'yes') {
          return client.banMember(user.id, 0, 'Banned by: ' + msg.author.username)
            .then(() => 'User banned')
            .catch(() => '`Bot does not have permissions.`')
        } else return 'Ban cancelled.'
      }
    })

    return {
      content: `Are you sure you want to ban `${user.username}`? (Cancels in 10 seconds)`,
      awaits: rspData
    }
  }
}

module.exports = new Command(data)
```
[Cyclone Engine API documentation](https://exorift.github.io/cyclone-engine/)

## Eris boiler
Found in documentation:
```js
// index.js
const { join } = require('path')
const { DataClient } = require('eris-boiler')

/* create DataClient instance */
const options = {
  oratorOptions: {
    defaultPrefix: '!!' // sets the default prefix to !!
  },
  statusManagerOptions: {
    defaultStatus: { // sets default discord activity
      type: 0,
      name: 'a game'
    },
    mode: 'random' // sets activity mode to random, the bot will change status on an interval
  }
}

const bot = new DataClient('YourBotToken', options)

bot
  .addCommands(join(__dirname, 'src/commands')) // load commands in src/commands folder
  .addEvents(join(__dirname, 'src/events')) // load events in src/events folder
  .connect()
```
```js
// src/commands/echo.js
const { Command } = require('eris-boiler')

module.exports = new Command({
  name: 'echo', // name of command
  description: 'copy that',
  run: async ({ params }) => params.join(' ') // functionality of command
  // list of things in object passed to run: bot (DataClient), msg (Message), params (String[])
})
```
```js
// src/events/presenceUpdate.js
const { DiscordEvent } = require('eris-boiler')

module.exports = new DiscordEvent({
  name: 'presenceUpdate', // name should match event name
  run: (bot, newMember, oldMember) => console.log('something changed')
  // bot is bound to all events, so bot will be the first parameter in addition to any parameters passed in from Eris
})
```
[Eris Boiler documentation](https://alex-taxiera.github.io/eris-boiler/)
# Conclusion
That's a few libraries for you to consider. You can choose whichever library that suits you, there is no *best*. I personally prefer Yuuko, as it is lightweight (has no dependencies other than Eris, which it installs as a peer dependency) and simple to use.
