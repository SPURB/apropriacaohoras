<template>
  <div class="confirm-pass">
    <AppHeader />
    
    <section class="confirm-pass__main">
      <BoxEmail titulo="REDEFINIR SENHA PARA" :email="email" />

      <form @submit.prevent="toReset()" class="confirm-pass__form">
        <label for="current__password">SENHA ATUAL</label>
        <div class="confirm-pass__input">
          <span @click="showPassword = !showPassword">
            <visible-icon :visible="!showPassword" />
          </span>
          <input 
            :type="!showPassword ? 'password' : 'text'" 
            name="current__password" 
            v-model="password" 
          />
        </div>
        <btn-progresso
          class="auth__btn"
          data-cy="btn__email"
          @click="toReset()"
          v-on:keyup.enter="toReset()"
          :disabled="password === ''"
        />
      </form>
    </section>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import BoxEmail from '~/components/elements/BoxEmail'
import VisibleIcon from '~/components/elements/VisibleIcon'
import BtnProgresso from '~/components/elements/BtnProgresso'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ConfirmPass',
  data () {
    return {
      password: '',
      showPassword: false
    }
  },
  components: {
    AppHeader,
    BoxEmail,
    VisibleIcon,
    BtnProgresso
  },
  computed: {
    ...mapState('usuario', {
      email: state => state.usuario.email
    })
  },
  methods: {
    ...mapActions('usuario', ['resetAsync']),
    async toReset () {
      const email = this.email
      await this.resetAsync()
      this.$router.push(`/reset?email=${email}&reset=${this.password}`)
    }
  },
}
</script>

<style lang="scss" scoped>
.confirm-pass {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__main {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    width: 100%;
  }
  
  &__form {
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    width: 40%;

    label {
      margin-left: 3rem;
      @media (max-width: $phone) {
        margin-left: 2rem;
      }
    }
  
    .auth__btn { align-self: flex-end; }

    @media (max-width: $phone) {
      width: 80%;
    }
  }

  &__input {
    display: flex;

    input {
      border: none;
      border-radius: 24px;
      background-color: rgba(255, 255, 255, 0.08);
      color: inherit;
      font-size: inherit;
      padding: 0 0.75rem;
      height: 3rem;
      outline: none;
      width: 100%;
      margin-top: 0.30rem;
    }

    span {
      align-items: center;
      cursor: pointer;
      display: flex;
      margin-top: 0.9rem;
      height: 100%;
      width: 10%;

      @media (max-width: $phone) {
        width: 15%
      }
    }
  }
}
</style>
