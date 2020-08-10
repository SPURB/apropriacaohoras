<template>
  <div class="pre-impressao">
    <modal
      v-if="error && !fetching"
      title="Erro!"
      :error="true"
      :description="err"
      action-description="Voltar para relatórios"
      action-text="Voltar"
      @setModalAction="goBack(from)"
    />
    <nav v-if="!fetching">
      <btn-progresso
        v-if="page > 1"
        class="pre-impressao__navigation pre-impressao__navigation--left"
        :disabled="page <= 1"
        :stroke="'#A8A8A8'"
        :background="'transparent'"
        :onHoverBackground="'#777'"
        :onHoverStroke="'white'"
        @btnPrograssoAction="prevPage"
        :key="1"
      />
      <btn-progresso
        class="pre-impressao__navigation pre-impressao__navigation--right"
        :disabled="page === pageCount"
        :stroke="'#A8A8A8'"
        :background="'transparent'"
        :onHoverBackground="'#777'"
        :onHoverStroke="'white'"
        :tooltip="`${page}/${pageCount}`"
        :displayTooltip="true"
        @btnPrograssoAction="nextPage"
        :key="2"
      />
    </nav>
    <div class="pre-impressao__container" ref="pre-impressao-continer">
      <voltar class="pre-impressao__voltar" :to="from" />
      <div class="row">
        <div class="column">
          <nuxt />
        </div>
      </div>
      <p class="pre-impressao__page-counter">
        <span data-cy="pre-impressao__page-counter">{{ page }}</span
        >/{{ pageCount }}
      </p>
      <div class="row pre-impressao__btns">
        <div class="column column--left">
          <btn-action
            title="Gerar csv"
            @action="createCsv(csv.content, fileName(nprodam, 'csv'))"
            :loading="csv.loading"
          />
        </div>
        <div class="column column--center">
          <btn-action
            title="Gerar pdf"
            @action="createPdf(pdf.content, fileName(nprodam, 'pdf'))"
            :loading="pdf.loading"
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
import { mapState, mapActions, mapMutations } from 'vuex'
import { saveAs } from 'file-saver'
import Voltar from '~/components/router-links/Voltar'
import BtnAction from '~/components/elements/BtnAction'
import BtnProgresso from '~/components/elements/BtnProgresso'
import Modal from '~/components/sections/Modal'

export default {
  name: 'PreImpressao',
  components: {
    Voltar,
    BtnAction,
    BtnProgresso,
    Modal
  },
  data () {
    return {
      csv: {
        loading: false,
        content: {}
      },
      pdf: {
        loading: false,
        content: {}
      }
    }
  },
  computed: {
    ...mapState('usuario', ['usuario']),
    ...mapState('pre-impressao', {
      fetching: state => state.fetching,
      error: state => state.error,
      err: state => state.err,
      page: state => state.page,
      pageCount: state => state.pageCount
    }),
    ...mapState('admin/pre-impressao', {
      fetchingAdmin: state => state.fetching,
      errorAdmin: state => state.error,
      errAdmin: state => state.err
    }),
    from () {
      const from = this.$route.query.from
      return from ? from : '/'
    },
    nprodam () {
      return this.usuario.nprodam
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
    fetchingAdmin (state) {
      if (state) {
        this.csv.loading = state
        this.pdf.loading = state
      } else {
        this.csv.loading = false
        this.pdf.loading = false
      }
    }
  },
  created () {
    this.$nuxt.$on('getCsv', data => this.handleData(data, 'csv'))
    this.$nuxt.$on('getPdf', data => this.handleData(data, 'pdf'))
  },
  methods: {
    handleData (data, key) {
      this[key].content = data
    },
    ...mapMutations('pre-impressao', ['SET']),
    ...mapActions('pre-impressao', ['printStatus']),
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
      try {
        await this.loadExternalLib('https://cdn.jsdelivr.net/npm/json2csv')
        const csvBlob = new Blob([window.json2csv.parse(content)], {
          type: 'text/csv; charset=utf-8'
        })
        saveAs(csvBlob, name)
      } catch (error) {
        this.printStatus({
          errorStatus: true,
          error
        })
      } finally {
        this.csv.loading = false
      }
    },
    async createPdf (content, name) {
      this.pdf.loading = true

      try {
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js'
        )
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js'
        )
        window.pdfMake.createPdf(content).download(name)
      } catch (error) {
        this.printStatus({
          errorStatus: true,
          error: error || 'Erro na impressão'
        })
      } finally {
        this.pdf.loading = false
      }
    },
    fileName (prefix, extension) {
      const now = this.$moment()
      const dia = now.format('YYYY-MM-DD')
      const horario = now.format('hh-mm').replace(':', 'h')
      return `${prefix}_${dia}-${horario}.${extension}`
    },
    goBack (route) {
      this.csv.content = {}
      this.pdf.content = {}
      this.$router.push(route)
    },
    nextPage () {
      this.SET({ data: this.page + 1, key: 'page' })
    },
    prevPage () {
      this.SET({ data: this.page - 1, key: 'page' })
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
    @media (max-width: 669px) {
      margin-bottom: 0.5rem;
    }
  }
  &__btns {
    max-width: 600px;
    margin: auto;
    padding-bottom: 5rem;
    @media (max-width: $phone) {
      flex-direction: column;
      margin-bottom: 3rem;
      .column--center {
        margin: auto 0;
      }
    }
  }
  &__navigation {
    position: fixed;
    top: 0;
    height: 100vh;
    border: 0;
    z-index: 8;

    @media (max-width: 669px) {
      height: inherit;
      top: unset;
      bottom: 0;
    }

    &--left {
      left: 0;
      transform: rotate(180deg);
    }
    &--right {
      right: 0;
    }
  }
  &__page-counter {
    text-align: center;
  }
}

.column {
  &--center {
    margin: 0 1rem;
  }
}
</style>
