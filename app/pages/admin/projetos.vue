<template>
  <div class="projetos">
    <div class="row">
      <div class="column">
        <list-horizontal-nav
          v-if="currentStep === 'Projetos'"
          :routes="projetosRoutes"
          :action-type="'go'"
        />
        <list-horizontal-nav
          v-if="currentStep === 'Fases'"
          :routes="fasesRoutes"
          :action-type="'go'"
        />
        <list-horizontal-nav
          v-if="currentStep === 'Subatividades'"
          :routes="subatividadesRoutes"
          :action-type="'close'"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import ListHorizontalNav from '~/components/router-links/ListHorizontalNav'
export default {
  name: 'Projetos',
  layout: 'admin',
  components: {
    ListHorizontalNav
  },
  computed: {
    ...mapGetters('admin/equipes', ['projetos']),
    ...mapGetters('admin/projetos', ['fases']),
    ...mapState('admin/projetos', ['subatividades']),
    projetosRoutes () {
      return this.projetos.map(projeto => {
        return {
          to: { query: { projeto: projeto.id } },
          title: projeto.nome
        }
      })
    },
    fasesRoutes () {
      if (!this.fases.length) {
        return []
      }
      return this.fases.map(fase => {
        return {
          to: {
            query: {
              projeto: this.idProjeto,
              fase: fase.id
            }
          },
          title: fase.nome
        }
      })
    },
    subatividadesRoutes () {
      if (!this.subatividades.length) {
        return []
      }
      return this.subatividades.map(subatividade => {
        return {
          to: {
            query: {
              projeto: this.idProjeto,
              fase: this.IdFase,
              subatividade: subatividade.id
            }
          },
          title: subatividade.nome
        }
      })
    },
    idProjeto () {
      const id = this.$route.query.projeto
      return id ? id : 0
    },
    idFase () {
      const id = this.$route.query.fase
      return id ? id : 0
    },
    selectedFase () {
      return this.$route.query.fase
    },
    currentStep () {
      if (this.idProjeto && !this.idFase) {
        return 'Fases'
      } else if (this.idProjeto && this.idFase) {
        return 'Subatividades'
      } else {
        return 'Projetos'
      }
    }
  },
  watch: {
    selectedFase (id) {
      if (id) {
        this.getSubatividades(id)
      }
    }
  },
  methods: {
    ...mapActions('admin/equipes', ['getProjetos']),
    ...mapActions('admin/projetos', ['getFases', 'getSubatividades'])
  },
  created () {
    if (!this.projetos.length) {
      this.getProjetos()
    }

    if (!this.fases.length) {
      this.getFases()
    }
  }
}
</script>
<style lang="scss" scoped>
.projetos {
  max-width: $desktop;
  margin: 0 auto;
  min-height: calc(100vh - 200px);
  @media screen {
    @media (max-width: $desktop) {
      max-width: 90%;
      margin: auto;
    }
  }
}
</style>
