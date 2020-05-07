<template>
  <div class="input-busca">
    <div class="input-busca__input">
      <input
        type="search"
        @keydown="search(list, options)"
        v-model="input"
        :placeholder="placeholder"
      />
      <i class="icon icon-buscar" />
    </div>
    <ul class="input-busca__cards">
      <li
        class="card"
        v-for="(listItem, index) in displayededList"
        :key="index"
      >
        <div class="card__info">
          <user-profile-placeholder :opacity="1" :width="'60px'" />
          <span class="card__label">{{ listItem.nome }}</span>
        </div>
        <input
          :id="`lista--${listItem.id}`"
          :value="listItem.id"
          type="checkbox"
          class="card__checkbox"
          :disabled="checkboxesDisabled"
          @click="setlistItem(listItem.id)"
          v-model="checked"
        />
        <label :for="`lista--${listItem.id}`"
          ><i class="icon icon-correto"
        /></label>
      </li>
    </ul>
  </div>
</template>
<script>
import Fuse from 'fuse.js'
import UserProfilePlaceholder from '~/components/elements/UserProfilePlaceholder'

export default {
  name: 'InputBusca',
  data () {
    return {
      input: '',
      filteredList: [],
      checked: []
    }
  },
  components: {
    UserProfilePlaceholder
  },
  props: {
    list: {
      type: Array,
      default: []
    },
    options: {
      // check https://fusejs.io/api/options.html#basic-options
      type: Object,
      true: true
    },
    placeholder: {
      type: String,
      default: 'Procure'
    },
    checkboxesDisabled: {
      type: Boolean,
      default: false
    },
    checks: {
      type: Array,
      default: []
    }
  },
  computed: {
    displayededList () {
      if (this.filteredList.length) {
        return this.filteredList
      } else {
        return this.list
      }
    }
  },
  watch: {
    checks (val) {
      this.checked = val
    }
  },
  mounted () {
    this.input = ''
  },
  methods: {
    search (list, options) {
      const fuse = new Fuse(list, options)

      const result = fuse.search(this.input)
      this.filteredList = result
    },
    setlistItem (id) {
      const checked = this.checked.includes(id)
      this.$emit('setCheckedItem', { id, checked: !checked })
    }
  }
}
</script>
<style lang="scss" scoped>
.input-busca {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  &__cards {
    margin: 0;
    padding: 1.5rem;
    background: #33756d;
    border-end-end-radius: 1rem;
    border-end-start-radius: 1rem;
  }
  &__input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #003e38;
    border-top-left-radius: 16px;
    input {
      outline: none;
      font-family: $grot;
      flex-grow: 1;
      font-size: 1rem;
      padding: 0.75rem;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.1);
      border-top-left-radius: 16px;
      border: 0;
    }
    i {
      font-size: 32px;
      margin: 0 0.25rem;
      opacity: 0.7;
      transition: all ease-in-out 0.25s;
    }
    &:hover,
    &:active,
    &:focus {
      i {
        opacity: 1;
        font-size: 36px;
      }
    }
  }
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  opacity: 1;
  color: $preto;
  min-height: 92px;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 46px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.48);
  &__info {
    display: flex;
    align-items: center;
  }
  &__label {
    margin-left: 1rem;
  }
  &__checkbox,
  &__checkbox:checked {
    visibility: hidden;
  }
  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    font-size: 18px;
    height: 24px;
    width: 24px;
    margin-right: 1rem;
    border: solid 2px #808080;
    border-radius: 4px;
    color: #fff;
    transition: all ease-in-out 0.1s;
  }
  &__checkbox:checked + label {
    background: $verde;
    border-color: #3fa196;
  }
  label:hover {
    background: #bae3df;
    border-color: #759f9b;
  }
}
</style>
