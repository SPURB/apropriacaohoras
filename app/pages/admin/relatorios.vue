<template>
  <div class="admin-relatorios">
    <h2>admin relatórios</h2>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AdminRelatorios',
  layout: 'admin',
  computed: {
    ...mapGetters('relatorios', ['projetosCardMap'])
  },
  created () {
    this.getRelatorios()
    this.getHorasProjeto()
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorios', 'getHorasProjeto'])
  }
}
</script>
