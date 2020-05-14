<template>
  <div class="index__comum">
    <app-header />

    <div class="list__projetos">
      <Slide>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Slide>
    </div>

    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import Card from '~/components/elements/Card'
import Slide from '~/components/Slide'
export default {
  name: 'IndexComum',
  components: {
    AppHeader,
    AppFooter,
    Card,
    Slide
  }
}
</script>

<style lang="scss" scoped>
.index__comum {
  margin: 0;
  padding: 0;
  width: 100%;

  .panel__slide {
    position: relative;
    user-select: none;
    transform: translate3d(0px, 0px, 0px) scale(1);
    min-height: 100%;
    min-width: 100%;
    width: -webkit-fit-content;
    transform-origin: left top 0px;
    box-sizing: border-box;
  }

  .list__projetos {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
