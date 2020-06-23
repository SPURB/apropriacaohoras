<template>
  <div class="admin-grupos">
    <modal
      class="admin-grupos__modal"
      v-if="modal.display"
      :title="modal.title"
      :error="modal.error"
      :description="modal.description"
      :action-description="modal.actionDescription"
      :action-text="modal.actionText"
      @setModalAction="modal.action"
    />
    <div class="row">
      <div class="column">
        <h3>Grupos de projetos</h3>
        <p>Selecione ou crie um grupo de projetos</p>
        <voltar class="admin-grupos__voltar" :to="'/admin'" />
        <ul class="admin-grupos__cards">
          <li
            v-for="grupo in grupos"
            class="admin-grupos__card"
            :key="grupo.id"
          >
            <card-horizontal
              :to="
                `/admin/projetos?grupo=${grupo.id}&grupoName=${grupo.nome}&grupoDescription=${grupo.descricao}`
              "
              :title="grupo.nome"
              :subtitle="grupo.descricao"
              :isEditable="{ editable: true, entidade: 'grupos', id: grupo.id }"
              @updateCard="updateGrupo"
            />
          </li>
        </ul>
        <input-create
          title="Criar grupo de projetos"
          description="Título"
          :addMetaDescription="true"
          metaDescriptioinLabel="Descrição"
          @setValue="createGrupo"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Voltar from '~/components/router-links/Voltar'
import CardHorizontal from '~/components/router-links/CardHorizontal'
import InputCreate from '~/components/forms/InputCreate'
import Modal from '~/components/sections/Modal'

export default {
  name: 'Grupos',
  layout: 'admin',
  components: {
    Voltar,
    CardHorizontal,
    InputCreate,
    Modal
  },
  computed: {
    ...mapState('admin/grupos', [
      'grupos',
      'fetching',
      'error',
      'title',
      'success',
      'message'
    ]),
    ...mapState('usuario', ['token']),
    modal () {
      return {
        display: this.error || this.success,
        title: this.title,
        error: this.error,
        description: this.message,
        actionDescription: this.error ? 'Faça o login novamente' : '',
        actionText: this.success ? '' : 'Tentar novamente',
        action: () => {
          if (this.error) {
            this.logout(this.token)
            this.resetAsync()
            this.$router.push('/login')
          } else {
            this.reset()
            this.getGrupos()
          }
        }
      }
    }
  },
  methods: {
    ...mapActions('usuario', ['logout', 'resetAsync']),
    ...mapActions('admin/grupos', [
      'getGrupos',
      'setGrupo',
      'putGroup',
      'reset'
    ]),
    createGrupo ({ input, meta }) {
      this.setGrupo({ nome: input, descricao: meta })
    },
    updateGrupo (value) {
      this.putGroup(value)
    }
  },
  created () {
    this.getGrupos()
  }
}
</script>
<style lang="scss" scoped>
p,
h3 {
  padding: 0.25rem;
  margin: 0;
}

.admin-grupos {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: $desktop;
  margin: 3rem auto 0;
  &__modal {
    top: 0;
  }
  &__voltar {
    margin: 2rem 0 1rem;
  }
  &__cards {
    text-decoration: none;
    list-style: none;
    padding: 0;
  }
  &__card {
    margin-bottom: 1rem;
  }
  @media screen {
    @media (max-width: $desktop) {
      max-width: 90%;
    }
  }
}
</style>
