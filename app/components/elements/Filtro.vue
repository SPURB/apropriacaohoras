<template>
  <div class="filtro">
    <section class="actions">
      <h3>
        Projetos mais trabalhados:
        <span>na última semana</span> · <span>por mês</span> ·
        <span>por ano</span> ·
        <span class="active">no total</span>
      </h3>
      <h4>Clique sobre um pedaço para ver mais detalhes do projeto</h4>
    </section>

    <section class="barra">
      <div
        :key="index"
        :style="{ width: `${projeto.porcentagem}%` }"
        class="barra__item"
        v-for="(projeto, index) in formatProjetos"
        @click.prevent="setProjeto(projeto, $event)"
        data-cy="pedaco__projeto"
      ></div>
    </section>

    <section class="projeto" v-if="this.showProjeto">
      <h1>{{ projeto.nome }}</h1>

      <div class="elemento">
        <i class="icon icon-seta_esquerda"></i>
        <p>
          <span>{{ projeto.ultimoMes }}</span>
          horas trabalhadas no último mês
        </p>
      </div>

      <div class="elemento">
        <i class="icon icon-tempo"></i>
        <p>
          <span>{{ projeto.desdeInicio }} </span>
          horas trabalhadas desde o início
        </p>
      </div>

      <div class="elemento">
        <i class="icon icon-pessoa-outline"></i>
        <p>
          <span>{{ projeto.minhasHoras }}</span>
          horas trabalhadas só por você desde o início
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Filtro',
  props: {
    projetos: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showProjeto: false,
      projeto: {}
    }
  },
  computed: {
    totalHoras () {
      let total = 0
      this.projetos.map(projeto => {
        total = total + +projeto.desdeInicio
      })
      return total
    },
    formatProjetos () {
      let projetos = []
      this.projetos.forEach(projeto => {
        if (projeto.total > 0) {
          const porcentagem = (projeto.desdeInicio / this.totalHoras) * 100
          projeto.porcentagem = porcentagem.toFixed(1)
          projetos.push(projeto)
        }        
      })
 
      return projetos //.sort((a, b) => b.porcentagem - a.porcentagem)
    }
  },
  methods: {
    clearActive (classe) {
      let elements = document.querySelectorAll(`.${classe}`)
      elements.forEach(elemento => {
        if (elemento.classList.contains('active')) {
          elemento.classList.remove('active')
        }
      })
    },
    setProjeto (projeto, event) {
      this.clearActive('barra__item')
      event.target.classList.add('active')

      this.projeto = projeto
      this.showProjeto = true
    }
  }
}
</script>

<style lang="scss" scoped>
.filtro {
  align-items: center;
  color: #fff;
  display: flex;
  flex-direction: column;

  .actions,
  .barra,
  .projeto {
    width: 100%;
  }

  .actions {
    line-height: 1.52;
    h3 {
      margin-bottom: 0px;

      span {
        @include color-white-alpha(0.3);
        font-size: 13pt;

        &.active {
          color: #fff;
        }

        &:hover {
          @include color-white-alpha(0.7);
          cursor: pointer;
        }
      }
    }

    h4 {
      font-weight: normal;
      margin: 1px 1px 15px 1px;
      font-size: 11pt;
      @include color-white-alpha(0.8);
    }
  }

  .barra {
    display: flex;
    &__item {
      height: 25px;
      margin: 5px;
      background-color: $verde;
      transition: 0.3s ease-in;

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }

      &.active {
        background-color: #fff;
      }

      &:hover {
        @include bg-white-alpha(0.1);
        cursor: pointer;
      }
    }
  }

  .projeto {
    background-color: #fff;
    color: $preto;
    display: flex;
    flex-direction: column;
    padding: 25px;

    h1 {
      margin: 5px;
    }
    .elemento {
      display: flex;
      align-items: center;

      .icon {
        font-size: 2rem;
        color: $verde;
      }

      p span {
        font-weight: bold;
      }
    }
  }
}
</style>
