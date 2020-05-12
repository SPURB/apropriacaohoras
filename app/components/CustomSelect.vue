<template>
  <fieldset>
    <label>{{ title }}</label>
    <select
      @change="setValueOption({ title, value: optionValue })"
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
      required: true
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
    ...mapActions('form-registrar-horas', ['setValueOption'])
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/form-horas.scss';
.disabled-select {
  background-color: #8a8888 !important;
  cursor: no-drop !important;
}
</style>
