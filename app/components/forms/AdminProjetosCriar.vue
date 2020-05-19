<template>
  <div class="admin-projetos-criar">
    <a class="admin-projetos-criar__switch-display" @click="display = !display"
      ><i class="icon icon-adicionar"></i>{{ title }}</a
    >
    <form class="admin-projetos-criar__form" v-if="display">
      <label class="admin-projetos-criar__label" for="name">{{
        description
      }}</label>
      <input
        class="admin-projetos-criar__input"
        name="name"
        type="text"
        v-model="input"
      />
      <div class="admin-projetos-criar__btn-group">
        <button @click.prevent="cancel">Cancelar</button>
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
  name: 'AdminProjetosCriar',
  data () {
    return {
      display: false,
      input: ''
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
    }
  },
  computed: {
    valid () {
      return this.input.length > 3
    }
  },
  methods: {
    set () {
      this.$emit('setValue', this.input)
      this.input = ''
    },
    cancel () {
      this.input = ''
      this.display = false
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-projetos-criar {
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
