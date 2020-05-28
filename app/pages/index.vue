<template>
  <div class="index-comum">
    <section class="index-comum__projetos">
      <h2>Projetos que você trabalhou mais tempo</h2>
      <Slide>
        <Card
          :key="index"
          v-for="(projeto, index) in projetosCardMap"
          :projeto="projeto"
          :isPerfil="false"
        />
      </Slide>
    </section>

    <div class="index-comun__filtro-projetos">
      <filtro :projetos="projetosCardMap" />
    </div>

    <div class="index-comun__horas-projetos">
      <tabela-projeto :projetos="projetosCardMap" />
    </div>
  </div>
</template>

<script>
import Slide from '~/components/Slide'
import Card from '~/components/elements/Card'
import Filtro from '~/components/elements/Filtro'
import TabelaProjeto from '~/components/elements/TabelaProjetos'

import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'IndexComum',
  layout: 'usuario',
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
.index-comum {
  margin: 0;
  padding: 0;
  width: 100%;

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
    display: flex;
    width: 100%;
  }

  &__filtro-projetos {
    flex-direction: column;
  }
  &__horas-projetos {
    justify-content: center;
  }
}
</style>
