const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'yandex-verification', content: '2d946d542581bf1f' },
      {
        name: 'keywords',
        content:
          'открытые позиции, ммвб, динамика, анализ, биржа, трейдинг, графическое представление, визуализация, фьючерс газпром, фьючерс сбербанк, фьючерс доллар, фьючерс нефть'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    USD_RATES_URL: process.env.USD_RATES_URL,
    USD_TOM_RATES_URL: process.env.USD_TOM_RATES_URL,
    CALENDARIFIC_URL: process.env.CALENDARIFIC_URL,
    CALENDARIFIC_API_KEY: process.env.CALENDARIFIC_API_KEY,
    // `http://moex.com/ru/derivatives/open-positions-csv.aspx?d=${date}&t=1`
    MOEX_CSV_BASE_URL: process.env.MOEX_CSV_BASE_URL,
    INITIAL_FEATURE_CODE: process.env.INITIAL_FEATURE_CODE || 'Si_F',
    MAX_API_TIMEOUT: process.env.MAX_API_TIMEOUT || 10000
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-select.js', ssr: false }
    // { src: '~/plugins/moex.js' }
    // { src: '~plugins/datetime-picker.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.BASE_URL,
    browserBaseURL: process.env.BASE_URL
    // debug: true
  },

  /*
   ** Build configuration
   */
  build: {
    // https://github.com/charliekassel/vuejs-datepicker/issues/491
    transpile: ['vuejs-datepicker'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: ['~/server/api']
}
