<template>
  <div class="admin-index">
    <div class="admin-index__container">
      <card-router
        to="/admin/equipes"
        title="Equipes"
        subtitle-icon-class="icon icon-pessoa-outline"
        subtitle="Definir equipes de projetos"
        data-cy="card__router__equipe"
        class="admin-index__card"
      />
      <card-router
        to="/admin/grupos"
        title="Projetos"
        subtitle-icon-class="icon icon-editar"
        subtitle="Criar grupos, projetos, etapas e subetapas"
        data-cy="card__router__projetos"
        class="admin-index__card"
      />
      <card-router
        to="/admin/relatorios"
        title="Relatórios"
        subtitle-icon-class="icon icon-lista"
        subtitle="Relatórios com dados consolidados"
        data-cy="card__router__relatorios"
        class="admin-index__card"
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
  margin: auto;
  min-height: calc(100vh - 138px);
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
    @media (max-width: $tablet) {
      margin-top: 0;
    }
  }

  &__card {
    margin: 1.5rem 0;
  }
}
</style>
