<template>
  <div class="admin tema">
    <app-header />
    <nuxt style="margin-bottom: 150px" />
    <app-footer style="position: fixed; width: 100%; bottom: 0" />
  </div>
</template>
<script>
import AppHeader from '~/components/sections/AppHeader'
import AppFooter from '~/components/sections/AppFooter'
export default {
  name: 'admin',
  scrollToTop: true,
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
<style lang="scss" scoped>
.admin {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $verde-escuro;
  color: #fff;
}
</style>
