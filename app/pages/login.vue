<template>
  <div class="login">
    <modal
      v-if="error"
      :title="modal.title"
      :error="error"
      :description="modal.description"
      :action-description="modal.action.description"
      :action-text="modal.action.text"
      @setModalAction="RESET"
    />
    <div class="auth-card">
      <section v-if="!validEmail" class="card__email">
        <form class="auth email" @submit.prevent="checkInputEmail">
          <p class="auth__group">
            <label for="auth__email-alias">SEU EMAIL</label>
            <input
              type="text"
              name="auth__email-alias"
              id="auth__email-alias"
              v-model="alias"
              data-cy="input__email"
              autofocus
            />
          </p>
          <p class="auth__group separador">@</p>
          <input-options
            style="margin-top:1rem"
            :options="hostOptions"
            @setOptionValue="setOption"
          />
          <btn-progresso
            class="auth__btn"
            data-cy="btn__email"
            v-on:keyup.enter="checkInputEmail"
            :disabled="alias === ''"
          />
        </form>
      </section>
      <section v-else class="card__pass">
        <preloader
          class="card-pass__preloader-wrapper"
          v-if="fetching"
          :color="'#fff'"
          :message="'Verificando suas credenciais'"
        />
        <form
          v-else
          class="auth pass"
          @submit.prevent="login({ email, password })"
        >
          <p class="auth__group">
            <label tabindex="1000" for="auth__pass-input">SENHA</label>
            <input
              type="password"
              id="auth__pass-input"
              name="auth__pass-input"
              v-model="password"
              data-cy="input__pass"
            />
          </p>
          <btn-progresso
            class="auth__btn"
            data-cy="btn__confirm"
            v-on:keyup.enter="login({ email, password })"
            :disabled="password === ''"
          />
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import BtnProgresso from '~/components/elements/BtnProgresso'
import InputOptions from '~/components/forms/InputOptions'
import Modal from '~/components/Modal'
import Preloader from '~/components/elements/Preloader'

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'Login',
  components: {
    BtnProgresso,
    InputOptions,
    Modal,
    Preloader
  },
  data () {
    return {
      alias: '',
      host: 'spurbanismo.sp.gov.br',
      hostOptions: [
        {
          title: 'spurbanismo.sp.gov.br',
          value: 'spurbanismo.sp.gov.br'
        },
        {
          title: 'prefeitura.sp.gov.br',
          value: 'prefeitura.sp.gov.br'
        },
        {
          title: 'spurbanismo.sp.gov.br',
          value: 'spurbanismo.sp.gov.br'
        }
      ],
      validEmail: false,
      password: '',
      modal: {
        title: 'Erro!',
        description: 'Usuário não autenticado',
        action: {
          description:
            'Solicite o acesso para \ndesenvolvimento@spurbanismo.sp.gov.br',
          text: 'Tentar novamente'
        }
      }
    }
  },
  computed: {
    ...mapState({
      id: state => state.usuario.id,
      fetching: state => state.usuario.fetching,
      error: state => state.usuario.error,
      admin: state => state.usuario.admin
    }),
    email: {
      get () {
        return `${this.alias}@${this.host}`
      },
      set (settedEmail) {
        this.alias = settedEmail.split('@')[0]
        this.host = settedEmail.split('@')[1]

        if (this.host === 'prefeitura.sp.gov.br') {
          this.hostOptions = this.hostOptions.reverse()
        }
      }
    }
  },
  watch: {
    id (usuarioId) {
      if (usuarioId) {
        this.filterProjetos(usuarioId)
        this.$router.push({ path: `/registrar` })
      }
    },
    admin (isAdmin) {
      if (isAdmin) {
        this.$router.push({ path: '/admin' })
      }
    }
  },
  methods: {
    ...mapActions('usuario', ['login', 'filterProjetos']),
    ...mapMutations('usuario', ['RESET']),
    setOption (value) {
      this.host = value
    },
    checkInputEmail () {
      this.validEmail = true // criar verificação de email no backend aqui
      this.$router.push({
        query: { email: this.email }
      })
    },
    isValidEmail (email) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@spurbanismo.sp.gov.br|[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@prefeitura.sp.gov.br/gim.test(
        email
      )
    }
  },
  created () {
    if (!this.$route.query.email) {
      return
    } else if (!this.isValidEmail(this.$route.query.email)) {
      return
    }

    this.email = this.$route.query.email
    this.validEmail = true
  }
}
</script>
<style lang="scss" scoped>
.auth-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  @media (max-width: $tablet) {
    margin: 2rem;
  }
}
.auth {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-family: $grot;
  padding-bottom: 3rem;
  &__group {
    display: flex;
    flex-direction: column;
    color: #fff;
    margin-top: 0;
  }
  &__btn {
    @media (max-width: $phone) {
      margin-top: 7rem;
    }
  }
}

.card__pass {
  width: -moz-available;
}

.separador {
  padding-top: 0.5rem;
  margin: 0.5rem;
}

input {
  border: none;
  color: inherit;
  background-color: rgba(255, 255, 255, 0.08);
  padding: 0 0.75rem;
  height: 3rem;
  border-radius: 24px;
  font-size: inherit;
  outline: none;
}

.pass {
  input {
    min-width: 400px;
    @media (max-width: 450px) {
      min-width: 250px;
    }
  }
  .auth__btn {
    margin: 0;
  }
}

label {
  margin-bottom: 0.25rem;
}
</style>
