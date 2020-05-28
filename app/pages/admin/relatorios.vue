<template>
  <div class="admin-relatorios">
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
import Slide from '~/components/Slide'
import Card from '~/components/elements/Card'
import Filtro from '~/components/elements/Filtro'
import TabelaProjeto from '~/components/elements/TabelaProjetos'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminRelatorios',
  layout: 'admin',
  components: {
    Slide,
    Filtro,
    Card,
    TabelaProjeto
  },
  computed: {
    ...mapGetters('relatorios', ['projetosCardMap'])
  },
  async created () {
    await this.getRelatorios()
    await this.getHorasProjeto()
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorios', 'getHorasProjeto'])
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
  &__filtros,
  &__tabela {
    max-width: $desktop;
    margin: auto;
  }
}
</style>
