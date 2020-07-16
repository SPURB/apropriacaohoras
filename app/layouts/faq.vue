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
import { mapState } from 'vuex'

export default {
  name: 'faq',
  scrollToTop: true,
  components: {
    AppFooter,
    Voltar
  },
  computed: {
    ...mapState('usuario', ['admin']),
    from () {
      const { from } = this.$route.query
      if (from) {
        return from
      } else {
        return this.admin ? '/admin' : '/registrar'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.faq {
  min-height: 100vh;
  margin: auto;
  color: #f4f4f4;
  line-height: 1.62;
  &__voltar {
    width: 100%;
  }
  &__content {
    min-height: 100vh;
    @media (max-width: $desktop) {
      padding: 1rem 2rem;
    }
    @media (max-width: $phone) {
      padding: 1rem 2rem;
    }
  }
  &__footer {
    margin-top: 3rem;
  }
}
</style>
