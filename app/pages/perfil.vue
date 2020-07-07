<template>
  <div>
    <modal
      v-if="showModal"
      :title="errorTitle"
      :error="error"
      :description="apiMessage"
      :action-description="errorDescription"
      :action-text="actionText"
      @setModalAction="sair"
    />

    <div class="perfil">
      <h1>Perfil</h1>

      <section class="perfil__forms">
        <a
          class="perfil__switch-display"
          data-cy="open__update"
          @click="display = !display"
        >
          <i class="icon icon-adicionar"></i>
          Atualizar dados cadastrais
        </a>
        <input-update
          description="Nome"
          :value="nome"
          :display="display"
          :checkAndEmail="true"
          :values="{ email, nprodam }"
          @setUpdate="handleUpdate"
        />
      </section>
    </div>
  </div>
</template>

<script>
import InputUpdate from '~/components/forms/InputUpdate'
import Modal from '~/components/sections/Modal'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Perfil',
  layout: 'usuario',
  components: {
    InputUpdate,
    Modal
  },
  data () {
    return {
      display: false
    }
  },
  computed: {
    ...mapState('usuario', {
      nome: state => state.usuario.nome,
      email: state => state.usuario.email,
      nprodam: state => state.usuario.nprodam,
      status: state => state.status,
      showModal: state => state.showModal,
      error: state => state.error,
      apiMessage: state => state.apiMessage,
      token: state => state.token
    }),
    errorTitle () {
      const errors = {
        400: 'Erro na requisição',
        403: 'Erro na autenticação',
        500: 'Erro no servidor',
        200: 'Sucesso'
      }
      const title = errors[this.status]

      return title ? title : 'Erro'
    },
    errorDescription () {
      const errors = {
        403: 'Faça o login novamente',
        200: 'Registro atualizado.'
      }
      const description = errors[this.status]
      return description
        ? description
        : 'Entre em contato com o desenvolvedor: \ndesenvolvimento@spurbanismo.sp.gov.br'
    },
    actionText () {
      const errors = {
        403: 'Voltar para login',
        200: 'Voltar'
      }
      const text = errors[this.status]
      return text ? text : 'Tentar novamente'
    }
  },
  methods: {
    ...mapActions('usuario', ['updateUsuario', 'closeModal', 'logout']),
    handleUpdate (param) {
      this.updateUsuario(param)
    },
    sair () {
      if (this.status === 403) {
        this.logout(this.token)
        this.reset()
        this.$router.push('/login')
      } else {
        this.closeModal()
        this.$router.go()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.perfil {
  padding: 2rem;

  h1 {
    color: #fff;
  }

  &__forms {
    width: 100%;
  }

  &__switch-display {
    background-color: $verde;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    color: #fff;
    padding: 1rem;
    transition: ease-in-out 0.25s all;
    .icon {
      font-size: 1.2rem;
      margin-right: 1rem;
      transition: ease-in-out 0.25s all;
    }

    &:hover {
      cursor: pointer;
      background-color: #00a896;
      .icon {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
