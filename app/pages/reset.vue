<template>
  <div class="reset-password">
    <modal
      v-if="erro"
      :title="'Link inválido'"
      :error="true"
      :description="
        'Este link não está autorizado ou expirou. Tente fazer o login com a sua senha atual'
      "
      :action-description="
        'Se tiver problemas entre em contato com desenvolvimento@spurbanismo.sp.gov.br'
      "
      :action-text="'Fazer login com senha atual'"
      @setModalAction="resetAndredirect('/login', { email })"
    />

    <modal
      v-if="show"
      :title="modal.title"
      :error="typeErro"
      :description="modal.description"
      :action-description="modal.action.description"
      :action-text="modal.action.text"
      @setModalAction="resetAndredirect('/login', { email })"
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
            data-cy="input__fpass"
          />
        </p>
        <p class="reset__password">
          <label for="second__password">CONFIRME SUA SENHA</label>
          <input 
            type="password" 
            name="second__password" 
            v-model="form.spass" 
            data-cy="input__spass"
          />
        </p>
        <btn-progresso class="btn__reset" data-cy="btn__reset" />
      </form>
    </section>
  </div>
</template>

<script>
import BoxEmail from '~/components/elements/BoxEmail'
import BtnProgresso from '~/components/elements/BtnProgresso'
import Modal from '~/components/sections/Modal'
import AppFooter from '~/components/sections/AppFooter'
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
      show: false,
      typeErro: false,
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
  created () {
    this.login({ email: this.email, password: this.password })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.resetAsync()
    })
  },
  methods: {
    ...mapActions('usuario', ['login', 'resetAsync']),
    ...mapMutations('usuario', ['RESET', 'SET_ERROR']),
    clearInputs (message) {
      this.form.fpass = ''
      this.form.spass = ''
      this.$refs.fpass.focus()
      this.modal.title = 'Senha negada.'
      this.modal.description = message
      this.modal.action.description =
        'Sua senha foi negada, por favor insira corretamente.'
      this.modal.action.text = 'Tente novamente'
      this.show = true
      this.typeErro = true

      setTimeout(() => {
        this.show = false
      }, 2500)
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
        this.clearInputs('Senha já utilizada, cadastre uma senha diferente.')
      } else {
        this.resetPassword(this.form.fpass)
      }
    },
    resetPassword (password) {
      Usuario.reset({ password }, this.id, this.token)
        .then(res => {
          ;(this.modal.title = 'Senha alterada.'),
            (this.modal.description = 'Senha alterada com sucesso.'),
            (this.modal.action.description =
              'Sua senha foi alterada, você será redirecionado para realizar o acesso a plataforma com a senha que acabou de cadastrar.'),
            (this.modal.action.text = 'Efetuar login')
          this.typeErro = false
          this.show = true
        })
        .catch(err => {
          this.SET_ERROR(err)
        })
    },
    resetAndredirect (path, query) {
      this.resetAsync()
      if (!this.email || !this.password) {
        this.$router.push({ path: '/login', query: {} })
      }
      this.$router.push({ path, query })
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
