<template>
  <div class="pre-impressao-admin-pagina-1">
    <pre-impressao-a4 :paginationIndex="1" :paginationTotal="1">
    </pre-impressao-a4>
  </div>
</template>
<script>
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PreImpressaoAdminPagina1',
  components: {
    PreImpressaoA4
  },
  computed: {
    ...mapState('admin/pre-impressao/pagina1', [
      'fases',
      'projeto',
      'grupo',
      'usuarios',
      'horas'
    ])
  },
  methods: {
    ...mapActions('admin/pre-impressao/pagina1', [
      'getProjetoInfo',
      'getUsuarios',
      'getHoras'
    ]),
    fetchData () {
      const { projeto } = this.$route.query
      this.getProjetoInfo(projeto)
      this.getUsuarios(projeto)
      this.getHoras(projeto)
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
  }
}
</script>
