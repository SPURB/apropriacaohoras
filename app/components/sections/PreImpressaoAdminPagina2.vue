<template>
  <div class="pre-impressao-admin-pagina-2">
    <pre-impressao-a4 :paginationIndex="2" :paginationTotal="2">
    </pre-impressao-a4>
  </div>
</template>
<script>
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'PreImpressaoAdminPagina2',
  components: {
    PreImpressaoA4
  },
  computed: {
    ...mapState('admin/pre-impressao/pagina1', ['fases', 'projeto']),
    ...mapState('admin/pre-impressao/pagina2', ['subatividades'])
  },
  methods: {
    ...mapActions('admin/pre-impressao/pagina1', ['getProjetoInfo']),
    ...mapActions('admin/pre-impressao/pagina2', ['getSubatividades']),
    fetchData () {
      if (this.fases.lenght) {
        this.getSubatividades(this.fases)
      } else {
        const { projeto } = this.$route.query
        this.getProjetoInfo(projeto)
      }
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    $route: 'fetchData'
    // fases () {
    //   this.fetchData()
    // }
  }
}
</script>
