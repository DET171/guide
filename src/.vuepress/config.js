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
    searchPlaceholder: 'Search something...',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/abalabahaha/eris'
      }
    ],
    sidebar: {
      '/guide/': [
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
          ]
        }
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
