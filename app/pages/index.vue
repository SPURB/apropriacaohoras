<template>
  <div id="index" @click="frameClick($event)">
    <app-header
      @toggle-menu="toggleUserMenu"
      :userMenuState="userMenuState"
      :fullHeaderFromParent="false"
    />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'

export default {
  name: 'Index',
  components: {
    AppHeader
  },
  data () {
    return {
      userMenuState: false,
      userMenuEl: undefined
    }
  },
  methods: {
    toggleUserMenu (elementFromChild) {
      this.userMenuState = !this.userMenuState
      if (this.userMenuEl === undefined) {
        this.userMenuEl = elementFromChild
      }
    },
    frameClick (event) {
      if (this.userMenuState && event.target.contains(this.userMenuEl)) {
        this.toggleUserMenu()
      }
    }
  }
}
</script>

<style lang="scss">
div#index {
  height: 100vh;
  z-index: 0;
}
</style>
