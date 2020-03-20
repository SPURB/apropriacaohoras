<template>
  <div id="index" @click="frameClick($event)">
    <Header @toggle-menu="toggleUserMenu" :userMenuState="userMenuState" :fullHeaderFromParent="false"></Header>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Index',
  components: {
    Header
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
      if (this.userMenuEl === undefined) { this.userMenuEl = elementFromChild }
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
