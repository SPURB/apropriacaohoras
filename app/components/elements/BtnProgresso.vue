<template>
  <button
    class="btn-progresso"
    :disabled="disabled"
    @click="btnPrograssoAction"
    @mouseenter="toggleMouseEnter(true)"
    @mouseleave="toggleMouseEnter(false)"
    :style="`background: ${background}`"
    data-cy="btn-progresso"
  >
    <span v-if="reactiveTooltip" class="btn-progresso__tootip">{{
      tooltip
    }}</span>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle
        cx="32"
        cy="32"
        r="31"
        :stroke="reactiveStroke"
        stroke-width="2"
        :fill="`${reactiveBackground}`"
      />
      <path d="M17 33H47.5" :stroke="reactiveStroke" stroke-width="2" />
      <path d="M34 20L47 33L34 46" :stroke="reactiveStroke" stroke-width="2" />
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
    onHoverBackground: {
      type: String,
      default: '#008375'
    },
    stroke: {
      type: String,
      default: 'white'
    },
    onHoverStroke: {
      type: String,
      default: 'white'
    },
    tooltip: {
      type: String,
      default: ''
    },
    displayTooltip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    reactiveBackground () {
      return !this.disabled && this.mouseEntered
        ? this.onHoverBackground
        : this.background
    },
    reactiveStroke () {
      return !this.disabled && this.mouseEntered
        ? this.onHoverStroke
        : this.stroke
    },
    reactiveTooltip () {
      return this.displayTooltip && this.mouseEntered
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
.btn-progresso {
  display: inline-block;
  border: none;
  padding: 0.5rem;
  margin: 4px 0 0 0.5rem;
  text-decoration: none;
  cursor: pointer;
  opacity: 1;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all 250ms ease-in-out;
  &__tootip {
    font-family: $grot;
    position: absolute;
    top: 49.2%;
    right: 81px;
  }
  svg > circle {
    transition: fill 250ms ease-in-out, transform 150ms ease;
  }
  &:disabled {
    cursor: unset;
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
}
</style>
