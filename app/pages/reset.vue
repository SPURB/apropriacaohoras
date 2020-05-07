<template>
  <div class="reset-password">
    <modal
      v-if="error"
      :title="modal.title"
      :error="false"
      :description="modal.description"
      :action-description="modal.action.description"
      :action-text="modal.action.text"
      @setModalAction="RESET"
    />
    <box-email :email="email" :titulo="`DEFINA UMA SENHA PARA`" />
    <section class="card__password">
      <form class="form__password" @submit.prevent="checkPassword">
        <p class="reset__password">
          <label for="first__password">DEFINA UMA SENHA</label>
          <input
            type="password"
            name="first__password"
            v-model="form.fpass"
            ref="fpass"
            autofocus
          />
        </p>
        <p class="reset__password">
          <label for="second__password">CONFIRME SUA SENHA</label>
          <input type="password" name="second__password" v-model="form.spass" />
        </p>
        <btn-progresso class="btn__reset" />
      </form>
    </section>
  </div>
</template>

<script>
import BoxEmail from '~/components/elements/BoxEmail'
import BtnProgresso from '~/components/elements/BtnProgresso'
import Modal from '~/components/Modal'
import AppFooter from '~/components/AppFooter'
import Usuario from '~/services/api-usuario'

import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Resetar',
  components: {
    BoxEmail,
    BtnProgresso,
    Modal,
    AppFooter
  },
  data () {
    return {
      form: {
        fpass: '',
        spass: ''
      },
      error: false,
      modal: {
        title: 'Senha alterada.',
        description: 'Senha alterada com sucesso.',
        action: {
          description:
            'Sua senha foi alterada, você será redirecionado para realizar o acesso a plataforma com a senha que acabou de cadastrar.',
          text: 'Efetuar login'
        }
      }
    }
  },
  computed: {
    email () {
      return this.$route.query.email
    },
    password () {
      return this.$route.query.reset
    },
    ...mapState({
      id: state => state.usuario.id,
      token: state => state.usuario.token,
      erro: state => state.usuario.error
    })
  },
  watch: {
    erro (newErro) {
      if (!newErro) {
        this.$router.push(`/login?email=${this.email}`)
      }
    }
  },
  created () {
    this.login({ email: this.email, password: this.password })
  },
  methods: {
    ...mapActions('usuario', ['login']),
    ...mapMutations('usuario', ['RESET']),
    clearInputs (message) {
      this.form.fpass = ''
      this.form.spass = ''
      this.$refs.fpass.focus()
      alert(message)
    },
    checkPassword () {
      if (this.form.fpass !== this.form.spass) {
        this.clearInputs(
          'Senhas digitadas não são iguais, por favor tente novamente!'
        )
      } else if (
        this.form.fpass === this.form.spass &&
        this.form.fpass === this.password
      ) {
        this.clearInputs('Senha já utilizada, cadastre uma senha diferente')
      } else {
        this.resetPassword(this.form.fpass)
      }
    },
    resetPassword (password) {
      Usuario.reset({ password }, this.id, this.token)
        .then(res => {
          this.error = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateStorage () {
      setTimeout(() => {
        this.$router.push(`/login?email=${this.email}`)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-password {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;

  .card__password {
    width: 50%;

    .form__password {
      display: flex;
      flex-direction: column;
      width: 100%;

      .btn__reset {
        align-self: flex-end;
      }
    }

    .reset__password {
      color: #fff;
      display: flex;
      flex-direction: column;
      width: 100%;

      input {
        border: none;
        color: inherit;
        background-color: rgba(255, 255, 255, 0.08);
        padding: 0 0.75rem;
        height: 3rem;
        border-radius: 24px;
        font-size: inherit;
        outline: none;
        width: 100%;
      }

      label {
        margin-bottom: 0.25rem;
      }
    }

    @media (max-width: $phone) {
      width: 90%;
    }
  }
}
</style>
