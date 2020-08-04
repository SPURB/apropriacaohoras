<template>
  <div
    class="pre-impressao-admin"
    :style="{ display: fetching ? 'block' : 'flex' }"
  >
    <preloader v-if="fetching" />

    <div class="pre-impressao-admin__container">
      <div v-if="isReady" class="pre-impressao-admin__projetos" id="printer">
        <template v-if="projeto.ind === 0">
          <pre-impressao-a4
            :paginationIndex="page"
            :paginationTotal="pageCount"
          >
            <div class="pre-impressao-admin__header">
              <h2>{{ projeto.values.nomeProjeto }}</h2>
            </div>
            <div class="pre-impressao-admin__subheader">
              <p>
                Data da última atualização:<br />
                2020 06 13 às 13h42
              </p>
              <p>
                Horas totais:<br />
                {{ projeto.values.totalHoras }}
              </p>
            </div>
            <div class="pre-impressao-admin__equipe">
              <h3>Equipe</h3>
              <section class="pre-impressao-admin__equipe--nomes">
                <p
                  :key="`equipe-${index}`"
                  v-for="(membro, index) in projeto.values.equipe"
                >
                  {{ membro.nome }}
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
                      v-for="(fase, index) in projeto.values.fases"
                    >
                      <td>{{ fase.nome }}</td>
                      <td>{{ fase.totalHorasFase }}</td>
                      <td>
                        <graf-bar
                          :base="0"
                          :current="fase.totalHorasFase"
                          :total="projeto.values.totalHoras"
                          :height="32"
                          :width="200"
                        />
                      </td>
                    </tr>
                    <tr class="projeto__soma">
                      <td>total</td>
                      <td>{{ projeto.values.totalHoras }}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </pre-impressao-a4>
        </template>
        <template v-if="projeto.ind === 1">
          <pre-impressao-a4
            :paginationIndex="page"
            :paginationTotal="pageCount"
          >
            <div class="pre-impressao-admin__header--fases">
              <h2>{{ projeto.values.nomeProjeto }}</h2>

              <p>
                Horas totais registradas:<br />
                <span>{{ projeto.values.totalHoras }}</span>
              </p>
            </div>

            <div class="pre-impressao-admin__main">
              <div class="projeto">
                <div class="projeto__title">
                  <h3>Horas totais por Subatividades</h3>
                </div>
                <table
                  :key="`fases-${index}`"
                  class="projeto__table"
                  v-for="(fase, index) in projeto.values.fases"
                >
                  <thead>
                    <tr>
                      <th>{{ fase.nome }}</th>
                      <th>Horas</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      :key="`fase-${index}`"
                      class="projeto__fase"
                      v-for="(subatividade, index) in fase.subatividades"
                    >
                      <td>{{ subatividade.nome }}</td>
                      <td>{{ subatividade.totalHoras }}</td>
                      <td>
                        <graf-bar
                          :base="0"
                          :current="subatividade.totalHoras"
                          :total="projeto.totalHoras"
                          :height="32"
                          :width="200"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </pre-impressao-a4>
        </template>
        <template v-if="projeto.ind === 2">
          <pre-impressao-a4
            :paginationIndex="page"
            :paginationTotal="pageCount"
          >
            <div class="pre-impressao-admin__header--fases">
              <h2>{{ projeto.values.nomeProjeto }}</h2>

              <p>
                Horas totais registradas:<br />
                <span>{{ projeto.values.totalHoras }}</span>
              </p>
            </div>

            <div class="pre-impressao-admin__main">
              <div class="projeto">
                <div class="projeto__title">
                  <h3>Horas totais por Funcionário</h3>
                </div>
                <table class="projeto__table">
                  <thead>
                    <tr>
                      <th>Funcionário</th>
                      <th>Horas</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      :key="`usuarios-${index}`"
                      class="projeto__fase"
                      v-for="(membro, index) in projeto.values.equipe"
                    >
                      <td>{{ membro.nome }}</td>
                      <td>{{ membro.totalHoras }}</td>
                      <td>
                        <graf-bar
                          :base="0"
                          :current="membro.totalHoras"
                          :total="projeto.values.totalHoras"
                          :height="32"
                          :width="200"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </pre-impressao-a4>
        </template>
        <template v-if="projeto.ind === 3">
          <pre-impressao-a4
            :paginationIndex="page"
            :paginationTotal="pageCount"
          >
            <div class="pre-impressao-admin__header">
              <h2>{{ projeto.values.nomeMembro }}</h2>
              <p class="pre-impressao-admin--align-right">
                Horas totais registradas<br />
                <span>
                  {{ projeto.values.totalHorasProjeto }}
                </span>
              </p>
            </div>
            <div class="pre-impressao-admin__main">
              <div class="projeto">
                <div class="projeto__title">
                  <h3>{{ projeto.values.nomeProjeto }}</h3>
                  <p>{{ projeto.values.grupo }}</p>
                </div>
                <table class="projeto__table">
                  <thead>
                    <tr>
                      <th>Fases</th>
                      <th>Horas do funcionário</th>
                      <th>Horas da equipe</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="projeto__fase"
                      v-for="(fase, index) in projeto.values.fases"
                      :key="`fase-${index}`"
                    >
                      <td>{{ fase.nome }}</td>
                      <td>{{ fase.horasUsuario }}</td>
                      <td>{{ fase.horasEquipe }}</td>
                      <td>
                        <graf-bar
                          :base="fase.horasEquipe"
                          :current="fase.horasUsuario"
                          :total="projeto.values.totalHorasProjeto"
                          :height="32"
                          :width="200"
                        />
                      </td>
                    </tr>
                    <tr class="projeto__soma">
                      <td>total</td>
                      <td>{{ projeto.values.totalHorasProjetoUsuario }}</td>
                      <td>{{ projeto.values.totalHorasProjeto }}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="pre-impressao-admin__footer">
              <p
                class="pre-impressao-admin__legenda"
                style="border-color: #434343"
              >
                {{ projeto.values.nomeMembro }}
              </p>
              <p
                class="pre-impressao-admin__legenda"
                style="border-color: #DFDFDF"
              >
                Equipe
              </p>
            </div>
          </pre-impressao-a4>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Pdf from '~/libs/pdf'
import { mapState, mapActions, mapMutations } from 'vuex'
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import Preloader from '~/components/elements/Preloader'
import GrafBar from '~/components/elements/GrafBar'

export default {
  name: 'PreImpressaoAdmin',
  layout: 'pre-impressao',
  data () {
    return {
      pageCount: 0,
      joinProjetos: [],
      projeto: {}
    }
  },
  components: {
    PreImpressaoA4,
    Preloader,
    GrafBar
  },
  computed: {
    ...mapState('usuario', ['nome', 'projetos', 'id']),
    ...mapState('pre-impressao', ['page']),
    ...mapState('admin/pre-impressao', {
      fetching: state => state.fetching,
      error: state => state.error,
      err: state => state.err,
      usuariosProjetos: state => state.usuariosProjetos,
      pdfContent: state => state.pdfContent,
      horasFase: state => state.horasFase,
      horasUsuarios: state => state.horasUsuarios,
      individualHoras: state => state.usuariosIndividual
    }),
    isReady () {
      return !this.error && !this.fetching
    }
  },
  watch: {
    pageCount (count) {
      this.SET({ data: count, key: 'pageCount' })
    },
    page (currentPage) {
      if (currentPage > 0) {
        this.currentProjeto()
      }
    },
    usuariosProjetos () {
      this.usuariosByProjetos()
    },
    pdfContent () {
      this.usuariosBySubatividades()
    },
    horasFase () {
      this.usuariosHoras()
    },
    horasUsuarios () {
      this.usuariosIndividual()
    },
    individualHoras () {
      this.joinArrays()
      this.joinProjetos = this.$store.state['admin']['pre-impressao'][
        'joinArrays'
      ]
      this.pageCount = this.joinProjetos.length
      this.currentProjeto()
    },
    joinProjetos () {
      // seta no meta para pegar o valor
      // tentei com emit porém não funcionou
      this.$route.meta.pdfContent = Pdf.pdfAdmin(this.joinProjetos)
      this.$route.meta.fetching = false
    }
  },
  created () {
    // faz o get dos dados primordiais.
    this.setupOn()

    // seta o fetching
    this.$route.meta.fetching = true
  },
  methods: {
    ...mapActions('admin/pre-impressao', [
      'reset',
      'getFases',
      'getProjetos',
      'getUsuarios',
      'getUsuariosProjetos',
      'usuariosByProjetos',
      'usuariosBySubatividades',
      'usuariosHoras',
      'usuariosIndividual',
      'joinArrays'
    ]),
    ...mapMutations('pre-impressao', ['SET']),
    setupOn () {
      this.getProjetos()
      this.getUsuarios()
      this.getUsuariosProjetos()
    },
    currentProjeto () {
      this.projeto = this.joinProjetos[this.page - 1]
    }
    // nextPage () {
    //   this.page = this.page + 1
    //   this.currentProjeto()
    // },
    // prevPage () {
    //   this.page = this.page - 1
    //   this.currentProjeto()
    // }
  }
}
</script>

<style lang="scss" scoped>
.pre-impressao-admin {
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

    &--fases {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;

      p span {
        font-weight: 600;
      }

      h2 {
        font-weight: normal;
        font-size: 1.5rem;
      }
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
    width: 100%;
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
