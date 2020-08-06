<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    :style="`background:${background}`"
  >
    <rect :width="baseRatio" :height="height" :fill="baseFill" />
    <rect :width="currentRatio" :height="height" :fill="currentFill" />
  </svg>
</template>
<script>
export default {
  name: 'GrafBar',
  props: {
    base: {
      type: Number,
      default: 1
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    baseFill: {
      type: String,
      default: '#DFDFDF'
    },
    currentFill: {
      type: String,
      default: '#434343'
    },
    height: {
      type: Number,
      default: 23
    },
    width: {
      type: Number,
      default: 252
    },
    background: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    baseRatio () {
      return (this.width * this.base) / this.total
    },
    currentRatio () {
      return (this.width * this.current) / this.total
    }
  }
}
</script>
