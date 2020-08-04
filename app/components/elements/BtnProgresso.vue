<template>
  <button
    class="btn-progresso"
    :disabled="disabled"
    @click="btnPrograssoAction"
    @mouseenter="toggleMouseEnter(true)"
    @mouseleave="toggleMouseEnter(false)"
    :style="`background: ${background}`"
  >
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle
        cx="32"
        cy="32"
        r="31"
        :stroke="stroke"
        stroke-width="2"
        :fill="background"
      />
      <path d="M17 33H47.5" :stroke="stroke" stroke-width="2" />
      <path d="M34 20L47 33L34 46" :stroke="stroke" stroke-width="2" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BtnProgresso',
  data () {
    return {
      mouseEntered: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: '#005249'
    },
    stroke: {
      type: String,
      default: 'white'
    }
  },
  methods: {
    btnPrograssoAction (e) {
      this.$emit('btnPrograssoAction', e)
    },
    toggleMouseEnter (state) {
      this.mouseEntered = state
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  border: none;
  padding: 0.5rem;
  margin: 4px 0 0 0.5rem;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  opacity: 1;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all 250ms ease-in-out;
  svg > circle {
    transition: fill 250ms ease-in-out, transform 150ms ease;
  }
  &:hover,
  &:focus {
    svg > circle {
      // opacity: 1;
      fill: $verde;
    }
  }
  &:disabled {
    cursor: unset;
    opacity: 0.6;
    svg > circle {
      // opacity: 1;
      // fill: $verde-escuro;
    }
  }
}
</style>
