<template>
  <div class="botao__editar">
    <form class="input-update__form" v-if="show">
      <label class="input-update__label" for="nome">{{ description }}</label>
      <input
        class="input-update__input"
        name="nome"
        type="text"
        v-model="input"
        data-cy="input__update"
      />
      <template v-if="checkAndEmail">
        <section class="input-update__group">
          <div class="input-update__usuario">
            <label class="input-update__label" for="nprodam">NPRODAM</label>
            <div class="input-update__inputs">
              <input
                class="input-update__input input-update__text-input"
                name="nprodam"
                type="text"
                data-cy="input__nprodam"
                v-model="usuario.nprodam"
              />
            </div>
          </div>

          <div class="input-update__usuario">
            <label class="input-update__label" for="email">Email</label>
            <div class="input-update__inputs">
              <input
                class="input-update__input input-update__text-input"
                name="email"
                type="text"
                style="width: 100%"
                data-cy="input__email"
                v-model="usuario.email"
              />
              <span style="margin-right: 0.3rem">@</span>
              <input-options
                :type="true"
                :options="hostOptions"
                @setOptionValue="setOptionValue"
              />
            </div>
          </div>
        </section>
      </template>
      <div class="input-update__btn-group">
        <button data-cy="update__cancel" @click.prevent="cancel">
          Cancelar
        </button>
        <button
          class="salvar"
          @click.prevent="set"
          :disabled="!valid"
          data-cy="btn__update"
        >
          Atualizar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import InputOptions from '~/components/forms/InputOptions'
export default {
  name: 'InputUpdate',
  components: {
    InputOptions
  },
  data () {
    return {
      input: '',
      usuario: {
        email: '',
        arroba: '@spurbanismo.sp.gov.br',
        nprodam: ''
      },
      show: false
    }
  },
  props: {
    display: {
      type: Boolean,
      required: true,
      default: false
    },
    description: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    checkAndEmail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    valid () {
      return this.input.length > 3
    },
    hostOptions () {
      return [
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
      ]
    }
  },
  watch: {
    display (val) {
      this.show = val
      this.input = this.value
    }
  },
  methods: {
    set () {
      this.$emit('setUpdate', this.input)
      this.input = ''
    },
    cancel () {
      this.show = false
    },
    setOptionValue (param) {
      this.usuario.arroba = '@' + param
    }
  }
}
</script>

<style lang="scss" scoped>
.botao__editar {
  width: 100%;
  height: 100%;
}

.input-update {
  &__group {
    display: flex;
    @media (max-width: $tablet) {
      flex-direction: column;
    }
  }

  &__usuario {
    margin-top: 1rem;
    width: 100%;

    @media (max-width: $tablet) {
      flex-direction: column;
    }
  }

  &__inputs {
    display: flex;
    align-items: center;

    @media (max-width: $tablet) {
      flex-direction: column;
      align-items: initial;
    }
  }

  &__text-input {
    margin-top: 0.7rem;
    width: 100%;
    margin-right: 0.5rem;
  }

  &__form {
    background: #fff;
    display: flex;
    flex-direction: column;
    color: black;
    padding: 0.8rem 2.4rem;

    @media (max-width: $tablet) {
      padding: 0.8rem 1rem;
    }
  }
  &__label {
    margin: 1rem 0;
    font-size: 1rem;
  }
  &__input {
    font-size: 1rem;
    height: 3rem;
    border-radius: 4px;
    padding: 1rem;
    border: 0;
    background: rgba(0, 0, 0, 0.08);
    font-family: $grot;
    transition: ease-in-out 0.25s all;
    &:active,
    &:focus {
      background: rgba(0, 0, 0, 0.04);
      height: 3.2rem;
    }
  }
  &__btn-group {
    display: flex;
    margin: 2rem 0;
    button {
      border: 0;
      padding: 1rem;
      margin-right: 2rem;
      border-radius: 30px;
      font-size: 1rem;
      font-family: $grot;
      font-weight: 700;
      color: #fff;
      background-color: $vermelho;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
      border: 2px solid rgba(255, 255, 255, 0.24);
      transition: ease-in-out 0.25s all;
      &.salvar {
        background-color: $verde;
        &:disabled {
          cursor: not-allowed;
          background-color: $cinza1;
          opacity: 0.45;
        }
      }
      &:hover {
        cursor: pointer;
        box-shadow: 1px 5px 9px rgba(0, 0, 0, 0.36);
      }
    }
  }
}
</style>
