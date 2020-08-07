<template>
  <div
    class="pre-impressao-usuario"
    :style="{ display: fetching ? 'block' : 'flex' }"
  >
    <preloader v-if="fetching" />
    <div class="pre-impressao-usuario__container">
      <div v-if="isReady" class="pre-impressao-usuario__projetos">
        <pre-impressao-a4
          v-if="projeto.totalHorasProjeto"
          :paginationIndex="page"
          :paginationTotal="pageCount"
          @getA4Width="setDinamicBreakPoints"
        >
          <div class="pre-impressao-usuario__header">
            <h2>{{ nome }}</h2>
            <p class="pre-impressao-usuario--align-right">
              Horas totais registradas<br /><span>{{
                projeto.totalHorasProjetoUsuario
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
                    <th v-if="showgrafbar"></th>
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
                    <td v-if="showgrafbar">
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
                    <td v-if="showgrafbar"></td>
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
  </div>
</template>

<script>
import Pdf from '~/libs/pdf'
import { mapState, mapActions, mapMutations } from 'vuex'
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import Preloader from '~/components/elements/Preloader'
import GrafBar from '~/components/elements/GrafBar'
import { createHashTable } from '~/libs/helpers'

export default {
  name: 'PreImpressaoUsuario',
  layout: 'pre-impressao',
  data () {
    return {
      projeto: {},
      showgrafbar: true
    }
  },
  components: {
    PreImpressaoA4,
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
      'horas',
      'page'
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
      return createHashTable(this.gruposUsuario)
    },
    validFases () {
      if (!this.fasesUsuario.length) return []
      return this.flatArrays(this.fasesUsuario)
    },
    validHoras () {
      if (!this.horas.length) return []
      return this.flatArrays(this.horas)
    },
    fasesHashTable () {
      if (!this.validFases.length) return {}
      return createHashTable(this.validFases)
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
    page (currentPage) {
      if (currentPage > 0) {
        this.currentProjeto()
      }
    },
    pageCount (count) {
      this.SET({ data: count, key: 'pageCount' })
    },
    projetos () {
      this.setupHorasProjetos()
    },
    projetosUsuario (projetos) {
      if (!projetos.length) return

      const grupos = projetos.map(({ grupo }) => grupo)
      const uniqueGrupos = [...new Set(grupos)]

      this.getGruposUsuario({ ids: uniqueGrupos })
    },
    projetosForPdf (projetos) {
      if (this.projetosFases.length > 0) {
        this.projeto = this.projetosFases[0]

        const contentPdf = Pdf.pdfUsuario(this.projetosForPdf, this.nome)

        const contentCsv = projetos.map(({ fases, grupo, nome }) => {
          const values = fases.map(({ horasUsuario, horasEquipe, id }) => {
            return {
              grupo,
              projeto: nome,
              fase: this.fasesHashTable[id],
              'suas horas': horasUsuario,
              'horas da equipe': horasEquipe
            }
          })

          return {
            values
          }
        })

        this.$nuxt.$emit('getPdf', contentPdf)
        this.$nuxt.$emit('getCsv', this.flatArrays(contentCsv))
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
      'getHorasProjetos',
      'getProjetosUsuario',
      'getGruposUsuario',
      'getFasesUsuario',
      'getHoras'
    ]),
    ...mapMutations('pre-impressao', ['SET']),
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
      return multipleArrays.map(({ values }) => values).flat()
    },
    currentProjeto () {
      this.projeto = this.projetosFases[this.page - 1]
    },
    setDinamicBreakPoints (width) {
      if (width < 800) {
        this.showgrafbar = false
      }
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
      @media (max-width: $phone) {
        font-size: 1rem;
      }
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
  &__container,
  &__projetos,
  .projeto__table {
    width: 100%;
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
        flex-direction: row-reverse;
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
