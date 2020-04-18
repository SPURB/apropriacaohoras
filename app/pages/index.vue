<template>
  <div id="index">
    <auth-card />
    <div class="footer">
      <app-footer />
    </div>
  </div>
</template>

<script>
import AuthCard from '~/components/AuthCard'
import AppFooter from '~/components/AppFooter'

export default {
  name: 'Index',
  components: {
    AuthCard,
    AppFooter
  }
}
</script>
<style lang="scss" scoped>
#index {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>