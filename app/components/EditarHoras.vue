<template>
  <div class="editar-horas">
    <div class="editar-horas__main">
      <div class="editar-horas__left">
        <section class="editar-horas__above">
          <custom-select
            :title="'Projetos'"
            :values="projetos"
            ref="projetos"
          />

          <time-input
            @timeInput="getHoras"
            :valueInit="registro.horas"
            :titulo="'Horas'"
          />
          <time-input
            @timeInput="getHorasExtras"
            :valueInit="registro.extras"
            :titulo="'Extras'"
          />
        </section>

        <section class="editar-horas__below">
          <custom-select
            :title="fases.title"
            :values="fases.values"
            ref="fases"
          />
          <custom-select
            v-if="fases"
            :title="subatividades.title"
            :values="subatividades.values"
            ref="subatividades"
          />
        </section>
      </div>

      <div class="editar-horas__right">
        <button type="button" class="editar-horas__deletar">
          Deletar
        </button>
        <button type="button" class="editar-horas__salvar">
          Salvar alterações
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from '~/components/CustomSelect'
import TimeInput from '~/components/forms/TimeInput'
import Subatividades from '~/services/api-subatividade'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'EditarHoras',
  data () {
    return {
      subatividades: {}
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    registro: {
      type: Object,
      required: true
    }
  },
  components: {
    CustomSelect,
    TimeInput
  },
  computed: {
    ...mapState('form-registrar-horas', {
      dataSelects: state => state.dataSelects
    }),
    ...mapGetters('form-registrar-horas', ['projetos']),
    fases () {
      return this.dataSelects.find(select => select.title === 'Fases')
    }
  },
  async mounted () {
    this.selectField('projetos', this.registro.projeto)
    this.selectField('fases', this.registro.fase)
    await this.getSubatividades(this.registro.fase)
    this.selectField('subatividades', this.registro.subatividade)
  },
  methods: {
    selectField (param, val) {
      let select = this.$refs[param].$el.children[1]
      for (const i in select.options) {
        const option = select.options[i]
        if (option.value == val) option.selected = true
      }
    },
    async getSubatividades (fase) {
      await Subatividades.get(fase).then(res => {
        this.subatividades = res.data
      })
    },
    getHoras (horas) {
      console.log(horas)
    },
    getHorasExtras (extras) {
      console.log(extras)
    }
  }
}
</script>

<style lang="scss" scoped>
.editar-horas {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__main {
    display: flex;
    widows: 100%;
  }

  &::after {
    background-color: $verde;
    content: '';
    display: block;
    margin-top: 30px;
    margin-bottom: 15px;
    height: 5px;
    width: 100%;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
  }

  &__above,
  &__below {
    display: flex;
    justify-content: space-between;
  }

  &__below {
    margin-top: 15px;

    fieldset {
      &:first-child {
        margin-right: 8px;
      }
    }
  }

  &__deletar,
  &__salvar {
    border-radius: 50px;
    border: 2px solid rgba(255, 255, 255, 0.24);
    color: #fff;
    cursor: pointer;
    font-size: 12pt;
    margin: 10px;
    padding: 12px;

    &:hover {
      opacity: 0.8;
    }
  }

  &__deletar {
    background-color: $vermelho;
  }

  &__salvar {
    background-color: $verde;
  }
}
</style>
