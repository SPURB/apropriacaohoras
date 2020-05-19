<template>
  <div class="slide" @click="scrollDiv" ref="slide">
    <section class="elements">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Slide',
  methods: {
    scrollDiv () {
      let slider = this.$refs.slide
      let isDown = false
      let startX
      let scrollLeft

      slider.addEventListener('mousedown', e => {
        isDown = true
        startX = e.pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft
      })

      slider.addEventListener('mouseup', () => {
        isDown = false
      })

      slider.addEventListener('mousemove', e => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = (x - startX) * 3
        slider.scrollLeft = scrollLeft - walk
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slide {
  cursor: grab;
  position: relative;
  padding: 5px;
  transform: translate3d(0px, 0px, 0px) scale(1);
  min-height: 100%;
  transform-origin: left top 0px;
  overflow: hidden;
  margin: 0 -50px;
  user-select: none;

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
