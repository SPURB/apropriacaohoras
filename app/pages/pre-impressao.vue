<template>
  <div class="pre-impressao-usuario">
    <preloader v-if="fetching" />
    <pre-impressao-a4 v-if="isReady" :paginationIndex="1" :paginationTotal="1">
      <div class="pre-impressao-usuario__header">
        <h2>{{ nome }}</h2>
        <p class="pre-impressao-usuario--align-right">
          Horas totais registrados<br /><span>{{ horasTotaisUsuario }}</span>
        </p>
      </div>
      <div class="pre-impressao-usuario__main">
        <div class="projetos">
          <div
            class="projeto"
            v-for="projeto in projetosFases"
            :key="projeto.id"
          >
            <h3>{{ projeto.nome }}</h3>
            <p>{{ gruposHashTable[projeto.grupo] }}</p>
            <table>
              <thead>
                <tr>
                  <th>Fases</th>
                  <th>Suas horas</th>
                  <th>Horas da equipe</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                <tr
                  class="projeto__fase"
                  v-for="fase in projeto.fases"
                  :key="fase.id"
                >
                  <td>{{ fase.nome }}</td>
                  <td>{{ fase.horasUsuario }}</td>
                  <td>{{ fase.horasEquipe }}</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </pre-impressao-a4>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import PreImpressaoA4 from '~/components/sections/PreImpressaoA4'
import Preloader from '~/components/elements/Preloader'
export default {
  name: 'PreImpressaoUsuario',
  layout: 'pre-impressao',
  components: {
    PreImpressaoA4,
    Preloader
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
        table[grupo.id] = grupo.nome
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

        return {
          nome,
          fases,
          grupo
        }
      })
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
    }
  }
}
</script>
<style lang="scss" scoped>
th,
td {
  border: solid 1px grey;
}
table {
  color: #000;
}
.pre-impressao-usuario {
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
}
</style>
