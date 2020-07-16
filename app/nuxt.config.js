const apiBase = {
  prod: 'https://servicos.spurbanismo.sp.gov.br/apropriacaohoras/api/0.0.1',
  local: 'http://localhost:5000/apropriacaohoras/api/0.0.1',
  homolog: 'https://apropriacaohoras.herokuapp.com/apropriacaohoras/api/0.0.1'
}

const appBase = process.env.TRAVIS || process.env.NODE_ENV === 'prod' ? '/apropriacaohoras/' : '/'

export default {
  target: 'static',
  components: true,
  mode: 'spa',
  head: {
    htmlAttrs: { lang: 'pt-br' },
    title: 'SPUrbanismo | Apropriação de horas',
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
    ]
  },
  router: {
    base: appBase,
    middleware: ['authenticated']
  },
  env: {
    apiBase: apiBase[process.env.NODE_ENV],
    appBase
  },
  plugins: [{ src: '~/plugins/vuex-persist', ssr: false }],
  modules: [, '@nuxtjs/style-resources', '@nuxt/content'],
  buildModules: ['@nuxtjs/moment', '@nuxtjs/pwa', '@nuxtjs/google-analytics'],
  styleResources: {
    scss: ['@/assets/style/variables.scss', '@/assets/style/theme.scss']
  },
  googleAnalytics: {
    id: 'UA-113737634-10'
  },
  css: ['@/assets/style/icones/participe.css'],
  generate: {
    devtools: true,
    routes: ['/faq/cadastro']
  }
}
