<template>
  <div class="admin">
    <nuxt />
    <app-footer style="position: static; width: 100%;" />
  </div>
</template>
<script>
import AppFooter from '~/components/AppFooter'
export default {
  name: 'admin',
  components: {
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
}
</style>
