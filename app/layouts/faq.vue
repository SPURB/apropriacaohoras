<template>
  <div class="faq">
    <voltar class="faq__voltar" :to="from" />
    <nuxt class="faq__content" />
    <app-footer class="faq__footer" />
  </div>
</template>
<script>
import AppFooter from '~/components/sections/AppFooter'
import Voltar from '~/components/router-links/Voltar'

export default {
  name: 'faq',
  scrollToTop: true,
  components: {
    AppFooter,
    Voltar
  },
  computed: {
    from () {
      const { from } = this.$route.query
      return from ? from : '/'
    }
  }
}
</script>
<style lang="scss" scoped>
.faq {
  min-height: 100vh;
  margin: auto;
  color: white;
  &__voltar {
    width: 100%;
    margin-bottom: 5rem;
  }
  &__content {
    min-height: 100vh;
    @media (max-width: $tablet) {
      padding: 1rem;
    }
  }
  &__footer {
    margin-top: 3rem;
  }
}
</style>
