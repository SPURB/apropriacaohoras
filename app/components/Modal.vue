<template>
  <div class="modal" @click="toggle">
    <div class="modal__container" :class="{ error }">
      <erro-icon v-if="error" style="max-width: 115px; margin: auto" />
      <sucesso-icon v-else style="max-width: 115px; margin: auto" />
      <h3 class="modal__title">{{ title }}</h3>
      <p v-if="description !== ''" class="modal__description">
        {{ description }}
      </p>
      <ul v-if="descriptionList.length" class="modal__list" :class="{ error }">
        <li :key="index" v-for="(item, index) in descriptionList">
          <i class="icon icon-incorreto"></i>
          {{ item }}
        </li>
      </ul>
      <p v-if="actionDescription !== ''" class="modal__description">
        {{ actionDescription }}
      </p>

      <div class="modal__action" v-if="actionText !== ''">
        <svg
          v-if="error"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8.00013 15.4667L9.31613 14.1507L4.10813 8.93334L15.4668 8.93333L15.4668 7.06667L4.10813 7.06667L9.31613 1.84933L8.00013 0.533326L0.533462 8L8.00013 15.4667Z"
            fill="#EB5757"
          />
        </svg>
        <button class="modal__description" :class="{ error }">
          {{ actionText }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ErroIcon from '~/components/elements/Erro'
import SucessoIcon from '~/components/elements/Sucesso'

export default {
  name: 'Modal',
  components: { ErroIcon, SucessoIcon },
  props: {
    title: {
      type: String,
      required: true
    },
    error: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      default: ''
    },
    descriptionList: {
      type: Array,
      default: () => []
    },
    actionDescription: {
      type: String,
      default: ''
    },
    actionText: {
      type: String,
      default: 'Tentar novamente'
    }
  },
  methods: {
    toggle () {
      this.$emit('setModalAction')
    }
  },
  created () {
    document.body.style.overflow = 'hidden'
  },
  beforeDestroy () {
    document.body.style.overflow = 'auto'
  }
}
</script>
<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: auto;
  z-index: 9;
  &__container {
    color: $preto;
    background: #fff;
    max-width: 394px;
    padding: 0 4rem 2.5rem;
    display: flex;
    flex-direction: column;
    margin: 15vh auto auto;
    text-align: center;
    border-radius: 10px;
    border-top: 20px solid $verde;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.48);
    &.error {
      border-color: $vermelho;
    }
    &:hover {
      cursor: pointer;
    }
  }
  &__title {
    margin: 0;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: normal;
    color: $preto;
  }
  &__description,
  &__action {
    width: 100%;
  }
  &__description {
    font-size: small;
  }
  &__list {
    font-size: small;
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;
    i {
      color: $vermelho;
    }
  }
  &__action {
    margin: 1rem 0 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid $cinza1;
    transition: ease-in-out 0.15s all;
    button {
      font-size: 0.85rem;
      cursor: pointer;
      font-family: inherit;
      border: 0;
      background: transparent;
      font-weight: normal;
    }
    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    }
    &.error {
      color: $vermelho;
    }
  }
}
</style>
