# The Message object
```js
Message {
  id: '875247077448359936',
  type: 0,
  timestamp: 1628745564568,
  channel: TextChannel {
    id: '852164079123955742',
    type: 0,
    client: Client {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      options: [Object],
      requestHandler: [RequestHandler],
      ready: true,
      bot: true,
      startTime: 1628745562058,
      lastConnect: 0,
      channelGuildMap: [Object],
      shards: [ShardManager [Map]],
      groupChannels: [Collection [Map]],
      guilds: [Collection [Map]],
      privateChannelMap: {},
      privateChannels: [Collection [Map]],
      guildShardMap: [Object],
      unavailableGuilds: [Collection [Map]],
      relationships: [Collection [Map]],
      users: [Collection [Map]],
      presence: [Object],
      userGuildSettings: [],
      userSettings: {},
      notes: {},
      voiceConnections: [VoiceConnectionManager [Map]],
      connect: [Function: bound connect] AsyncFunction,
      lastReconnectDelay: 0,
      reconnectAttempts: 0,
      commands: [Collection [Map]],
      cooldowns: [Collection [Map]],
      gatewayURL: 'wss://gateway.discord.gg/?v=6&encoding=json',
      user: [ExtendedUser],
      application: [Object],
      [Symbol(kCapture)]: false
    },
    guild: Guild {
      id: '852141536694239273',
      shard: [Shard],
      unavailable: false,
      joinedAt: 1623240400770,
      voiceStates: [Collection [Map]],
      channels: [Collection [Map]],
      members: [Collection [Map]],
      memberCount: 10,
      roles: [Collection [Map]],
      applicationID: null,
      name: 'The Twelfth Legion Fulminata',
      verificationLevel: 0,
      splash: null,
      discoverySplash: null,
      banner: null,
      region: 'singapore',
      ownerID: '725573213622632468',
      icon: '8b6cb1cdb96103443d3f2951c372ec82',
      features: [],
      emojis: [],
      afkChannelID: null,
      afkTimeout: 300,
      defaultNotifications: 1,
      mfaLevel: 0,
      large: false,
      explicitContentFilter: 0,
      systemChannelID: null,
      systemChannelFlags: 0,
      premiumTier: 0,
      premiumSubscriptionCount: 0,
      vanityURL: null,
      preferredLocale: 'en-US',
      description: null,
      maxMembers: 100000,
      publicUpdatesChannelID: null,
      rulesChannelID: null,
      maxVideoChannelUsers: 25,
      nsfw: false
    },
    name: 'server-config',
    position: 7,
    parentID: '852162921541664800',
    nsfw: false,
    permissionOverwrites: Collection(5) [Map] {
      '852141536694239273' => [PermissionOverwrite],
      '852142934349971456' => [PermissionOverwrite],
      '852143034190659604' => [PermissionOverwrite],
      '852143170523234305' => [PermissionOverwrite],
      '852160533913927680' => [PermissionOverwrite],
      baseObject: [class PermissionOverwrite extends Permission],
      limit: undefined
    },
    rateLimitPerUser: 0,
    topic: null,
    messages: Collection(1) [Map] {
      '875247077448359936' => [Message],
      baseObject: [class Message extends Base],
      limit: 100
    },
    lastMessageID: '875247077448359936',
    lastPinTimestamp: null
  },
  content: '-foo',
  hit: false,
  reactions: {},
  guildID: '852141536694239273',
  messageReference: null,
  flags: 0,
  author: User {
    id: '725573213622632468',
    bot: false,
    system: false,
    avatar: '642b710b8166953a412aaafa9df1b0e7',
    username: '𝓐𝓭𝓶𝓲𝓻𝓪𝓵 𝓒𝓪𝓷𝓪𝓻𝓲𝓼'              ,
    discriminator: '0340',
    publicFlags: 64
  },
  referencedMessage: null,
  interaction: null,
  member: Member {
    id: '725573213622632468',
    guild: Guild {
      id: '852141536694239273',
      shard: [Shard],
      unavailable: false,
      joinedAt: 1623240400770,
      voiceStates: [Collection [Map]],
      channels: [Collection [Map]],
      members: [Collection [Map]],
      memberCount: 10,
      roles: [Collection [Map]],
      applicationID: null,
      name: 'The Twelfth Legion Fulminata',
      verificationLevel: 0,
      splash: null,
      discoverySplash: null,
      banner: null,
      region: 'singapore',
      ownerID: '725573213622632468',
      icon: '8b6cb1cdb96103443d3f2951c372ec82',
      features: [],
      emojis: [],
      afkChannelID: null,
      afkTimeout: 300,
      defaultNotifications: 1,
      mfaLevel: 0,
      large: false,
      explicitContentFilter: 0,
      systemChannelID: null,
      systemChannelFlags: 0,
      premiumTier: 0,
      premiumSubscriptionCount: 0,
      vanityURL: null,
      preferredLocale: 'en-US',
      description: null,
      maxMembers: 100000,
      publicUpdatesChannelID: null,
      rulesChannelID: null,
      maxVideoChannelUsers: 25,
      nsfw: false
    },
    user: User {
      id: '725573213622632468',
      bot: false,
      system: false,
      avatar: '642b710b8166953a412aaafa9df1b0e7',
      username: '𝓐𝓭𝓶𝓲𝓻𝓪𝓵 𝓒𝓪𝓷𝓪𝓻𝓲𝓼'              ,
      discriminator: '0340',
      publicFlags: 64
    },
    game: null,
    nick: 'Admiral Canaris',
    roles: [
      '852142110240538624', '852143839691145216',
      '852143891306119169', '852165115636875264',
      '852167229537648640', '852143344268345354',
      '852143866349486091', '852168095313035276',
      '852168425384312842', '852143253582643220',
      '852143297744601108', '852143592680062996',
      '852167614582620180', '852143925891301406',
      '852168868629970975', '852169353884598302',
      '852169510077464606', '852143699441877032',
      '852167448916787240', '852167807692701757',
      '852169020828549181', '852167691530666061'
    ],
    joinedAt: 1623236774386,
    premiumSince: null,
    pending: false
  },
  mentionEveryone: false,
  mentions: [],
  roleMentions: [],
  pinned: false,
  tts: false,
  attachments: [],
  embeds: []
}
```