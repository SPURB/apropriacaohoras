<template>
  <fieldset>
    <label for="projeto-atividade">{{ buildSelect.title }}</label>
        <select>
            <option value="" selected disabled>
                Selecione uma opção
            </option>
            <option
                :key="item.name+index"
                v-for="(item, index) in buildSelect.values"
                :value="item.value"
            >
            {{ item.name }}
            </option>
        </select>
    </fieldset>
</template>

<script>
export default {
    name: 'CustomSelect',
    props: {
        buildSelect: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/form-horas.scss';
</style>