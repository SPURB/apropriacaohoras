<template>
  <fieldset>
    <label>{{ title }}</label>
    <select
      @change="setValues({ title, value: optionValue })"
      v-model="optionValue"
      :id="idInput"
      :disabled="disabled"
      :class="disabledClass"
    >
      <option value="0" selected disabled>
        Selecione uma opção
      </option>
      <option
        :key="item.nome + index"
        v-for="(item, index) in values"
        :value="item.id"
      >
        {{ item.nome }}
      </option>
    </select>
  </fieldset>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CustomSelect',
  props: {
    title: {
      type: String,
      required: true
    },
    idInput: {
      type: String,
      default: '',
      required: false
    },
    values: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      optionValue: 0
    }
  },
  computed: {
    disabledClass () {
      if (this.disabled) return 'disabled-select'
    },
    ...mapGetters('form-registrar-horas', ['isReset'])
  },
  watch: {
    isReset (val) {
      if (!val) {
        this.optionValue = 0
      } else {
        this.optionValue = 0
      }
    }
  },
  methods: {
    ...mapActions('form-registrar-horas', ['setValueOption']),
    setValues (param) {
      this.$emit('valueOption', param.value)
      this.setValueOption(param)
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  padding: 0;
  border: 0;

  label {
    display: block;
    @include color-white-alpha(0.4);
    font-size: 0.75rem;
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  select {
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: 1.5rem;
    @include bg-white-alpha(0.08);
    width: 100%;
    padding: 0 0.75rem;
    height: 3rem;
    border-radius: 1.5rem;
    option {
      color: $preto;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
.disabled-select {
  background-color: #8a8888 !important;
  cursor: no-drop !important;
}
</style>
