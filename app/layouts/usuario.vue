<template>
  <div class="usuario">
    <app-header />
    <nuxt style="margin-bottom: 150px" />
    <app-footer style="position: fixed; width: 100%; bottom: 0" />
  </div>
</template>
<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
export default {
  name: 'usuario',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
<style lang="scss" scoped></style>
