<template>
  <div class="index__comum">
    <section class="list__projetos">
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

    <div class="filtro__projetos">
      <filtro :projetos="projetos" />
    </div>

    <div class="horas__projetos">
      <tabela-projeto :projetos="projetos" />
    </div>
  </div>
</template>

<script>
import Slide from '~/components/Slide'
import Card from '~/components/elements/Card'
import Filtro from '~/components/elements/Filtro'
import TabelaProjeto from '~/components/elements/TabelaProjetos'

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
    projetos () {
      // essa computed representa os projetos que o usuário trabalhou mais tempo
      const projetos = [
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
      return projetos
    }
  }
}
</script>

<style lang="scss" scoped>
.index__comum {
  margin: 0;
  padding: 0;
  width: 100%;

  .list__projetos {
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

  .horas__projetos,
  .filtro__projetos {
    display: flex;
    width: 100%;
  }

  .filtro__projetos {
    flex-direction: column;
  }
  .horas__projetos {
    justify-content: center;
  }
}
</style>
