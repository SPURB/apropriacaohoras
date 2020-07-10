<template>
  <div class="pre-impressao">
    <modal
      v-if="error"
      title="Erro!"
      :error="true"
      :description="err"
      action-description="Voltar para relatórios"
      action-text="Voltar"
      @setModalAction="goBack(from)"
    />
    <div class="pre-impressao__container">
      <voltar class="pre-impressao__voltar" :to="from" />

      <div class="row">
        <div class="column">
          <nuxt ref="childrenImpressao" />
        </div>
      </div>
      <div class="row pre-impressao__btns">
        <div class="column column--left">
          <btn-action
            title="Gerar csv"
            @action="createCsv({ fields: '1' }, 'teste.csv')"
            :loading="csv.loading"
            loading-message="Gerando csv"
          />
        </div>
        <div class="column column--center">
          <btn-action
            title="Gerar pdf"
            @action="createPdf"
            :loading="pdf.loading"
            loading-message="Gerando pdf"
          />
        </div>
        <div class="column column--right">
          <btn-action title="Cancelar" @action="goBack(from)" danger />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { saveAs } from 'file-saver'
import Voltar from '~/components/router-links/Voltar'
import BtnAction from '~/components/elements/BtnAction'
import Modal from '~/components/sections/Modal'

export default {
  name: 'PreImpressao',
  components: {
    Voltar,
    BtnAction,
    Modal
  },
  data () {
    return {
      csv: {
        loading: false
      },
      pdf: {
        loading: false
      },
      cssPDF: `
        .pre-impressao-a4 {
            display: flex;
            flex-direction: column;
            font-family: 'Roboto', 'Segoe UI', 'Helvetica', Arial, sans-serif;
            justify-content: space-between;
            margin-bottom: 2rem;
            padding: 1rem 1.5rem;
            font-size: small;
        }
        .pre-impressao-a4__header,
        .pre-impressao-a4__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .pre-impressao-a4__header {
            padding-bottom: 1rem;
            border-bottom: 1px solid #777;    
        }
        .pre-impressao-a4__header p {
            margin-top: 24px;
            margin-bottom: 0;
        }
        .pre-impressao-a4__main {
            display: flex;
            flex-direction: column;
        }
        .pre-impressao-a4__footer {
            border-top: 1px solid #777;    
        }
        .pre-impressao-a4__footer--right {
            text-align: right;
        }
        .pre-impressao-usuario__header {
          display: flex;
          justify-content: space-between;
          flex-direction: row;    
        }
        .pre-impressao-usuario__header h2 {
          font-weight: normal;
          font-size: 1.52rem;
        }
        .pre-impressao-usuario__header span {
          font-size: 1rem;
        }
        .pre-impressao-usuario__header--align-right {
          text-align: right;
        }
        .pre-impressao-usuario__footer {
          border-top: solid 1px #777;
          margin-top: auto;
          display: flex;
        }
        .pre-impressao-usuario__legenda {
          margin-right: 1rem;
          border-left: 1rem solid;
          padding-left: 0.25rem;
        }

        .pre-impressao-usuario__container {
          display: flex;
        }
        .projeto {
          margin-top: 2rem;
        }
        .projeto__title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-top: 1px solid #777;
        }
        .projeto__title h3 {
          font-size: 1rem;
          font-weight: normal;
        }
        .projeto__table {
          border-collapse: collapse;
        }
        .projeto__table th, .projeto__table td {
          text-align: right;
          height: 32px;
          padding-right: 1rem;   
        }
        .projeto__table th:first-child, .projeto__table td:first-child {
          text-align: left !important;
        }
        .projeto__table th:last-child, .projeto__table td:last-child {
            display: flex;
            align-items: center;
            padding-right: 0;
        }
        .projeto__fase {
          border-top: 1px solid #d2d2d2;
        }
        .projeto__soma {
          background-color: #777;
          font-weight: bold;
          border-top: 2px grey solid;
        }
        .projeto__soma td:first-child {
          padding-left: 0.5rem;
        }
      `
    }
  },
  computed: {
    ...mapState('pre-impressao', ['fetching', 'error', 'err']),
    from () {
      const from = this.$route.query.from
      return from ? from : '/'
    }
  },
  watch: {
    fetching (state) {
      if (state) {
        this.csv.loading = state
        this.pdf.loading = state
      } else {
        this.csv.loading = false
        this.pdf.loading = false
      }
    }
  },
  methods: {
    ...mapActions('pre-impressao', 'reset'),
    async createPdf () {
      await this.loadExternalLib(
        'https://unpkg.com/printd@1.3.0/printd.umd.min.js'
      )

      const now = this.$moment()
      const printer = document.getElementById('printer')
      const { Printd } = window.printd
      const p = new Printd()

      const iframe = p.getIFrame()
      const { contentWindow } = iframe

      p.print(printer, [this.cssPDF])

      contentWindow.addEventListener('beforeprint', () => {
        document.title = `Relatorio__${now.format('DD-MM-YYYY_HH:MM:SS')}`
      })
      contentWindow.addEventListener('afterprint', () => {
        document.title = 'SPUrbanismo | Apropriação de Horas'
      })
    },
    loadExternalLib (url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.onload = () => {
          resolve(`${url} está pronta`)
        }
        script.async = true
        script.src = url
        document.head.appendChild(script)
      })
    },
    async createCsv (content, name) {
      this.csv.loading = true
      await this.loadExternalLib('https://cdn.jsdelivr.net/npm/json2csv')
      const csvBlob = new Blob([window.json2csv.parse(content)], {
        type: 'text/csv; charset=utf-8'
      })
      saveAs(csvBlob, name)
      this.csv.loading = false
    },
    goBack (route) {
      this.$router.push(route)
      this.reset()
    }
  }
}
</script>
<style lang="scss" scoped>
.pre-impressao {
  background-color: #fff;
  min-height: 100vh;
  &__container {
    max-width: $tablet;
    margin: auto;
    padding-top: 3rem;
    @media (max-width: $tablet) {
      padding: 1rem;
    }
  }
  &__voltar {
    width: 100%;
    margin-bottom: 3rem;
  }
  &__btns {
    max-width: 600px;
    margin: auto;
    padding-bottom: 3rem;
  }
}

.column {
  &--center {
    margin: 0 1rem;
  }
}
</style>
