<template>
  <button class="btn-progresso" :disabled="disabled">
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="31" stroke="white" stroke-width="2" />
      <path d="M17 33H47.5" stroke="white" stroke-width="2"/>
      <path d="M34 20L47 33L34 46" stroke="white" stroke-width="2"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BtnProgresso',
  props: {
    disabled: {
      type: Boolean,
      default: false
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
  background: $verde-escuro;
  color: #fff;
  cursor: pointer;
  opacity: 1;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all 250ms ease-in-out;
  svg > circle { 
    fill: $verde-escuro;
    transition: fill 250ms ease-in-out, transform 150ms ease;
  }
  &:hover,
  &:focus {
    svg > circle {
      fill: $verde;
    }
  }
  &:disabled {
    cursor: unset;
    opacity: 0.6;
    svg > circle {
      fill: $verde-escuro;
    }
  }
}

</style>