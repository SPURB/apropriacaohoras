<template>
  <div class="botao__editar">
    <form class="input-create__form" v-if="display">
      <label class="input-create__label" for="name">{{ description }}</label>
      <input
        class="input-create__input"
        name="name"
        type="text"
        v-model="input"
        :placeholder="value"
        data-cy="input__create"
      />
      <div class="input-create__btn-group">
        <button data-cy="btn__cancel">Cancelar</button>
          <button class="salvar" data-cy="btn__create">
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'InputUpdate',
  data () {
    return {
      input: ''
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
    }
  },
  methods: {
    set () {
      this.$emit('setUpdate', this.input)
      this.input = ''
    },
    cancel () {
      this.input = ''
      this.display = false
    }
  },
}
</script>

<style lang="scss" scoped>
.botao__editar {
  width: 100%;
  height: 100%;
}
.input-create {
  &__form {
    background: #fff;
    display: flex;
    flex-direction: column;
    color: black;
    padding: 0.8rem 2.4rem;
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