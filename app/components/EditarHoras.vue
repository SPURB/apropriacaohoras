<template>
  <div class="editar-horas">
    <div class="editar-horas__above">
      <custom-select
        data-cy="select__projeto"
        :title="'Projetos'"
        :idInput="'projetos'"
        :values="projetos"
      />
    </div>
  </div>
</template>

<script>
import CustomSelect from '~/components/CustomSelect'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'EditarHoras',
  data () {
    return {
      subatividades: {}
    }
  },
  computed: {
    ...mapState('form-registrar-horas', {      
      dataSelects: state => state.dataSelects
    }),
    ...mapGetters('form-registrar-horas', ['projetos']),
    fases () {
      return  this.dataSelects.find(select => select.title === 'Fases')
    }
  }  
}
</script>

<style lang="scss" scoped>
.editar-horas {
  display: flex;
  width: 100%;
}
</style>