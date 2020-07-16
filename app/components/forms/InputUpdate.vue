<template>
  <div class="botao__editar">
    <form class="input-update__form" v-if="display">
      <div class="row">
        <div class="column">
          <label class="input-update__label" for="nome">{{
            description
          }}</label>
          <input
            class="input-update__input"
            name="nome"
            type="text"
            v-model="input"
            data-cy="input__update"
          />
        </div>
        <div v-if="noStep" class="column gutter"></div>
        <div v-if="noStep" class="column">
          <label v-if="noStep" class="input-update__label" for="nprodam"
            >NPRODAM</label
          >
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
      </div>
      <div class="row" v-if="checkAndEmail">
        <div class="column input-update__email">
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
            <span class="input-update__arroba">@</span>
            <input-options
              class="input-update__options"
              :type="true"
              :options="hostOptions"
              @setOptionValue="setOptionValue"
            />
          </div>
        </div>
      </div>
      <div class="input-update__btn-group">
        <btn-action
          data-cy="update__cancel"
          title="Cancelar"
          @action.prevent="cancel"
          danger
          compact
        />
        <btn-action
          data-cy="btn__update"
          title="Atualizar"
          @action.prevent="set"
          :disabled="!valid"
          :loading="fetching"
          loadingMessage="Atualizando"
          compact
        />
      </div>
    </form>
  </div>
</template>

<script>
import InputOptions from '~/components/forms/InputOptions'
import BtnAction from '~/components/elements/BtnAction'

export default {
  name: 'InputUpdate',
  components: {
    InputOptions,
    BtnAction
  },
  data () {
    return {
      input: '',
      usuario: {
        email: '',
        arroba: '',
        nprodam: ''
      }
    }
  },
  props: {
    display: {
      type: Boolean,
      required: true
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
    },
    fetching: {
      type: Boolean,
      default: false
    },
    step: {
      type: String,
      default: ''
    },
    values: {
      type: Object,
      default: () => ({
        email: '',
        nprodam: ''
      })
    }
  },
  computed: {
    noStep () {
      return this.step === ''
    },
    valid () {
      if (this.noStep) {
        return (
          this.input.length > 3 &&
          this.usuario.nprodam.length > 3 &&
          this.usuario.email.length > 2
        )
      } else {
        return this.input.length > 3
      }
    },
    hostOptions () {
      return [
        {
          title: this.values.email.split('@')[1],
          value: this.values.email.split('@')[1]
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
      this.input = this.value

      if (this.checkAndEmail) {
        this.usuario.email = this.values.email.split('@')[0]
        this.usuario.arroba = '@' + this.values.email.split('@')[1]
        this.usuario.nprodam = this.values.nprodam
      }
    }
  },
  methods: {
    set () {
      if (this.checkAndEmail) {
        this.$emit('setUpdate', {
          nome: this.input,
          email: this.usuario.email + this.usuario.arroba,
          nprodam: this.usuario.nprodam
        })
      } else {
        this.$emit('setUpdate', this.input)
        this.input = ''
      }
    },
    cancel () {
      this.$emit('setUpdateCancel', true)
    },
    setOptionValue (param) {
      this.usuario.arroba = '@' + param
    }
  }
}
</script>

<style lang="scss" scoped>
.input-update {
  &__inputs {
    display: flex;
    align-items: center;
    @media (max-width: $tablet) {
      flex-direction: column;
      align-items: initial;
    }
  }

  &__form {
    background: #fff;
    display: flex;
    flex-direction: column;
    color: black;
    padding: 0.8rem 2rem;

    @media (max-width: $tablet) {
      padding: 0.8rem 1rem;
    }
  }
  &__email {
    max-width: 650px;
  }
  &__label {
    margin: 1rem 0 0.25rem;
    font-size: 1rem;
  }
  &__options {
    margin-top: 5px;
  }
  &__arroba {
    margin: 10px;
  }
  &__input {
    width: 100%;
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
    margin-bottom: 1rem;
    max-width: 180px;
    justify-content: space-between;
  }
}
</style>
