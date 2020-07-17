<template>
  <div class="pre-impressao-admin">
    <preloader v-if="fetching" />
    <btn-progresso
      class="pre-impressao-admin__navigation rotate"
      :disabled="page <= 1"
      @btnPrograssoAction="prevPage"
    />

    <div class="pre-impressao-admin__container">
      <div v-if="isReady" class="pre-impressao-admin__projetos" id="printer">
        <pre-impressao-a4 :paginationIndex="page" :paginationTotal="pageCount">
          <div class="pre-impressao-admin__header">
            <h2>{{ projeto.nomeProjeto }}</h2>
          </div>
          <div class="pre-impressao-admin__subheader">
            <p>
              Data da última atualização:<br />
              2020 06 13 às 13h42
            </p>
            <p>
              Horas totais:<br />
              {{ projeto.totalHoras }}
            </p>
          </div>
          <div class="pre-impressao-admin__equipe">
            <h3>Equipe</h3>
            <section class="pre-impressao-admin__equipe--nomes">
              <p
                :key="`equipe-${index}`"
                v-for="(nome, index) in projeto.equipe"
              >
                {{ nome }}
              </p>
            </section>
          </div>
          <div class="pre-impressao-admin__main">
            <div class="projeto">
              <div class="projeto__title">
                <h3>Horas totais por fases</h3>
              </div>
              <table class="projeto__table">
                <thead>
                  <tr>
                    <th>Fases</th>
                    <th>Horas</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :key="`fase-${index}`"
                    class="projeto__fase"
                    v-for="(fase, index) in projeto.fases"
                  >
                    <td>{{ fase.nome }}</td>
                    <td>{{ fase.totalHorasFase }}</td>
                    <td>
                      <graf-bar
                        :base="0"
                        :current="fase.totalHorasFase"
                        :total="projeto.totalHoras"
                        :height="32"
                        :width="200"
                      />
                    </td>
                  </tr>
                  <tr class="projeto__soma">
                    <td>total</td>
                    <td>{{ projeto.totalHoras }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </pre-impressao-a4>
      </div>
    </div>

    <btn-progresso
      class="pre-impressao-admin__navigation"
      :disabled="page === pageCount"
      @btnPrograssoAction="nextPage"
    />
  </div>
</template>

<script>
import Lib from '~/libs/'
import { mapState, mapActions, mapGetters } from 'vuex'
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import BtnProgresso from '~/components/elements/BtnProgresso'
import Preloader from '~/components/elements/Preloader'
import GrafBar from '~/components/elements/GrafBar'

export default {
  name: 'PreImpressaoAdmin',
  layout: 'pre-impressao',
  data () {
    return {
      page: 1,
      projeto: {}
    }
  },
  components: {
    PreImpressaoA4,
    BtnProgresso,
    Preloader,
    GrafBar
  },
  computed: {
    ...mapState('usuario', ['nome', 'projetos', 'id']),
    ...mapState('admin/pre-impressao', {
      fetching: state => state.fetching,
      error: state => state.error,
      err: state => state.err
    }),
    ...mapGetters('admin/pre-impressao', ['pdfContent']),
    isReady () {
      return !this.error && !this.fetching
    },
    pageCount () {
      return this.pdfContent.length
    }
  },
  created () {
    this.setupOn()
  },
  methods: {
    ...mapActions('admin/pre-impressao', [
      'getFases',
      'getProjetos',
      'getUsuarios',
      'getUsuariosProjetos',
      'usuariosByProjetos'
    ]),
    setupOn () {
      this.getProjetos()
      this.getUsuarios()
      this.getUsuariosProjetos()
      this.usuariosByProjetos()
      this.currentProjeto()
    },
    currentProjeto () {
      this.projeto = this.pdfContent[this.page - 1]
    },
    nextPage () {
      this.page = this.page + 1
      this.currentProjeto()
    },
    prevPage () {
      this.page = this.page - 1
      this.currentProjeto()
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-impressao-admin {
  display: flex;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    h2 {
      font-weight: normal;
      margin-bottom: 0;
      font-size: 1.8rem;
    }
    span {
      font-size: 1rem;
    }
  }

  &__subheader {
    display: flex;
    justify-content: space-between;
  }

  &__equipe {
    border-top: solid 1px $cinza1;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 1rem;
      font-weight: 500;
      margin-bottom: 0;
    }

    &--nomes {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1px 1px;
      margin-top: 5px;

      p {
        margin: 0;
        text-align: left;
      }
    }
  }

  &--align-right {
    text-align: right;
  }
  &__footer {
    border-top: solid 1px $cinza1;
    margin-top: auto;
    display: flex;
  }
  &__legenda {
    margin-right: 1rem;
    border-left: 1rem solid;
    padding-left: 0.25rem;
  }

  &__container {
    display: flex;
    justify-content: center;
    min-width: 80%;
  }

  &__projetos {
    width: 100%;
  }

  &__navigation {
    background: transparent;
    align-self: center;

    &.rotate {
      transform: rotate(180deg);
    }
  }
}
.projeto {
  margin-top: 1rem;

  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid $cinza1;
    h3 {
      font-size: 1rem;
      font-weight: 500;
    }
  }
  &__table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      text-align: right;
      height: 32px;
      padding-right: 1rem;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        display: flex;
        align-items: center;
        padding-right: 0;
      }
    }
  }
  &__fase {
    border-top: 1px solid #d2d2d2;
  }
  &__soma {
    background-color: #ececec;
    font-weight: bold;
    border-top: 2px grey solid;
    td {
      &:first-child {
        padding-left: 0.5rem;
      }
    }
  }
}
</style>
