<template>
  <div class="admin-index">
    <div class="admin-index__container">
      <card-router
        to="/admin/equipes"
        title="Equipes"
        subtitle-icon-class="icon icon-pessoa-outline"
        subtitle="Definir equipes de projetos"
      />
      <card-router
        to="/admin/projetos"
        title="Projetos"
        subtitle-icon-class="icon icon-editar"
        subtitle="Criar projetos, etapas e subetapas"
      />
      <card-router
        to="/admin/relatorios"
        title="Relatórios"
        subtitle-icon-class="icon icon-lista"
        subtitle="Relatórios com dados consolidados"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CardRouter from '~/components/router-links/CardHorizontal'

export default {
  layout: 'admin',
  name: 'adminIndex',
  components: { CardRouter },
  computed: {
    ...mapState({
      admin: state => state.usuario.admin
    })
  }
}
</script>
<style lang="scss" scoped>
.admin-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $desktop;
  height: calc(100vh - 198px);
  margin: auto;
  &__container {
    width: 100%;
    margin: auto;
    a {
      margin: 1.5rem 0;
    }
    @media (max-width: $desktop) {
      max-width: 90%;
      margin: auto;
    }
  }
}
</style>
