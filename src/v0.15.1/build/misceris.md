# Eris Functions
The `<Client>` in the following examples would be `bot`, if you followed the first few sections.
## Editing your bot's status
You have probably seen users change statuses on Discord. Well, bots can, too!<br>
There are a few Discord statuses: <br>
[![](https://www.howtogeek.com/wp-content/uploads/2020/10/Discord-Desktop-Preset-Statuses-edit.png?trim=1,1&bg-color=000&pad=1,1)]() <br>
*(Source: [How to Geek](https://www.howtogeek.com/wp-content/uploads/2020/10/Discord-Desktop-Preset-Statuses-edit.png?trim=1,1&bg-color=000&pad=1,1))*
<br>
You can edit the bot status by using the following:
```js
<Client>.editStatus('dnd');
```
A list of statuses:
- DnD
- Online
- Idle
- Invisible

[Read more](https://abal.moe/Eris/docs/Client#method-editStatus)

## Get a member
```js
const guild = message.channel.guild; // get the guild object
const member = guild.members.get('<UserID>');
```

## Edit a member
```js
const options = {
  nick: 'simp',
  deaf: true,
};
const reason = 'For being a jerk';
<Member>.edit(options, reason);
```
More [here](https://abal.moe/Eris/docs/Member#method-edit)

## DM Someone
```js
const channel = <Client>.getDMChannel('<UserID>');
channel.createMessage('This is a DM!');
```

## Create channel
```js
const options = { // NOTE: Every option is optional
  nsfw: false,
  bitrate: 64, // Voice Channel only
  reason: 'For fun',
  rateLimitPerUser: 5, // slowmode, in seconds
}
<Client>.createChannel('<GuildID>', '<ChannelName>', '<ChannelType>', options);
// Channel type: 0 (text), 2 (voice), 4 (category), 5 (news), 6 (store), or 13 (stage)
```

## Edit a text channel
```js
const options = {
  name: 'Edited Channel',
  rateLimitPerUser: 5, // slow mode in seconds
  nsfw: false,
};
const channel = message.channel;
channel.edit(options, 'The channel was wrong');
```
More [here](https://abal.moe/Eris/docs/TextChannel#method-edit)
