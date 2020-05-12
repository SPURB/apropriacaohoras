<template>
  <div class="projetos">
    <div class="row">
      <div class="column">
        <h2>Projetos</h2>
				<list-horizontal-nav :routes='projetosRoutes' />
        <!-- <ul v-if='!idProjeto' class="lista-projetos">
          <li
            class="lista-projetos__projeto"
            v-for="(projeto, index) in projetos"
            :key="index"
          >
            <router-link :to="{ query: { projeto: projeto.id } }" tag="a">{{
              projeto.nome
            }}</router-link>
          </li>
        </ul>
				<admin-projetos-projeto v-else :idProjeto="idProjeto" /> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import AdminProjetosProjeto from '~/components/sections/AdminProjetosProjeto'
import ListHorizontalNav from '~/components/router-links/ListHorizontalNav'
export default {
  name: 'Projetos',
	layout: 'admin',
	components: {
		// AdminProjetosProjeto,
		ListHorizontalNav
	},
  computed: {
		...mapGetters('admin/equipes', ['projetos']),
		projetosRoutes () {
			return this.projetos.map(projeto => {
				return {
					to: { query: { projeto: projeto.id } },
					title: projeto.nome
				}
			})
		},
		idProjeto () {
			const id =  this.$route.query.projeto
			return id ? id : 0
		}
  },
  methods: {
    ...mapActions('admin/equipes', ['getProjetos'])
  },
  created () {
    if (!this.projetos.length) {
      this.getProjetos()
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
