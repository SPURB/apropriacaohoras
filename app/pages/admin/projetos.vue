<template>
  <div class="projetos">
    <div class="row">
      <div class="column">
        <h2>Projetos</h2>
        <ul class="lista-projetos">
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
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Projetos',
  layout: 'admin',
  computed: {
    ...mapGetters('admin/equipes', ['projetos'])
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
