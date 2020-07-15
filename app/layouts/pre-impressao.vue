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
            @action="createPdf(content)"
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
      content: this.$store.state['pre-impressao'].contentForPdf
    }
  },
  computed: {
    ...mapState('pre-impressao', {
      fetching: state => state.fetching,
      error: state => state.error,
      err: state => state.err
    }),
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
    },
    content (value) {
      console.log(content)
    }
  },
  methods: {
    ...mapActions('pre-impressao', ['reset', 'setContentForPdf']),
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
    async createPdf (content) {
      this.pdf.loading = true
      const now = this.$moment()
      const dia = now.format('YYYY-MM-DD')
      const horario = now.format('hh-mm').replace(':', 'h')
      const name = `relatorio-${dia}-${horario}.pdf`
      try {
        let dd = {
          content,
          styles: {
            header: {
              fontSize: 25,
              alignment: 'left',
              bold: true
            },
            footer: {
              fontSize: 10,
              margin: [0, 15, 0, 150]
            },
            subheader: {
              fontSize: 12
            },
            margin: {
              margin: [0, 15, 0, 30]
            },
            leftText: {
              fontSize: 13,
              alignment: 'left'
            },
            rightText: {
              fontSize: 13,
              alignment: 'right'
            },
            tableFirst: {
              bold: true
            },
            tableHeader: {
              bold: true,
              alignment: 'right'
            },
            textTable: {
              margin: [0, 4, 5, 4],
              fontSize: 13
            },
            total: {
              bold: true,
              fillColor: '#c3c3c3'
            }
          },
          defaultStyle: {
            columnGap: 20
          }
        }
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js'
        )
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js'
        )
        window.pdfMake.createPdf(dd).download(name)
      } catch (err) {
        console.log(err)
      }
      this.pdf.loading = false
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
    max-width: 900px;
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
