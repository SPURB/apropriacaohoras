<template>
  <div class="admin-relatorios">
    <section v-if="fetching" class="index-comum__preloader-wrapper">
      <preloader :color="'#fff'" />
    </section>
    <section class="admin-relatorios__detalhados">
      <h2 class="admin-relatorios__title">
        Relatório detalhado
      </h2>
      <relatorio-detalhado />
    </section>
    <section class="admin-relatorios__cards">
      <h2 class="admin-relatorios__title">
        Projetos que você trabalhou mais tempo
      </h2>
      <slide>
        <card
          :key="index"
          v-for="(projeto, index) in projetosCardMap"
          :projeto="projeto"
          :isPerfil="false"
        />
      </slide>
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
import Slide from '~/components/elements/Slide'
import Card from '~/components/elements/Card'
import Filtro from '~/components/elements/Filtro'
import TabelaProjeto from '~/components/elements/TabelaProjetos'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'AdminRelatorios',
  layout: 'admin',
  components: {
    Preloader,
    RelatorioDetalhado,
    Slide,
    Filtro,
    Card,
    TabelaProjeto
  },
  computed: {
    ...mapState('relatorios', ['fetching']),
    ...mapGetters('relatorios', ['projetosCardMap'])
  },
  async created () {
    await this.getRelatorios()
    await this.getHorasProjeto()
    await this.getRelatorioDetalhado()
  },
  methods: {
    ...mapActions('relatorios', [
      'getRelatorios',
      'getHorasProjeto',
      'getRelatorioDetalhado'
    ])
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
}
</style>
