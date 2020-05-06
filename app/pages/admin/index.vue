<template>
  <div class="admin">
    index de admin
    <router-link to="/registrar">registrar</router-link>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'adminIndex',
  computed: {
    ...mapState({
      admin: state => state.usuario.admin
    })
  }
}
</script>
