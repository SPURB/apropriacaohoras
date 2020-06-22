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
export default {
  name: 'InputCreate',
  data () {
    return {
      display: false,
      input: '',
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
    }
  },
  computed: {
    valid () {
      return this.input.length > 3
    }
  },
  methods: {
    set () {
      !this.addMetaDescription
        ? this.$emit('setValue', this.input)
        : this.$emit('setValue', { input: this.input, meta: this.meta })
      this.input = ''
      this.meta = ''
    },
    cancel () {
      this.input = ''
      this.meta = ''
      this.display = false
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
