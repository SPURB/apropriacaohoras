<template>
  <button
    class="btn-action"
    :class="{
      'btn-action--danger': danger,
      'btn-action--compact': compact,
      'btn-action--loading': loading
    }"
    :disabled="reallyDisabled"
    @click="action"
    data-cy="btn-action"
  >
    <template v-if="loading">{{ loadingMessage }}</template>
    <template v-else>{{ title }}</template>
  </button>
</template>
<script>
/*
  exemplos de uso (no pai)
  <btn-action title="default" @action="anyMethod"/>
  <btn-action title="Cancelar" @action="anyMethod" danger />
  <btn-action title="Compacto" @action="anyMethod" compact />
  <btn-action title="Fetching" @action="anyMethod" :loading="someComputed"/>
  <btn-action title="Desabilitado" @action="anyMethod('aoa')" :disabled="someComputed" />
*/
export default {
  name: 'BtnAction',
  computed: {
    reallyDisabled () {
      return this.loading || this.disabled
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    danger: {
      type: Boolean,
      default: false
    },
    compact: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingMessage: {
      type: String,
      default: 'Carregando'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    action (event) {
      this.$emit('action', event)
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-action {
  border: 2px solid rgba(255, 255, 255, 0.24);
  background-color: $verde;
  font-size: 1rem;
  font-family: $grot;
  border-radius: 2rem;
  color: #fff;
  padding: 1rem 1.62rem;
  margin: 2rem 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.48);
  transition: all ease-in 0.2s;
  &--danger {
    background-color: $vermelho;
  }
  &--compact {
    padding: 0.62rem;
    font-size: small;
  }
  &--loading {
    animation: pulse 1s infinite alternate;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.24);
  }
  &--loading,
  &[disabled] {
    background-color: $cinza1;
  }
  &[disabled]:hover {
    cursor: not-allowed;
  }
  &--loading[disabled]:hover {
    cursor: wait;
  }
}
@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.9;
  }
}
</style>
