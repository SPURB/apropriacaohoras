export default {
	head: {
    htmlAttrs: { lang: 'pt-br' },
    title: "SPUrbanismo | Apropriação de horas",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
	},
  router: {
    base: process.env.CI ? '/apropriacaohoras/' : '/' // https://spurb.github.io/apropriacaohoras/
  },
  env:{
    apiBase: 'https://apropriacaohoras.herokuapp.com'
  },
	mode: 'spa',
	router: {
		middleware: ['authenticated']
	},
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['@/assets/style/variables.scss', '@/assets/style/theme.scss']
  },
  css: ['@/assets/style/icones/participe.css'],
  generate: {
    dir: process.env.CI ? 'gh-pages' : 'dist'
  }
}
