export default {
  router: {
    base: '/'
  },
  env:{
    apiBase: 'http://localhost:5000'
  },
  mode: 'spa',
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['@/assets/style/variables.scss', '@/assets/style/theme.scss']
  },
  css: ['@/assets/style/icones/participe.css']
}
