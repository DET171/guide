const { description } = require('../../package')
const path = require('path');

module.exports = {
  markdown: {
    lineNumbers: true
  },
  templateDev: path.join(__dirname, 'templates', 'index.dev.html'),
	templateSSR: path.join(__dirname, 'templates', 'index.ssr.html'),
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: `Eris: A Discord Bot Guide`,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#7354ff' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    lang: 'en-US',
    repoLabel: '',
    //searchPlaceholder: 'Search the Guide...',
    editLinks: false,
    docsRepo: 'https://github.com/DET171/guide',
    docsBranch: 'master',
    docsDir: 'src',
    editLinkText: 'Edit this page',
    lastUpdated: false,
    navbar: [
      // NavbarItem
      {
        text: 'Guide(s)',
        children: [
          {
            text: 'v0.15.1',
            link: '/v0.15.1/',
          },
        ],
      },
      {
        text: 'For Reference',
        link: '/ref/',
      },
      {
        text: 'Official Eris Docs',
        link: 'https://abal.moe/Eris/docs/getting-started'
      },
      {
        text: 'Docs Repo',
        link: 'https://github.com/DET171/guide'
      }
    ],
    sidebar: {
      '/v0.15.1/': [
        {
          text: 'Home',
          children: [
            '/v0.15.1/',
            '/v0.15.1/prerequisites.md',
          ]
        },
        {
          text: 'Getting started',
          children: [
            '/v0.15.1/Getting started.md',
            '/v0.15.1/linter.md',
          ]
        },
        {
          text: 'Building a bot',
          children: [
            '/v0.15.1/build/',
            '/v0.15.1/build/more cmds.md',
          ]
        },
        {
          text: 'More Advanced Features',
          children: [
            '/v0.15.1/build/handler',
            '/v0.15.1/build/help',
          ]
        },
        {
          text: 'Third-party command handlers',
          children: [
            '/v0.15.1/ch/',
            '/v0.15.1/ch/ex'
          ]
        },
        {
          text: 'Miscellaneous',
          children: [
            '/v0.15.1/build/misc',
          ]
        }
      ],
      '/ref/': [
        {
          text: 'References',
          children: [
            '/ref/',
          ]
        },
        {
          text: 'Objects',
            children: [
            '/ref/guild.md',
            '/ref/channel.md',
            '/ref/member.md',
            '/ref/message.md',
            '/ref/log.md',
            '/ref/int.md',
            '/ref/perms.md',
            '/ref/events.md',
          ]
        },
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/last-updated',
    '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
        },
      },
      getExtraFields: (page) => page.headers ?? [],
    },
  ]
}
