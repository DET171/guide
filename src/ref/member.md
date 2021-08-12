# The Member object
```js
Member {
  id: '855809890975350814',
  guild: Guild {
    id: '852141536694239273',
    shard: Shard {
      id: 0,
      client: [Client],
      onPacket: [Function: bound onPacket],
      connecting: false,
      ready: true,
      preReady: true,
      requestMembersPromise: {},
      getAllUsersCount: {},
      getAllUsersQueue: [],
      getAllUsersLength: 1,
      guildSyncQueue: [],
      guildSyncQueueLength: 1,
      unsyncedGuilds: 0,
      latency: 231,
      lastHeartbeatAck: true,
      lastHeartbeatReceived: 1628746468295,
      lastHeartbeatSent: 1628746468064,
      status: 'ready',
      connectTimeout: null,
      seq: 7,
      sessionID: '125630c26b46af61ff01f11b4cbc822a',
      reconnectInterval: 1000,
      connectAttempts: 0,
      ws: [WebSocket],
      heartbeatInterval: Timeout {
        _idleTimeout: 41250,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 1275,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: 41250,
        _destroyed: false,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 44,
        [Symbol(triggerId)]: 28
      },
      guildCreateTimeout: null,
      globalBucket: [Bucket],
      presenceUpdateBucket: [Bucket],
      presence: [Object],
      discordServerTrace: [Array]
    },
    unavailable: false,
    joinedAt: 1623240400770,
    voiceStates: Collection(0) [Map] {
      baseObject: [class VoiceState extends Base],
      limit: undefined
    },
    channels: Collection(1) [Map] {
      '854703118674296850' => [TextChannel],
      baseObject: [class GuildChannel extends Channel],
      limit: undefined
    },
    members: Collection(1) [Map] {
      '848166639367094302' => [Member],
      baseObject: [class Member extends Base],
      limit: undefined
    },
    memberCount: 10,
    roles: Collection(1) [Map] {
      '855810648980848651' => [Role],
      baseObject: [class Role extends Base],
      limit: undefined
    },
    applicationID: null,
    name: 'Test server',
    verificationLevel: 0,
    splash: null,
    discoverySplash: null,
    banner: null,
    region: 'some-region',
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
    id: '855809890975350814',
    bot: true,
    system: false,
    avatar: null,
    username: 'Bob the Titan',
    discriminator: '2415',
    publicFlags: 0
  },
  game: null,
  nick: null, // nickname
  roles: [ '855810648980848651' ], // array of roles IDs
  joinedAt: 1624111558985,
  premiumSince: null,
  pending: false
}
```
