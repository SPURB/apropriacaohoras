<template>
  <div class="usuario tema">
    <app-header />
    <nuxt />
    <app-footer />
  </div>
</template>
<script>
import AppHeader from '~/components/sections/AppHeader'
import AppFooter from '~/components/sections/AppFooter'
export default {
  name: 'usuario',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
<style lang="scss" scoped></style>
