<template>
  <div class="index__comum">
    <app-header />

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

    <div class="horas__projetos">
      <tabela-projeto :projetos="todosProjetos" />
    </div>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import Slide from '~/components/Slide'
import Card from '~/components/elements/Card'
import TabelaProjeto from '~/components/elements/TabelaProjetos'

export default {
  name: 'IndexComum',
  computed: {
    projetos () {
      // essa computed representa os projetos que o usuário trabalhou mais tempo
      const projetos = [
        {
          nome: 'Estudos de Viabilidade Imobiliária',
          desdeInicio: '4.784',
          ultimoMes: '477',
          minhasHoras: '415'
        },
        {
          nome: 'PIU Minhocão',
          desdeInicio: '3.111',
          ultimoMes: '1.154',
          minhasHoras: '359'
        },
        {
          nome: 'PIU Jockey Club',
          desdeInicio: '1.245',
          ultimoMes: '688',
          minhasHoras: '124'
        },
        {
          nome: 'PIU Bairros do Tamanduateí',
          desdeInicio: '6.578',
          ultimoMes: '589',
          minhasHoras: '89'
        },
        {
          nome: 'PIU Eixos de Desenvolvimento',
          desdeInicio: '5.124',
          ultimoMes: '25',
          minhasHoras: '12'
        }
      ]
      return projetos
    },
    todosProjetos () {
      // essa computed representa o total de horas de todos os projetos que o usuário trabalhou
      const projetos = [
        {
          nome: 'Estudos de Viabilidade Imobiliária',
          totalHoras: '5676'
        },
        {
          nome: 'PIU Minhocão',
          totalHoras: '4624'
        },
        {
          nome: 'PIU Jockey Club',
          totalHoras: '2057'
        },
        {
          nome: 'PIU Bairros do Tamanduateí',
          totalHoras: '7256'
        },
        {
          nome: 'PIU Eixos de Desenvolvimento',
          totalHoras: '5161'
        }
      ]
      return projetos
    }
  },
  components: {
    AppHeader,
    AppFooter,
    Slide,
    Card,
    TabelaProjeto
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

  .horas__projetos {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
