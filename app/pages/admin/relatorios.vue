<template>
  <div class="admin-relatorios">
    <section v-if="fetching" class="admin-relatorios__preloader-wrapper">
      <preloader :color="'#fff'" />
    </section>
    <section class="admin-relatorios__detalhados">
      <h2 class="admin-relatorios__title">
        Relatórios
      </h2>
      <relatorio-detalhado />
    </section>
    <section class="admin-relatorios__actions">
      <btn-action
        class="admin-relatorios__action"
        title="Relatório de horas individual"
        @action="
          $router.push({
            path: '/pre-impressao',
            query: {
              from: '/admin/relatorios',
              section: 1,
              type: 'usuario'
            }
          })
        "
      />
      <btn-action
        v-if="projetoInfo.id"
        class="admin-relatorios__action"
        :title="`Relatório de horas do ${projetoInfo.nome}`"
        @action="
          $router.push({
            path: '/admin/pre-impressao',
            query: {
              from: '/admin/relatorios',
              projeto: projetoInfo.id,
              section: 1,
              type: 'projeto'
            }
          })
        "
      />
    </section>
    <section class="admin-relatorios__cards">
      <h2 class="admin-relatorios__title">
        Projetos que você trabalhou mais tempo
      </h2>
      <slider>
        <card
          :key="index"
          v-for="(projeto, index) in projetosCardMap"
          :projeto="projeto"
          :isPerfil="false"
        />
      </slider>
    </section>

    <section class="admin-relatorios__filtros">
      <filtro :projetos="projetosCardMap" />
    </section>

    <section class="admin-relatorios__tabela">
      <tabela-projeto :projetos="projetosCardMap" />
    </section>
  </div>
</template>
<script>
import Preloader from '~/components/elements/Preloader'
import RelatorioDetalhado from '~/components/sections/RelatorioDetalhado'
import Slider from '~/components/sections/Slider'
import Card from '~/components/elements/Card'
import Filtro from '~/components/elements/Filtro'
import TabelaProjeto from '~/components/sections/TabelaProjetos'
import BtnAction from '~/components/elements/BtnAction'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'AdminRelatorios',
  layout: 'admin',
  components: {
    Preloader,
    RelatorioDetalhado,
    Slider,
    Filtro,
    Card,
    TabelaProjeto,
    BtnAction
  },
  computed: {
    ...mapState('relatorios', ['fetching']),
    ...mapGetters('relatorios', ['projetosCardMap', 'projetoInfo'])
  },
  async created () {
    await this.getRelatorios()
    await this.getHorasProjeto()
    await this.getRelatorioDetalhado()
  },
  mounted () {
    this.resetPreImpressao()
  },
  methods: {
    ...mapActions('relatorios', [
      'getRelatorios',
      'getHorasProjeto',
      'getRelatorioDetalhado'
    ]),
    ...mapActions('pre-impressao', {
      resetPreImpressao: 'reset'
    })
  }
}
</script>
<style lang="scss" scoped>
.admin-relatorios {
  &__cards {
    background-color: #fff;
    border-top: 1px solid rgb(240, 240, 240);
    padding: 50px;
  }
  &__title {
    max-width: $desktop;
    color: $verde;
  }
  &__detalhados h2 {
    color: #fff;
  }
  &__detalhados,
  &__filtros,
  &__tabela {
    max-width: $desktop;
    margin: auto;
  }

  &__filtros,
  &__tabela {
    @media (max-width: $tablet) {
      padding: 1rem;
    }
  }
  &__actions {
    margin: auto;
    display: flex;
    justify-content: center;
    @media (max-width: $tablet) {
      flex-direction: column;
    }
  }
  &__action {
    margin: 2rem 1rem 3rem;
    @media (max-width: $tablet) {
      margin: 1rem;
    }
  }
}
</style>
