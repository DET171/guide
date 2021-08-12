# Introduction

[Eris](https://github.com/abalabahaha/eris) is a lightweight Node.js library for interacting with the [Discord API](https://discord.com/developers/docs/intro). Larger bots tend to use Eris instead of [Discord.js](https://github.com/discordjs/discord.js), as Eris is smaller in size and faster. Discord.js covers 100% of the Discord API, but that also means is uses more memory and bots using it tend to have performance issues when they go big. <br>
However, the fact that Eris doesn't cover 100% of the Discord API is nothing to worry about. For example, you can `require` the buttons directly from the `discord.js` package, but for Eris, you can't. Still, there is absolutely no need to worry! The community has come up with NPM packages like [discord-buttons](https://www.npmjs.com/package/discord-buttons). <br>
So, if you've read until here and decided that you still want to learn Eris, you can proceed to the next section.
::: warning
This tutorial is for `v0.15.1` of Eris, which is good for bots in less than 100 servers. However, if your bot is in more than 100 servers, this version is not suitable for you as access to message content will become a Privileged Intent—like presence and guild member data—for developers building or managing verified Discord bots and apps.
[Read more](https://support-dev.discord.com/hc/en-us/articles/4404772028055)<br>
(Coming into effect April 2022)
:::
<br>

::: warning DISCLAIMER
This is NOT an official Eris guide. This is just a tutorial made by a user of Eris who thinks that Eris lacks a user/beginner-friendly guide.
:::

(This guide is modelled after the Discord.js guide)