<template>
  <div class="pre-impressao-admin">
    <div class="pre-impressao-admin__container">
      <div class="pre-impressao-admin__projetos">
        <pre-impressao-admin-section-1 v-if="section === 1" />
        <pre-impressao-admin-section-2 v-if="section === 2" />
        <pre-impressao-admin-section-3 v-if="section === 3" />
      </div>
    </div>
  </div>
</template>

<script>
import { pdfAdmin } from '~/libs/pdf'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { createHashTable } from '~/libs/helpers'
import PreImpressaoAdminSection1 from '~/components/sections/PreImpressaoAdminSection1'
import PreImpressaoAdminSection2 from '~/components/sections/PreImpressaoAdminSection2'
import PreImpressaoAdminSection3 from '~/components/sections/PreImpressaoAdminSection3'

export default {
  name: 'PreImpressaoAdmin',
  layout: 'pre-impressao',
  components: {
    PreImpressaoAdminSection1,
    PreImpressaoAdminSection2,
    PreImpressaoAdminSection3
  },
  computed: {
    ...mapGetters('admin/pre-impressao/section1', [
      'totalHoras',
      'fasesComHoras'
    ]),
    ...mapState('admin/pre-impressao/section1', [
      'projeto',
      'horas',
      'fases',
      'usuarios'
    ]),
    ...mapGetters('admin/pre-impressao/section2', ['subatividadesFlat']),
    section () {
      return parseInt(this.$route.query.section)
    },
    allset () {
      return (
        (this.horas.length > 0) +
          (this.fases.length > 0) +
          (this.usuarios.length > 0) +
          (this.subatividadesFlat.length > 0) ===
        4
      )
    },
    fasesHashTable () {
      return createHashTable(this.fases)
    },
    subatividadesHashTable () {
      return createHashTable(this.subatividadesFlat)
    },
    usuariosHashTable () {
      return createHashTable(this.usuarios)
    }
  },
  watch: {
    allset (isSet) {
      if (isSet) {
        this.$nuxt.$emit('getCsv', this.createCsv())
        this.$nuxt.$emit(
          'getPdf',
          pdfAdmin({
            usuarios: this.usuarios,
            fases: this.fases,
            fasesComHoras: this.fasesComHoras,
            horas: this.horas,
            projeto: this.projeto,
            subatividadesFlat: this.subatividadesFlat,
            totalHoras: this.totalHoras
          })
        )
      }
    },
    fases (items) {
      if (items.length) {
        this.getSubatividades(items)
      }
    }
  },
  created () {
    const { projeto } = this.$route.query
    this.getProjetoInfo(projeto)
    this.getUsuarios(projeto)
    this.getHoras(projeto)
  },
  methods: {
    ...mapActions('admin/pre-impressao/section1', [
      'getProjetoInfo',
      'getUsuarios',
      'getHoras'
    ]),
    ...mapActions('admin/pre-impressao/section2', ['getSubatividades']),
    createCsv () {
      return this.horas.map(
        ({
          projeto,
          fase,
          subatividade,
          usuario,
          dataRefInicio,
          extras,
          horas,
          descricao
        }) => {
          return {
            projeto: this.projeto,
            fase: this.fasesHashTable[fase],
            subatividade: this.subatividadesHashTable[subatividade],
            usuario: this.usuariosHashTable[usuario],
            'data de referência': dataRefInicio,
            horas,
            extras,
            descricao
          }
        }
      )
    }
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
      &.graf-barra {
        justify-content: flex-end;
      }
    }
    &--paginado {
      margin-top: 1rem;
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
