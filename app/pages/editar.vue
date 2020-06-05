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
import Lib from '~/libs/'
import { mapState } from 'vuex'
export default {
  name: 'Editar',
  data () {
    return {
      arrayHoras: []
    }
  },
  components: {
    AppHeader
  },
  computed: {
    ...mapState('usuario', {
      id: state => state.id
    }),
    formateDate () {
      const date = Lib.splitDate(this.$route.query.data)
      return `${date.sDay}/${date.sMonth}/${date.sYear}`
    },
    url () {
      const data = this.$route.query.data
      return `?usuario=${this.id}&dataRefInicio=${data}`
    },
    countHoras () {}
  },
  created () {
    this.getHoras()
  },
  methods: {
    async getHoras () {
      await Horas.get(this.url).then(res => {
        this.arrayHoras = res.data.values
      })
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
