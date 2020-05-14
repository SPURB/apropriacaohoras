<template>
  <div class="slide">
    <section class="elements">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Slide'
}
</script>

<style lang="scss" scoped>
.slide {
  position: relative;
  transform: translate3d(0px, 0px, 0px) scale(1);
  min-height: 100%;
  width: 80%;
  overflow-x: auto;
  transform-origin: left top 0px;
  cursor: grab;

  &::-webkit-scrollbar {
    height: 7px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: $verde;
    border-radius: 5px;
  }

  .elements {
    grid-auto-flow: column;
    display: inline-grid;
    margin-top: 40px;
    padding-bottom: 20px;
    grid-gap: 30px;
    justify-content: space-around;
  }
}
</style>
