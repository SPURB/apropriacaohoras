<template>
  <div class="relatorio__detalhado">
    <section class="input__select">
      <custom-select
        :title="'Projetos'"
        :idInput="'projetos'"
        :values="projetos"
      />
    </section>
    <section class="table">
      <tabela-horas :thead="thead" :projetos="horasUsuariosByProjetos" />
    </section>
  </div>
</template>

<script>
import CustomSelect from '~/components/CustomSelect'
import TabelaHoras from '~/components/elements/TabelaHoras'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RelatorioDetalhado',
  components: {
    CustomSelect,
    TabelaHoras
  },
  computed: {
    ...mapState('relatorios', {
      projetos: state => state.projetos,
      horasUsuariosByProjetos: state => state.horasUsuariosByProjetos
    }),
    ...mapState('form-registrar-horas', {
      projeto: state => state.horas.projeto
    }),
    thead () {
      return [
        {
          titulo: 'nome',
          nameOrder: 'nome'
        },
        {
          titulo: 'registro(horas)',
          nameOrder: 'registros'
        },
        {
          titulo: 'fase',
          nameOrder: 'fase'
        },
        {
          titulo: 'subatividade',
          nameOrder: 'subatividade'
        }
      ]
    }
  },
  watch: {
    projeto (val) {
      if (val > 0) this.getRelatorioDetalhado()
    }
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorioDetalhado'])
  }
}
</script>

<style lang="scss" scoped>
.relatorio__detalhado {
  width: 100%;

  .input__select {
    width: 50%;
  }

  .table {
    margin: 15px;
  }
}
</style>
