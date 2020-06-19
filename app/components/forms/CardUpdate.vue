<template>
  <div class="card-update">
    <form class="card-update__form">
      <label class="card-update__label" for="name">Título</label>
      <input
        class="card-update__input"
        name="titulo"
        type="text"
        v-model="inputTitulo"
      />
      <label class="card-update__label" for="name">Descrição</label>
      <input
        class="card-update__input"
        name="titulo"
        type="text"
        v-model="inputDescricao"
      />
      <div class="card-update__btn-group">
        <button data-cy="update__cancel" @click.prevent="cancel">
          Cancelar
        </button>
        <button
          class="salvar"
          :class="{ valid }"
          @click.prevent="set"
          :disabled="!valid"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CardUpdate',
  data () {
    return {
      inputTitulo: '',
      inputDescricao: ''
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    description: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    valid () {
      if (this.inputTitulo.length > 3 && this.inputDescricao.length > 3)
        return true
      return
    }
  },
  mounted () {
    this.setValues()
  },
  methods: {
    setValues () {
      this.inputTitulo = this.title
      this.inputDescricao = this.description
    },
    set () {
      this.$emit('updateCard', {
        id: this.id,
        nome: this.inputTitulo,
        descricao: this.inputDescricao
      })
    },
    cancel () {
      this.$emit('cancel', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-update {
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
      padding: 0.5rem 1rem 0.5rem 1rem;
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
