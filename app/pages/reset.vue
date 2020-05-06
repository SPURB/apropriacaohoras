<template>
  <div class="reset-password">
    <box-email
      :email="email"
      :titulo="`DEFINA UMA SENHA PARA`"
    />
    <section class="card__password">
      <form class="form__password" @submit.prevent="">
        <p class="reset__password">
          <label for="reset__password">DEFINA UMA SENHA</label>
            <input
              type="password"
              name="reset__password"
              autofocus
           />
        </p>
        <p class="reset__password">
          <label for="reset__password">CONFIRME SUA SENHA</label>
            <input
              type="password"
              name="reset__password"
              autofocus
           />
        </p>
        <btn-progresso class="btn__reset" />
      </form>
    </section>
  </div>
</template>

<script>
import BoxEmail from '~/components/elements/BoxEmail'
import BtnProgresso from '~/components/elements/BtnProgresso'
import AppFooter from '~/components/AppFooter'

export default {
  name: 'Resetar',
  components: {
    BoxEmail,
    BtnProgresso,
    AppFooter
  },
  computed: {
    email () {
      return this.$route.query.email
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
        min-width: 450px;
      }

      label {
        margin-bottom: 0.25rem;
      }
  }
}
}
</style>
