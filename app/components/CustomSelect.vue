<template>
  <fieldset>
    <label>{{ buildSelect.title }}</label>
    <select
      @change="setValueOption({ title: buildSelect.title, value: optionValue })"
      v-model="optionValue"
    >
      <option value="" selected disabled>
        Selecione uma opção
      </option>
      <option
        :key="item.nome + index"
        v-for="(item, index) in buildSelect.values"
        :value="item.id"
      >
        {{ item.nome }}
      </option>
    </select>
  </fieldset>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CustomSelect',
  props: {
    buildSelect: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      optionValue: ''
    }
  },
  methods: {
    ...mapActions('form-registrar-horas', ['setValueOption'])
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/form-horas.scss';
</style>
