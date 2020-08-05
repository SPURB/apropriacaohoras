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
    <nav>
      <btn-progresso
        v-if="!fetching"
        class="pre-impressao__navigation pre-impressao__navigation--left"
        :disabled="page <= 1"
        :stroke="'#A8A8A8'"
        :background="'white'"
        :onHoverBackground="'#777'"
        :onHoverStroke="'white'"
        @btnPrograssoAction="prevPage"
        :key="1"
      />
      <btn-progresso
        v-if="!fetching"
        class="pre-impressao__navigation pre-impressao__navigation--right"
        :disabled="page === pageCount"
        :stroke="'#A8A8A8'"
        :background="'white'"
        :onHoverBackground="'#777'"
        :onHoverStroke="'white'"
        :tooltip="`${page}/${pageCount}`"
        :displayTooltip="true"
        @btnPrograssoAction="nextPage"
        :key="2"
      />
    </nav>
    <div class="pre-impressao__container">
      <voltar class="pre-impressao__voltar" @click.prevent="reset" :to="from" />
      <div class="row">
        <div class="column">
          <nuxt ref="childrenImpressao" />
        </div>
      </div>
      <p class="pre-impressao__page-counter">{{ page }}/{{ pageCount }}</p>
      <div class="row pre-impressao__btns">
        <div class="column column--left">
          <btn-action
            title="Gerar csv"
            @action="createCsv({ fields: '1' }, 'teste.csv')"
            :loading="csv.loading"
          />
        </div>
        <div class="column column--center">
          <btn-action
            title="Gerar pdf"
            @action="createPdf"
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
        loading: false
      },
      pdf: {
        loading: false
      }
    }
  },
  computed: {
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
  methods: {
    // ...mapActions('pre-impressao', ['reset']),
    ...mapMutations('pre-impressao', ['SET', 'RESET']),
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
    async createPdf () {
      this.pdf.loading = true
      const content = this.$route.meta.pdfContent
      const now = this.$moment()
      const dia = now.format('YYYY-MM-DD')
      const horario = now.format('hh-mm').replace(':', 'h')
      const name = `relatorio-${dia}-${horario}.pdf`

      try {
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/pdfmake.min.js'
        )
        await this.loadExternalLib(
          'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.62/vfs_fonts.js'
        )
        window.pdfMake.createPdf(content).download(name)
      } catch (err) {
        console.log(err)
      }
      this.pdf.loading = false
    },
    goBack (route) {
      this.$router.push(route)
      // this.reset()
      // this.resetPagination()
    },
    nextPage () {
      this.SET({ data: this.page + 1, key: 'page' })
    },
    prevPage () {
      this.SET({ data: this.page - 1, key: 'page' })
    }
    // resetPagination () {
    //   this.SET({ data: 1, key: 'page' })
    //   this.SET({ data: 1, key: 'pageCount' })
    // }
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
  &__navigation {
    position: fixed;
    top: 0;
    height: 100vh;
    border: 0;
    z-index: 9;

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
