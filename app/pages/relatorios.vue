<template>
  <div class="index-comum">
    <section v-if="fetching" class="index-comum__preloader-wrapper">
      <preloader :color="'#fff'" />
    </section>
    <section class="index-comum__projetos">
      <h2>Projetos que você trabalhou mais tempo</h2>
      <slider>
        <card
          :key="index"
          v-for="(projeto, index) in projetosCardMap"
          :projeto="projeto"
          :isPerfil="false"
        />
      </slider>
    </section>

    <div class="index-comum__filtro-projetos">
      <filtro :projetos="projetosCardMap" />
    </div>

    <div class="index-comum__horas-projetos">
      <tabela-projeto :projetos="projetosCardMap" />
      <btn-action
        class="index-comum__action"
        title="Visualizar relatório detalhado"
        @action="
          goTo({
            path: '/pre-impressao',
            query: {
              from: '/relatorios'
            }
          })
        "
      />
    </div>
  </div>
</template>

<script>
import Preloader from '~/components/elements/Preloader'
import Slider from '~/components/sections/Slider'
import Card from '~/components/elements/Card'
import Filtro from '~/components/elements/Filtro'
import TabelaProjeto from '~/components/sections/TabelaProjetos'
import BtnAction from '~/components/elements/BtnAction'

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'IndexComum',
  layout: 'usuario',
  components: {
    Preloader,
    Slider,
    Filtro,
    Card,
    TabelaProjeto,
    BtnAction
  },
  computed: {
    ...mapGetters('relatorios', ['projetosCardMap']),
    ...mapState('relatorios', ['fetching'])
  },
  async created () {
    await this.getRelatorios()
    await this.getHorasProjeto()
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorios', 'getHorasProjeto']),
    goTo (to) {
      this.$router.push(to)
    }
  }
}
</script>

<style lang="scss" scoped>
.index-comum {
  margin: 0;
  padding: 0;
  width: 100%;
  &__preloader-wrapper {
    margin-top: 1rem;
  }
  &__projetos {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 50px;
    width: 100%;

    h2 {
      color: $verde-escuro;
      font-size: 15pt;
      margin-left: 30px;
      margin-bottom: 0px;
    }
  }

  &__horas-projetos,
  &__filtro-projetos {
    max-width: $desktop;
    margin: auto;
  }
  &__horas-projetos {
    display: flex;
    flex-direction: column;
  }
  &__action {
    margin: 3rem auto 0;
  }
}
</style>
