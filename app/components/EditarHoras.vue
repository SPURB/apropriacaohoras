<template>
  <div class="editar-horas">
    <form class="editar-horas__main">
      <div class="editar-horas__left">
        <section class="editar-horas__above">
          <custom-select
            :title="'Projetos'"
            :values="projetos"
            @valueOption="setProjeto"
            ref="projetos"
          />

          <time-input
            @timeInput="setHoras"
            :valueInit="registro.horas"
            :min="1"
            :max="8"
            :titulo="'Horas'"
          />
          <time-input
            @timeInput="setExtras"
            :disabled="disabled"
            :valueInit="registro.extras"
            :min="0"
            :max="4"
            :titulo="'Extras'"
          />
        </section>

        <section class="editar-horas__below">
          <custom-select
            :title="fases.title"
            :values="fases.values"
            @valueOption="setFase"
            ref="fases"
          />
          <custom-select
            v-if="fases"
            :title="subatividades.title"
            :values="subatividades.values"
            @valueOption="setSubatividade"
            ref="subatividades"
          />
        </section>
      </div>

      <div class="editar-horas__right">
        <button
          type="button"
          class="editar-horas__deletar"
          @click.prevent="handleDelete"
        >
          Deletar
        </button>
        <button
          type="button"
          :disabled="!valid"
          :class="disabledButton"
          class="editar-horas__salvar"
          @click.prevent="handleUpdate"
        >
          Salvar alterações
        </button>
        <div class="editar-horas__popover" v-if="!isValid.disabled">
          {{ isValid.message }}
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CustomSelect from '~/components/CustomSelect'
import TimeInput from '~/components/forms/TimeInput'
import Horas from '~/services/api-horas'
import Subatividades from '~/services/api-subatividade'

import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'EditarHoras',
  data () {
    return {
      subatividades: {
        title: '',
        values: []
      }
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
    ...mapState('form-registrar-horas', ['dataSelects']),
    ...mapState('usuario', ['token']),
    ...mapGetters('form-registrar-horas', ['projetos']),
    ...mapGetters('editar', ['isValid', 'disabled']),
    idregistro () {
      return this.registro.id
    },
    fases () {
      return this.dataSelects.find(select => select.title === 'Fases')
    },
    horas () {
      return {
        horas: this.registro.horas,
        extras: this.registro.extras,
        projeto: this.registro.projeto,
        fase: this.registro.fase,
        subatividade: this.registro.subatividade
      }
    },
    valid () {
      if (this.horas.subatividade == 0) return false
      if (this.horas.subatividade > 0 && this.isValid.disabled) return true
    },
    disabledButton () {
      if (this.horas.subatividade == 0) return 'disabled'
      if (this.horas.subatividade != 0 && !this.isValid.disabled) return 'disabled'
      return ''
    }
  },
  async mounted () {
    this.selectField('projetos', this.registro.projeto)
    this.selectField('fases', this.registro.fase)
    await this.getSubatividades(this.registro.fase)
    this.selectField('subatividades', this.registro.subatividade)
  },
  methods: {
    ...mapActions('editar', ['stateArrayOf']),
    async handleUpdate () {
      await Horas.put(this.idregistro, this.horas, this.token)
        .then(res => {
          this.$emit('status', {
            title: 'Sucesso!',
            description: 'Horas atualizadas',
            actionText: 'Voltar',
            error: false
          })
        })
        .catch(err => {
          this.$emit('status', {
            title: 'Erro!',
            description: 'Ocorreu algum erro.',
            actionText: 'Tente novamente',
            error: true
          })
        })
    },
    async handleDelete () {
      await Horas.delete(this.idregistro, this.token)
        .then(res => {
          this.$emit('status', {
            title: 'Sucesso!',
            description: 'Horas removidas',
            actionText: 'Voltar',
            error: false
          })
        })
        .catch(err => {
          this.$emit('status', {
            title: 'Erro!',
            description: 'Ocorreu algum erro.',
            actionText: 'Tente novamente',
            error: true
          })
        })
    },
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
    setHoras (horas) {
      this.stateArrayOf({
        key: 'horas',
        index: this.index,
        data: horas
      })
    },
    setExtras (extras) {
      this.stateArrayOf({
        key: 'extras',
        index: this.index,
        data: extras
      })
    },
    setProjeto (projeto) {
      this.stateArrayOf({
        key: 'projeto',
        index: this.index,
        data: projeto
      })
    },
    setFase (fase) {
      this.stateArrayOf({
        key: 'fase',
        index: this.index,
        data: fase
      })
      this.horas.subatividade = 0
      this.getSubatividades(fase)
    },
    setSubatividade (subatividade) {
      this.stateArrayOf({
        key: 'subatividade',
        index: this.index,
        data: subatividade
      })
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
    width: 100%;
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

  &__left {
    width: 70%;
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
      width: 50%;

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

    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover ~ .editar-horas__popover {
      transition: ease-in-out;
      display: block;
    }
  }

  &__popover {
    background-color: #fff;
    border: 1px solid red;
    border-radius: 3px;
    display: none;
    color: #000;
    margin-top: 55px;
    margin-left: 50px;
    width: 11%;
    font-size: 10pt;
    position: absolute;
    padding: 5px;
  }

  @media (max-width: $tablet) {
    &__main {
      flex-direction: column;
    }
    &__above,
    &__below {
      flex-direction: column;
    }
    &__below fieldset {
      width: 100% !important;
    }

    &__left {
      width: 100%;
    }
    &__right {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>
