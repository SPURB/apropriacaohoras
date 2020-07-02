<template>
  <div class="input-create">
    <a
      class="input-create__switch-display"
      @click="display = !display"
      data-cy="open__create"
      ><i class="icon icon-adicionar"></i>{{ title }}</a
    >
    <form class="input-create__form" v-if="display">
      <label class="input-create__label" for="name">{{ description }}</label>
      <input
        class="input-create__input"
        name="name"
        type="text"
        v-model="input"
        data-cy="input__create"
      />
      <template v-if="addMetaDescription">
        <label class="input-create__label" for="meta">{{
          metaDescriptioinLabel
        }}</label>
        <input
          class="input-create__input"
          name="meta"
          type="text"
          data-cy="input__meta"
          v-model="meta"
        />
      </template>
      <template v-if="checkAndEmail">
        <label class="input-create__label" for="email">Email</label>
        <section class="input-create__usuario">
          <input
            class="input-create__input"
            name="email"
            type="text"
            data-cy="input__meta"
            v-model="usuario.email"
          />
          <span>@</span>
          <input-options
            style="margin-top:1rem"
            :type="true"
            :options="hostOptions"
            @setOptionValue="setOptionValue"
          />
        </section>
        <label class="input-create__label" for="nprodam">NPRODAM</label>
        <input
          class="input-create__input"
          name="nprodam"
          type="text"
          data-cy="input__meta"
          v-model="usuario.nprodam"
        />
        <section class="input-create__usuario not__between">
          <input
            class="input-create__checkbox"
            type="checkbox"
            name="admin"
            @click="usuario.admin = !usuario.admin"
            v-model="usuario.admin"
          />
          <label class="input-create__label" for="admin">Administrador</label>
        </section>
      </template>
      <div class="input-create__btn-group">
        <button @click.prevent="cancel" data-cy="btn__cancel">Cancelar</button>
        <button
          class="salvar"
          :class="{ valid }"
          @click.prevent="set"
          :disabled="!valid"
          data-cy="btn__create"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import InputOptions from '~/components/forms/InputOptions'
export default {
  name: 'InputCreate',
  components: { InputOptions },
  data () {
    return {
      display: false,
      input: '',
      usuario: {
        email: '',
        arroba: '@spurbanismo.sp.gov.br',
        nprodam: '',
        admin: false
      },
      meta: ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    addMetaDescription: {
      type: Boolean,
      default: false
    },
    metaDescriptioinLabel: {
      type: String,
      default: ''
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
  methods: {
    set () {
      if (this.addMetaDescription) {
        this.$emit('setValue', { input: this.input, meta: this.meta })
      } else if (this.checkAndEmail) {
        this.$emit('setValue', {
          nome: this.input,
          email: this.usuario.email + this.usuario.arroba,
          nprodam: this.usuario.nprodam,
          admin: this.usuario.admin
        })
      } else {
        this.$emit('setValue', this.input)
      }

      this.display = false
      this.input = ''
      this.meta = ''
      this.usuario.email = ''
      this.usuario.arroba = '@spurbanismo.sp.gov.br'
      this.usuario.nprodam = ''
      this.usuario.admin = ''
    },
    cancel () {
      this.input = ''
      this.meta = ''
      this.display = false
    },
    setOptionValue (param) {
      this.usuario.arroba = '@' + param
    }
  }
}
</script>
<style lang="scss" scoped>
.input-create {
  &__switch-display {
    background-color: $verde;
    width: 100%;
    height: 113px;
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

  &__usuario {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &.not__between {
      justify-content: inherit;
    }
  }

  &__checkbox {
    cursor: pointer;
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
