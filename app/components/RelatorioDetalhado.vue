<template>
  <div class="relatorio__detalhado">
    <section class="input__select">
      <custom-select
        :title="'Projetos'"
        :idInput="'projetos'"
        :values="projetos"
      />
      <button v-if="projeto > 0" @click="RESET">Limpar filtro</button>
    </section>
    <section class="table" v-if="horasUsuariosByProjetos.length > 0">
      <tabela-horas :thead="thead" :projetos="horasUsuariosByProjetos" />
    </section>
    <section class="table table__null" v-else>
      <h3>Nenhum registro encontrado para esse projeto.</h3>
      <h4>Selecione outro projeto.</h4>
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
      this.getRelatorioDetalhado()
    }
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorioDetalhado']),
    ...mapActions('form-registrar-horas', ['RESET'])
  }
}
</script>

<style lang="scss" scoped>
.relatorio__detalhado {
  width: 100%;

  .input__select {
    width: 50%;
    display: flex;

    button {
      align-self: flex-end;
      background-color: $verde;
      border: 1px solid $verde-claro;
      border-radius: 50px;
      color: #fff;
      cursor: pointer;
      margin: 10px;
      height: 30px;

      &:hover {
        background-color: transparent;
      }
    }
  }

  .table {
    margin: 15px;
  }
}
</style>
