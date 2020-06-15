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
    base: process.env.CI ? '/apropriacaohoras/' : '/', // https://spurb.github.io/apropriacaohoras/
		middleware: [ 'authenticated' ]
  },
  env:{
    apiBase: 'https://apropriacaohoras.herokuapp.com/apropriacaohoras/0.0.1'
  },
  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false }
  ],
	mode: 'spa',
  buildModules: [
		'@nuxtjs/style-resources',
		'@nuxtjs/moment'
	],
  styleResources: {
    scss: [
			'@/assets/style/variables.scss',
			'@/assets/style/theme.scss'
		]
  },
  css: [ '@/assets/style/icones/participe.css' ],
  generate: {
    dir: process.env.CI ? 'gh-pages' : 'dist'
  }
}
