<template>
  <div class="admin-grupos">
    <div class="row">
      <div class="column">
        <h3>Grupos de projetos</h3>
        <p>Selecione ou crie um grupo de projetos</p>
        <voltar :to="'/admin'" />
        <ul>
          <li v-for="grupo in grupos" :key="grupo.id">
            <card-horizontal
              :to="`/admin/projetos?grupo=${grupo.id}`"
              :title="grupo.nome"
              :subtitle="grupo.descricao"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Voltar from '~/components/router-links/Voltar'
import CardHorizontal from '~/components/router-links/CardHorizontal'
export default {
  name: 'Grupos',
  layout: 'admin',
  components: {
    Voltar,
    CardHorizontal
  },
  computed: {
    ...mapState('admin/grupos', [ 'grupos', 'fetching', 'error', 'message' ])
  },
  methods: {
    ...mapActions('admin/grupos', ['getGrupos'])
  },
  created () {
    this.getGrupos()
  }
}
</script>
<style lang="scss" scoped>
p,
h3 {
  padding: 0;
  margin: 0;
}
</style>
