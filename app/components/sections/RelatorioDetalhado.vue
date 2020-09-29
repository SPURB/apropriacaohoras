<template>
  <div class="relatorio-detalhado">
    <section class="relatorio-detalhado__select">
      <custom-select
        :title="'Projetos'"
        :idInput="'projetos'"
        :values="projetos"
        :setOptionValue="projeto"
        :optionTitle="optionTitle"
        data-cy="select__option"
      />
      <div class="relatorio-detalhado__date-group">
        <input-date
          v-if="projeto"
          title="Data inicial"
          @date="setDataInicial"
        />
        <input-date v-if="projeto" title="Data final" @date="setDataFinal" />
      </div>
      <button
        v-if="projeto"
        @click.prevent="resetFilters"
        data-cy="btn__limpar"
      >
        Limpar filtro
      </button>
    </section>

    <section
      class="relatorio-detalhado__table"
      v-if="horasUsuariosByProjetos.length > 0"
    >
      <tabela-horas :thead="thead" :projetos="paginatedData" />
    </section>

    <section class="relatorio-detalhado__table table__null" v-else>
      <h3>Nenhum registro encontrado para esse projeto.</h3>
      <h4>Selecione outro projeto.</h4>
    </section>

    <section class="relatorio-detalhado__pagination">
      <pagination :pageCount="pageCount" @pageNumber="setPageNumber" />
    </section>
  </div>
</template>

<script>
import CustomSelect from '~/components/forms/CustomSelect'
import InputDate from '~/components/forms/InputDate'
import TabelaHoras from '~/components/sections/TabelaHoras'
import Pagination from '~/components/elements/Pagination'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'RelatorioDetalhado',
  data () {
    return {
      pageNumber: 0,
      size: 9,
      optionTitle: 'Selecione um projeto',
      filtros: {
        dataInicial: '',
        dataFinal: ''
      }
    }
  },
  components: {
    CustomSelect,
    InputDate,
    TabelaHoras,
    Pagination
  },
  computed: {
    ...mapState('relatorios', {
      projetos: state => state.projetos,
      horasUsuariosByProjetos: state => state.horasUsuariosByProjetos,
      projeto: state => state.projetoSelected
    }),
    ...mapState('form-registrar-horas', {
      projeto: state => state.horas.projeto
    }),
    ...mapGetters('relatorios', ['projetoInfo']),
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
    },
    pageCount () {
      let l = this.horasUsuariosByProjetos.length,
        s = this.size
      return Math.ceil(l / s) // s = size :: l = length
    },
    paginatedData () {
      const start = this.pageNumber * this.size,
        end = start + this.size
      return this.horasUsuariosByProjetos.slice(start, end)
    }
  },
  watch: {
    projeto (val) {
      this.getRelatorioDetalhado()
    },
    projetoInfo (projeto) {
      this.optionTitle =
        projeto.nome !== '' ? projeto.nome : 'Selecione um projeto'
    },
    filtros: {
      deep: true,
      handler () {
        this.setFiltros(this.filtros)
        this.getRelatorioDetalhado()
      }
    }
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorioDetalhado', 'setFiltros']),
    ...mapActions('form-registrar-horas', ['RESET']),
    setPageNumber (val) {
      this.pageNumber = val
    },
    resetFilters () {
      this.optionTitle = 'Selecione um projeto'
      this.setOptionValue = 0
      this.RESET()
    },
    setDataInicial (val) {
      this.filtros.dataInicial = val
    },
    setDataFinal (val) {
      this.filtros.dataFinal = val
    }
  }
}
</script>

<style lang="scss" scoped>
.relatorio-detalhado {
  width: 100%;

  &__select {
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

  &__date-group {
    display: flex;
  }

  &__table {
    margin: 15px;
    overflow-x: hidden;
  }

  &__pagination {
    margin: 7px;
  }

  @media (max-width: 874px) {
    &__select,
    &__date-group {
      width: 100%;
      flex-direction: column;
    }

    &__table {
      overflow-x: scroll;
    }
  }
}
</style>
