<template>
  <div class="pre-impressao">
    <div class="pre-impressao__container">
      <voltar class="pre-impressao__voltar" :to="from" />

      <div class="row">
        <div class="column">
          a4
        </div>
      </div>
      <div class="row pre-impressao__btns">
        <div class="column column--left">
          <btn-action title="Gerar csv" @action="createCsv" />
        </div>
        <div class="column column--center">
          <btn-action title="Gerar pdf" @action="createPdf" />
        </div>
        <div class="column column--right">
          <btn-action title="Cancelar" @action="goBack(from)" danger />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Voltar from '~/components/router-links/Voltar'
import BtnAction from '~/components/elements/BtnAction'
export default {
  name: 'PreImpressao',
  components: {
    Voltar,
    BtnAction
  },
  computed: {
    from () {
      const from = this.$route.query.from
      return from ? from : '/'
    }
  },
  methods: {
    createCsv () {
      console.log('gerar csv')
    },
    createPdf () {
      console.log('gerar pdf')
    },
    goBack (route) {
      this.$router.push(route)
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background-color: #fff;
}
.pre-impressao {
  background-color: #fff;
  min-height: 100vh;
  &__container {
    max-width: $desktop;
    margin: auto;
    padding-top: 3rem;
  }
  &__voltar {
    width: 100%;
  }
  &__btns {
    max-width: 600px;
    margin: auto;
  }
}

.column {
  &--center {
    margin: 0 1rem;
  }
}
</style>
