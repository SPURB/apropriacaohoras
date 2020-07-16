<template>
  <div class="pre-impressao-usuario">
    <preloader v-if="fetching" />
    <div class="pre-impressao-usuario__container">
      <btn-progresso
        class="pre-impressao-usuario__navigation rotate"
        :disabled="page <= 1"
        @btnPrograssoAction="prevPage"
      />

      <div v-if="isReady" class="pre-impressao-usuario__projetos" id="printer">
        <pre-impressao-a4
          v-if="projeto.totalHorasProjeto"
          :paginationIndex="page"
          :paginationTotal="pageCount"
        >
          <div class="pre-impressao-usuario__header">
            <h2>{{ nome }}</h2>
            <p class="pre-impressao-usuario--align-right">
              Horas totais registradas<br /><span>{{
                horasTotaisUsuario
              }}</span>
            </p>
          </div>
          <div class="pre-impressao-usuario__main">
            <div class="projeto">
              <div class="projeto__title">
                <h3>{{ projeto.nome }}</h3>
                <p>{{ projeto.grupo }}</p>
              </div>
              <table class="projeto__table">
                <thead>
                  <tr>
                    <th>Fases</th>
                    <th>Suas horas</th>
                    <th>Horas da equipe</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="projeto__fase"
                    v-for="fase in projeto.fases"
                    :key="fase.id"
                  >
                    <td>{{ fase.nome }}</td>
                    <td>{{ fase.horasUsuario }}</td>
                    <td>{{ fase.horasEquipe }}</td>
                    <td>
                      <graf-bar
                        :base="fase.horasEquipe"
                        :current="fase.horasUsuario"
                        :total="projeto.totalHorasProjeto"
                        :height="32"
                        :width="200"
                      />
                    </td>
                  </tr>
                  <tr class="projeto__soma">
                    <td>total</td>
                    <td>{{ projeto.totalHorasProjetoUsuario }}</td>
                    <td>{{ projeto.totalHorasProjeto }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="pre-impressao-usuario__footer">
            <p
              class="pre-impressao-usuario__legenda"
              style="border-color: #434343"
            >
              {{ nome }}
            </p>
            <p
              class="pre-impressao-usuario__legenda"
              style="border-color: #DFDFDF"
            >
              Equipe
            </p>
          </div>
        </pre-impressao-a4>
      </div>
    </div>

    <btn-progresso
      class="pre-impressao-usuario__navigation"
      :disabled="page === pageCount"
      @btnPrograssoAction="nextPage"
    />
  </div>
</template>

<script>
import Lib from '~/libs/'
import { mapState, mapActions } from 'vuex'
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import BtnProgresso from '~/components/elements/BtnProgresso'
import Preloader from '~/components/elements/Preloader'
import GrafBar from '~/components/elements/GrafBar'

export default {
  name: 'PreImpressaoUsuario',
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
    ...mapState('pre-impressao', [
      'fetching',
      'error',
      'err',
      'horasProjetosUsuario',
      'projetosUsuario',
      'gruposUsuario',
      'fasesUsuario',
      'horas'
    ]),
    isReady () {
      return !this.error && !this.fetching
    },
    horasTotaisUsuario () {
      if (!this.horasProjetosUsuario.length) return 0

      return this.horasProjetosUsuario
        .map(res => res.total)
        .reduce((acc, total) => acc + total, 0)
    },
    gruposHashTable () {
      if (!this.gruposUsuario.length) return {}

      let table = {}

      this.gruposUsuario.forEach(grupo => {
        if (grupo.nome && grupo.id) {
          table[grupo.id] = grupo.nome
        }
      })

      return table
    },
    validFases () {
      if (!this.fasesUsuario.length) return []
      return this.flatArrays(this.fasesUsuario)
    },
    validHoras () {
      if (!this.horas.length) return []
      return this.flatArrays(this.horas)
    },
    projetosFases () {
      if (
        !this.projetosUsuario.length ||
        !this.validFases.length ||
        !this.validHoras.length
      )
        return []

      return this.projetosUsuario.map(({ id, grupo, ativo, nome }) => {
        const fases = this.validFases
          .filter(fase => grupo === fase.grupo)
          .map(fase => {
            const horas = this.validHoras.filter(
              hora => hora.projeto === id && hora.fase === fase.id
            )

            const horasEquipe = horas
              .map(({ horas, extras }) => horas + extras)
              .reduce((acc, total) => acc + total, 0)

            // this.id -> id do usuário
            const horasUsuario = horas
              .filter(hora => hora.usuario === this.id)
              .map(({ horas, extras }) => horas + extras)
              .reduce((acc, total) => acc + total, 0)

            return {
              id: fase.id,
              nome: fase.nome,
              horasEquipe,
              horasUsuario
            }
          })

        const horasTotais = this.validHoras
          .map(({ horas, extras, usuario, projeto }) => {
            return {
              total: horas + extras,
              usuario,
              projeto
            }
          })
          .filter(({ projeto }) => projeto === id)

        const totalHorasProjeto = horasTotais.reduce(
          (acc, { total }) => acc + total,
          0
        )

        const totalHorasProjetoUsuario = horasTotais
          .filter(({ usuario }) => usuario === this.id)
          .reduce((acc, { total }) => acc + total, 0)

        return {
          nome,
          fases,
          grupo: this.gruposHashTable[grupo],
          totalHorasProjeto,
          totalHorasProjetoUsuario
        }
      })
    },
    projetosForPdf () {
      return this.projetosFases.filter(projeto => projeto.totalHorasProjeto > 0)
    },
    pageCount () {
      if (!this.projetosFases.length) return 0
      const valid = this.projetosFases.filter(
        ({ totalHorasProjeto }) => totalHorasProjeto
      )
      return valid.length
    }
  },
  watch: {
    projetos () {
      this.setupHorasProjetos()
    },
    projetosUsuario (projetos) {
      if (!projetos.length) return

      const grupos = projetos.map(({ grupo }) => grupo)
      const uniqueGrupos = [...new Set(grupos)]

      this.getGruposUsuario({ ids: uniqueGrupos })
    },
    projetosForPdf () {
      if (this.projetosFases.length > 0) {
        this.projeto = this.projetosFases[0]
        this.setContentForPdf(Lib.pdfContent(this.projetosForPdf, this.nome))
      }
    },
    gruposUsuario (grupos) {
      const ids = grupos.map(grupo => grupo.id)
      this.getFasesUsuario({ ids })
    }
  },
  created () {
    this.setupHorasProjetos()
  },
  methods: {
    ...mapActions('pre-impressao', [
      'setContentForPdf',
      'getHorasProjetos',
      'getProjetosUsuario',
      'getGruposUsuario',
      'getFasesUsuario',
      'getHoras'
    ]),
    setupHorasProjetos () {
      this.getHorasProjetos({
        ids: this.projetos,
        today: this.$moment().format('YYYY-MM-DD'),
        user: this.id
      })
      this.getProjetosUsuario({ ids: this.projetos })
      this.getHoras({ ids: this.projetos })
    },
    flatArrays (multipleArrays) {
      let combined = []

      multipleArrays.map(({ values }) => {
        values.forEach(val => combined.push(val))
      })

      return combined
    },
    currentProjeto () {
      this.projeto = this.projetosFases[this.page - 1]
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
.pre-impressao-usuario {
  display: flex;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    h2 {
      font-weight: normal;
      font-size: 1.52rem;
    }
    span {
      font-size: 1rem;
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
  margin-top: 2rem;
  &__title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid $cinza1;
    h3 {
      font-size: 1rem;
      font-weight: normal;
    }
  }
  &__table {
    border-collapse: collapse;
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
