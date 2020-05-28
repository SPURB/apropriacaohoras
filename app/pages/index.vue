<template>
  <div class="index-comum">
    <section class="index-comum__projetos">
      <h2>Projetos que você trabalhou mais tempo</h2>
      <Slide>
        <Card
          :key="index"
          v-for="(projeto, index) in projetos"
          :projeto="projeto"
          :isPerfil="false"
        />
      </Slide>
    </section>

    <div class="index-comun__filtro-projetos">
      <filtro :projetos="projetos" />
    </div>

    <div class="index-comun__horas-projetos">
      <tabela-projeto :projetos="projetos" />
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
    ...mapState('relatorios', ['horasUsuario']),
    ...mapGetters('relatorios', ['projetosCardMap']),
    projetosMapped () {
      if (!this.projetosCardMap.length || !this.horasUsuario.length) return []

      return this.projetosCardMap.map(({ id, nome, total, idProjeto }) => {
        const minhasHoras = this.horasUsuario
          .filter(hora => hora.projeto === idProjeto)
          .map(hora => hora.horas + hora.extras)
          .reduce((horaTotal, hora) => horaTotal + hora, 0)

        return {
          id,
          nome,
          desdeInicio: total,
          minhasHoras
        }
      })
    },
    projetos () {
      return [
        {
          id: 1,
          nome: 'Estudos de Viabilidade Imobiliária',
          desdeInicio: '4784',
          data: '2020-05-15',
          ultimoMes: '477',
          minhasHoras: '415'
        },
        {
          id: 2,
          nome: 'PIU Minhocão',
          desdeInicio: '3111',
          data: '2020-05-14',
          ultimoMes: '1154',
          minhasHoras: '359'
        },
        {
          id: 3,
          nome: 'PIU Jockey Club',
          desdeInicio: '1245',
          data: '2020-05-13',
          ultimoMes: '688',
          minhasHoras: '124'
        },
        {
          id: 4,
          nome: 'PIU Bairros do Tamanduateí',
          desdeInicio: '6578',
          data: '2020-05-12',
          ultimoMes: '589',
          minhasHoras: '89'
        },
        {
          id: 5,
          nome: 'PIU Eixos de Desenvolvimento',
          desdeInicio: '5124',
          data: '2020-05-11',
          ultimoMes: '25',
          minhasHoras: '12'
        }
      ]
    }
  },
  created () {
    this.getRelatorios()
    this.getHorasProjeto()
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
