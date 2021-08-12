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
  title: 'Eris: A Discord Bot Guide',
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
    repoLabel: '',
    searchPlaceholder: 'Search the Guide...',
    editLinks: false,
    docsDir: 'DET171/guide',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide (v0.15.1)',
        link: '/v0.15.1/',
      },
      {
        text: 'For Reference',
        link: '/ref/',
      },
      {
        text: 'Official Eris Docs',
        link: 'https://github.com/abalabahaha/eris'
      },
      {
        text: 'Docs Repo',
        link: 'https://github.com/DET171/guide.git'
      }
    ],
    sidebar: {
      '/v0.15.1/': [
        {
          title: 'Home',
          collapsable: false,
          children: [
            '',
            'prerequisites',
          ]
        },
        {
          title: 'Getting started',
          collapsable: false,
          children: [
            'Getting started',
            'linter',
          ]
        },
        {
          title: 'Building a bot',
          collapsable: false,
          children: [
            'build/',
            'build/more cmds',
            'build/misc'
          ]
        },
        {
          title: 'More Advanced Features',
          collapsable: false,
          children: [
            'build/handler',
            'build/help',
          ]
        },
        {
          title: 'Third-party command handlers',
          collapsable: false,
          children: [
            'ch/',
            'ch/ex'
          ]
        }
      ],
      '/ref/': [
        {
          title: 'References',
          collapsable: false,
          children: [
            '',
          ]
        },
        {
          title: 'Objects',
          collapsable: false,
          children: [
            'guild',
            'channel',
            'member',
            'message',
            'log',
            'int',
            'perms',
            'events',
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
  ]
}
