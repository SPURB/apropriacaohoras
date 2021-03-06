<template>
  <div class="filtro">
    <div v-if="error !== ''" class="filtro__error">
      <p>{{ error }}</p>
    </div>
    <section v-else class="actions">
      <h3>
        Projetos mais trabalhados:
        <span @click="filtrar(todayMinus7, today, $event)"
          >na última semana</span
        >
        · <span @click="filtrar(todayMinus30, today, $event)">por mês</span> ·
        <span @click="filtrar(todayMinus365, today, $event)">por ano</span> ·
        <span ref="default" @click="formatProjetos(projetos, $event)">
          no total
        </span>
      </h3>
      <h4>Clique sobre um pedaço para ver mais detalhes do projeto</h4>
    </section>

    <section class="barra">
      <div
        :key="index"
        :style="{ width: `${projeto.porcentagem}%` }"
        class="barra__item"
        v-for="(projeto, index) in formatedProjects"
        @click.prevent="setProjeto(projeto, $event)"
        data-cy="pedaco__projeto"
      ></div>
    </section>

    <section class="projeto" v-if="this.showProjeto">
      <h3 data-cy="projeto__title">{{ projeto.nome }}</h3>

      <div class="elemento">
        <i class="icon icon-seta_esquerda"></i>
        <p>
          <span>{{ projeto.ultimoMes }}</span>
          horas trabalhadas no período
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
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'
import Acoes from '@/services/api-acoes'

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
      projeto: {},
      formatedProjects: [],
      error: ''
    }
  },
  computed: {
    ...mapState('relatorios', {
      horasProjeto: state => state.horasProjeto,
      horasUsuario: state => state.horasUsuario
    }),
    ...mapGetters('relatorios', ['projetosMap']),
    idsProjetos () {
      return this.projetos.map(projeto => projeto.id)
    },
    today () {
      return moment().format('YYYY-MM-DD')
    },
    todayMinus365 () {
      return moment()
        .subtract('year', 1)
        .format('YYYY-MM-DD')
    },
    todayMinus30 () {
      return moment()
        .subtract('day', 30)
        .format('YYYY-MM-DD')
    },
    todayMinus7 () {
      return moment()
        .subtract('day', 7)
        .format('YYYY-MM-DD')
    }
  },
  watch: {
    projetos (itens) {
      if (!itens.length) return
      this.formatProjetos(itens, undefined)
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
    filtrar (inicio, fim, event) {
      let data = []
      Acoes.agruparHoras(this.idsProjetos, inicio, fim)
        .then(totais => {
          data = totais.data.map(res => {
            return {
              horas: res.horas,
              extras: res.extras,
              total: res.total,
              idProjeto: res.idProjeto,
              ultimoMes: res.totalPeriodo != null ? res.totalPeriodo : 0
            }
          })
          const array = data.map((horas, index) => {
            const minhasHoras = this.horasUsuario
              .filter(hora => hora.projeto === horas.idProjeto)
              .map(hora => hora.horas + hora.extras)
              .reduce((horaTotal, hora) => horaTotal + hora, 0)

            horas.id = index + 1
            horas.minhasHoras = minhasHoras
            horas.nome = this.projetosMap[horas.idProjeto]
            horas.desdeInicio = horas.total
            return horas
          })
          this.formatProjetos(array, event)
        })
        .catch(({ message }) => {
          this.error = message
        })
    },
    formatProjetos (array, event) {
      event ? this.setActiveFilter(event) : this.initValue()

      this.showProjeto = false
      let projetos = []
      let total = 0

      array.forEach(projeto => {
        if (projeto.ultimoMes > 0) {
          total = total + +projeto.desdeInicio
          const porcentagem = (projeto.desdeInicio / total) * 100
          projeto.porcentagem = porcentagem.toFixed(1)
          projetos.push(projeto)
        }
      })
      this.formatedProjects = projetos
    },
    initValue () {
      const df = this.$refs.default
      df.classList.add('active')
    },
    setActiveFilter (event) {
      this.clearActive('active')
      event.target.classList.add('active')
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

    &__title {
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
  &__error {
    background-color: $vermelho;
    width: 100%;
    padding: 1rem;
    margin: 2rem auto;
    text-align: center;
    border-radius: 10px;
  }
}
</style>
