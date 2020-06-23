<template>
  <div class="usuario tema">
    <app-header />
    <nuxt style="margin-bottom: 150px" />
    <app-footer style="position: fixed; width: 100%; bottom: 0" />
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
