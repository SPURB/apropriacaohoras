<template>
  <div class="editar">
    <app-header />

    <section class="editar__titulo">
      <h2>Registrar horas</h2>
      <h3>atualizar {{ formateDate }}</h3>
    </section>

    <section class="editar__listar">
      <listar-horas :registro="countHoras" />
    </section>

    <section class="editar__horas">
      <editar-horas />
    </section>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import ListarHoras from '~/components/ListarHoras'
import EditarHoras from '~/components/EditarHoras'
import Lib from '~/libs/'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Editar',
  components: {
    AppHeader,
    ListarHoras,
    EditarHoras
  },
  computed: {
    ...mapState('editar', {
      registros: state => state.registros,
      countHoras: state => state.countHoras
    }),
    formateDate () {
      const date = Lib.splitDate(this.$route.query.data)
      return `${date.sDay}/${date.sMonth}/${date.sYear}`
    }
  },
  created () {
    this.getRegistros(this.$route.query.data)
  },
  methods: {
    ...mapActions('editar', ['getRegistros'])
  }
}
</script>

<style lang="scss" scoped>
.editar {
  @include color-white-alpha(1);
  display: flex;
  flex-direction: column;
  width: 100%;

  &__titulo,
  &__listar,
  &__horas {    
    padding: 15px 30px 5px 50px;
  }
  
  &__titulo {
    align-items: center;
    display: flex;
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
