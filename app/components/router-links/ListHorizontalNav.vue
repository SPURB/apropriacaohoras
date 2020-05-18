<template>
  <ul class="list-horizontal-nav">
    <li
      class="list-horizontal-nav__item"
      v-for="(link, index) in routes"
      :key="index"
    >
      <router-link tag="a" :to="link.to">{{ link.title }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List-horizontal-nav',
  props: {
    routes: {
      type: Array,
      required: true
    },
    actionType: {
      validator: value => ['go', 'close'].includes(value)
    }
  }
}
</script>
<style lang="scss" scoped></style>
