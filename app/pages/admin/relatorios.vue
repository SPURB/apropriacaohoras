<template>
  <div class="admin-relatorios">
    <h2>admin relatórios</h2>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'AdminRelatorios',
  layout: 'admin',
  created () {
    this.getRelatorios(this.idUsuario)
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorios'])
  }
}
</script>
