<template>
  <ul class="list-horizontal-nav">
    <li
      class="list-horizontal-nav__item"
      v-for="(link, index) in routes"
      :key="index"
    >
      <linha-horizontal
        :link="link"
        :index="index"
        :actionType="actionType"
        :step="step"
        :fetching="fetching"
        @setUpdate="getUpdated"
      />
    </li>
  </ul>
</template>

<script>
import LinhaHorizontal from '~/components/elements/LinhaHorizontal'
export default {
  name: 'List-horizontal-nav',
  components: {
    LinhaHorizontal
  },
  props: {
    routes: {
      type: Array,
      required: true
    },
    actionType: {
      validator: value => ['go', 'close'].includes(value)
    },
    fetching: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    step () {
      return this.$attrs['data-cy']
    }
  },
  methods: {
    getUpdated (data) {
      this.$emit('updateField', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-horizontal-nav {
  margin: 0;
  padding: 0;
  list-style: none;
  &__link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    opacity: 1;
    text-decoration: none;
    width: 100%;
    height: 55px;
    padding-left: 1rem;
    border: 0;
    transition: background-color 0.2s ease-in-out;
    .icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
      margin-left: 0.1rem;
    }
    &:hover {
      background-color: #00a896;
    }
    &.disabled:hover {
      background-color: unset;
    }
  }
  &__item:nth-child(odd) {
    background-color: #146057;
  }
}
</style>
