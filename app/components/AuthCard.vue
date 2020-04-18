<template>
  <div class="auth-card">
    <section v-if="!validEmail" class="card__email">
      <form class="auth email" @submit.prevent="checkInputEmail">
        <p class="auth__group">
          <label for="auth__email-alias">SEU EMAIL</label>
          <input
            tabindex="10000"
            type="text"
            name="auth__email-alias"
            id="auth__email-alias"
            v-model="alias"
            autofocus
          />
        </p>
        <p class="auth__group separador">@</p>
        <input-options :options="hostOptions" @setOptionValue="setOption" />
        <btn-progresso
          class="auth__btn"
          v-on:keyup.enter="checkInputEmail"
          :disabled="alias === ''"
        />
      </form>
    </section>
    <section v-else class="card__pass">
      <p class="message">
        VERIFIQUE SUA SENHA EM <br /><a
          class="message__action"
          :href="`https://correioweb.prefeitura.sp.gov.br/exchange/${email}`"
          >{{ email.toUpperCase() }}</a
        >
      </p>
      <form class="auth pass" @submit.prevent="checkInputPass">
        <p class="auth__group">
          <label tabindex="1000" for="auth__pass-input"
            >SUA SENHA DE ACESSO</label
          >
          <input
            type="password"
            id="auth__pass-input"
            name="auth__pass-input"
            v-model="pass"
          />
        </p>
        <btn-progresso
          class="auth__btn"
          v-on:keyup.enter="checkInputPass"
          :disabled="pass === ''"
        />
      </form>
    </section>
  </div>
</template>

<script>
import BtnProgresso from '~/components/elements/BtnProgresso'
import InputOptions from '~/components/elements/InputOptions'

export default {
  name: 'AuthCard',
  data () {
    return {
      alias: '',
      host: 'spurbanismo.sp.gov.br',
      hostOptions: [
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
      pass: ''
    }
  },
  computed: {
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
  components: {
    BtnProgresso,
    InputOptions
  },
  methods: {
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
    },
    checkInputPass () {
      console.log(this.pass)
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

.card__pass {
  height: 100vh;
  display: grid;
  grid-template-rows: 2fr 3fr;
  .auth {
    align-items: flex-start;
    margin-top: 0;
  }
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

.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  line-height: 2;
  &__action {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.04);
    padding: 0.2rem 0.7rem;
    transition: all ease-in-out 0.15s;
  }
  &__action:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
  @media (max-width: $phone) {
    font-size: small;
  }
}
</style>
