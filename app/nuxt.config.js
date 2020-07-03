const apiBase = {
  prod: 'https://servicos.spurbanismo.sp.gov.br/apropriacaohoras/api/0.0.1',
  local: 'http://localhost:5000/apropriacaohoras/api/0.0.1',
  homolog: 'https://apropriacaohoras.herokuapp.com/apropriacaohoras/api/0.0.1'
}

export default {
  target: 'static',
  mode: 'spa',
  head: {
    htmlAttrs: { lang: 'pt-br' },
    title: "SPUrbanismo | Apropriação de horas",
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
  },
  router: {
    base: process.env.CI || process.env.NODE_ENV === 'prod' ? '/apropriacaohoras/' : '/',
    middleware: [ 'authenticated' ]
  },
  env:{
    apiBase: apiBase[process.env.NODE_ENV]
  },
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/moment',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics'
  ],
  styleResources: {
    scss: [
      '@/assets/style/variables.scss',
      '@/assets/style/theme.scss'
    ]
  },
  googleAnalytics: {
    id: 'UA-113737634-10'
  },
  css: [ '@/assets/style/icones/participe.css' ],
  generate: {
    dir: process.env.CI ? 'gh-pages' : 'dist'
  }
}
