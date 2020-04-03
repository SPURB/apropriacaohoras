const repoName = (process.env.TRAVIS_REPO_SLUG || '').split('/').pop()

export default {
  router: {
    base: process.env.CI ? repoName : '/' // https://spurb.github.io/relatorios/
  },
  mode: 'spa',
  modules: ['@nuxtjs/style-resources'],
  styleResources: {
    scss: ['@/assets/style/variables.scss', '@/assets/style/theme.scss']
  },
  css: ['@/assets/style/icones/participe.css']
}
