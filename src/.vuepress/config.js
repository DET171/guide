const path = require('path');
const { description } = require(path.join(__dirname, '../../package.json'))
const sidebar = require(path.join(__dirname, './sidebar.js'));
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  shouldPrefetch: true,
  bundler: process.env.DOCS_BUNDLER ?? (isProd ? '@vuepress/webpack' : '@vuepress/vite'),
    // use vite in dev, use webpack in prod
  theme: path.resolve(__dirname, 'theme', 'index.js'),
  templateDev: path.join(__dirname, 'templates', 'index.dev.html'),
	templateSSR: path.join(__dirname, 'templates', 'index.ssr.html'),
  markdown: {
    code: {
      lineNumbers: false,
    }
  },
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
            text: 'Eris',
            children: [
              {
                text: 'v0.15.1',
                link: '/v0.15.1/',
              },
            ],
          },
          {
            text: 'Syntax',
            children: [
              {
                text: 'ES6',
                link: '/ES6/',
              },
            ]
          },
          {
            text: 'Others',
            children: [
              {
                text: 'Improving your dev environment',
                link: '/misc/dev',
              },
            ]
          }
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
    sidebar,
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-toc',
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/plugin-last-updated',
    ['@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
        },
        getExtraFields: (page) => {
          return page.headers ?? [];
        },
      },
    ],
    ['@vuepress/plugin-shiki',
      {
        theme: 'github-dark',
        langs: ['js', 'html', 'css', 'bash', 'json'],
      },
    ],
  ]
}
