<template>
  <div id="editar">
    <app-header />

    <section class="titulo">
      <h2>Registrar horas</h2>
      <h3>atualizar {{ formateDate }}</h3>
    </section>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import ListarHoras from '~/components/ListarHoras'
import Horas from '~/services/api-horas'
import Subatividade from '~/services/api-subatividade'
import Lib from '~/libs/'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'EditarHoras',
  data () {
    return {
      arrayHoras: [],
      subatividade: []
    }
  },
  components: {
    AppHeader
  },
  computed: {
    ...mapState('usuario', {
      id: state => state.id
    }),
    ...mapState('form-registrar-horas', {
      projetos: state => state.dataSelects[1].values,
      fases: state => state.dataSelects[0].values
    }),
    formateDate () {
      const date = Lib.splitDate(this.$route.query.data)
      return `${date.sDay}/${date.sMonth}/${date.sYear}`
    },
    url () {
      const data = this.$route.query.data
      return `?usuario=${this.id}&dataRefInicio=${data}`
    }
  },
  watch: {
    arrayHoras () {
      this.registro()
    }
  },
  created () {
    this.getHorasSubatividades()
    this.addData() // adiciona no vuex as fases/projetos
  },
  methods: {
    ...mapActions('form-registrar-horas', ['addData']),
    async getHorasSubatividades () {
      await Promise.all([Horas.get(this.url), Subatividade.get()])
        .then(res => {
          this.arrayHoras = res[0].data.values
          this.subatividade = res[1].data.values
        })
        .catch(err => {
          alert('Ocorreu algum erro! Tente mais tarde.')
          new Error(err)
        })
    },
    group_by (lista, coluna) {
      let colunas = {}
      let resultado = []

      lista.forEach(function (item) {
        let reg = {}
        colunas[item[coluna]] = colunas[item[coluna]] || []

        for (let i in item) if (i != coluna) reg[i] = item[i]

        colunas[item[coluna]].push(reg)
      })

      for (let i in colunas) {
        const projeto = {
          key: this.projetos.find(projeto => projeto.id === +i).nome,
          values: colunas[i]
        }
        resultado.push(projeto)
      }

      return resultado
    },
    registro () {
      const agrupados = this.group_by(this.arrayHoras, 'projeto')
      console.log(agrupados)
    }
  }
}
</script>

<style lang="scss" scoped>
#editar {
  @include color-white-alpha(1);
  display: flex;
  flex-direction: column;
  width: 100%;

  .titulo {
    align-items: center;
    display: flex;
    padding: 15px 30px 5px 50px;
    width: 100%;

    h2 {
      @include color-white-alpha(0.8);
    }

    h3:before {
      background-color: $verde;
      content: '';
      display: inline-block;
      margin: 7px 7px -2px 7px;
      height: 20px;
      width: 3px;
    }
  }
}
</style>
