<template>
  <div class="faq">
    <nuxt />
    <app-footer class="faq__footer" />
  </div>
</template>
<script>
import AppFooter from '~/components/sections/AppFooter'
export default {
  name: 'faq',
  scrollToTop: true,
  components: {
    AppFooter
  }
}
</script>
<style lang="scss" scoped>
.faq {
  width: 100%;
  margin: auto;
  min-height: 100vh;
  color: white;
  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
