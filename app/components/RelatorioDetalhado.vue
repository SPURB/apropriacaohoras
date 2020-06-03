<template>
  <div class="relatorio__detalhado">
    <section class="input__select">
      <custom-select
        :title="'Projetos'"
        :idInput="'projetos'"
        :values="projetos"
      />
    </section>
    <button type="button" @click.prevent="getRelatorioDetalhado">TESTE</button>
  </div>
</template>

<script>
import CustomSelect from '~/components/CustomSelect'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'RelatorioDetalhado',
  components: {
    CustomSelect
  },
  computed: {
    ...mapState('relatorios', ['projetos']),
    ...mapState('form-registrar-horas', {
      horas: ['projeto']
    })
  },
  methods: {
    ...mapActions('relatorios', ['getRelatorioDetalhado'])
  }
}
</script>

<style lang="scss" scoped>
.relatorio__detalhado {
  width: 100%;

  .input__select {
    width: 50%;
  }
}
</style>
