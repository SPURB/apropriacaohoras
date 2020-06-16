<template>
  <div class="registrar">
    <modal
      v-if="modal.show"
      class="registrar__modal"
      :title="modal.title"
      :error="modal.error"
      :description="modal.description"
      :description-list="modal.descriptionList"
      :action-text="modal.actionText"
      @setModalAction="modal.show = !modal.show"
    />

    <h2>Registrar horas</h2>
    <main>
      <form @submit.prevent="postForm" id="form-registrar-horas">
        <calendario />

        <div class="formtop">
          <fieldset class="timeInput">
            <div class="main">
              <label for="horas">Número de horas</label>
              <div>
                <button
                  :disabled="horas.horas == 1"
                  data-cy="remove__hora"
                  type="button"
                  @click="toggleBar(false)"
                >
                  -
                </button>
                <input
                  id="horas"
                  :value="horas.horas + horas.extras"
                  data-cy="qtd__horas"
                  type="number"
                  min="0"
                  max="12"
                  ref="hours"
                />
                <button
                  :disabled="horas.horas + horas.extras == 12"
                  data-cy="inclui__hora"
                  type="button"
                  @click="toggleBar(true)"
                >
                  +
                </button>
              </div>
            </div>
            <aside>
              <label
                :style="
                  horas.horas + horas.extras <= 8
                    ? ''
                    : 'color: rgba(255, 255, 255, 0.1)'
                "
                >Restante do dia</label
              >
              <label
                :style="
                  horas.horas + horas.extras > 8
                    ? ''
                    : 'color: rgba(255, 255, 255, 0.1)'
                "
                >Horas extras</label
              >
              <div class="bar">
                <div
                  class="normal-hours"
                  v-if="horas.horas + horas.extras <= 8"
                >
                  <div
                    :key="`normal-${index}`"
                    class="count-hours"
                    v-for="index in horas.horas"
                  ></div>
                </div>
                <div class="extra-hours" v-else>
                  <div
                    :key="`extras-${index}`"
                    class="count-hours"
                    v-for="index in horas.extras"
                  ></div>
                </div>
              </div>
            </aside>
          </fieldset>

          <custom-select
            data-cy="select__projeto"
            :title="'Projetos'"
            :idInput="'projetos'"
            :values="projetos"
          />

          <custom-select
            v-if="fases.title"
            data-cy="select__fase"
            :idInput="'fases'"
            :title="fases.title"
            :values="fases.values"
          />

          <custom-select
            v-if="subatividades.title"
            data-cy="select__subatividade"
            :idInput="'subatividades'"
            :disabled="fase !== null ? false : true"
            :title="subatividades.title"
            :values="subatividades.values"
          />
        </div>

        <div class="list_horas">
          <h3
            class="list_horas__title"
            :class="{ 'list_horas__title--show': arrayHoras.length > 0 }"
          >
            Horas já registradas
          </h3>
          <transition-group name="list">
            <listar-horas
              :key="`${index}-lista`"
              v-for="(item, index) in arrayHoras"
              :registro="item"
            />
          </transition-group>
        </div>

        <div class="formbtm">
          <fieldset>
            <label for="descricao">Descrição (opcional)</label>
            <input id="descricao" v-model="descricao" type="text" />
          </fieldset>
        </div>

        <button type="submit" data-cy="registrar__horas" class="postBtn">
          Registrar horas
        </button>
      </form>
    </main>
  </div>
</template>

<script>
import Modal from '~/components/Modal'
import Calendario from '~/components/Calendario'
import CustomSelect from '~/components/CustomSelect'
import ListarHoras from '~/components/ListarHoras'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Horas from '@/services/api-horas'

export default {
  name: 'Registrar',
  layout: 'usuario',
  components: {
    Calendario,
    CustomSelect,
    ListarHoras,
    Modal
  },
  data () {
    return {
      fases: {},
      subatividades: {},
      modal: {
        show: false,
        title: '',
        error: true,
        errorAPI: false,
        description: '',
        descriptionList: [],
        actionText: ''
      },
      arrayHoras: []
    }
  },
  computed: {
    ...mapState('form-registrar-horas', {
      horas: state => state.horas,
      fase: state => state.horas.fase,
      dataSelects: state => state.dataSelects,
      validateForm: state => state.validateForm,
      multipleData: state => state.multipleData
    }),
    ...mapState('usuario', {
      idusuario: state => state.id,
      token: state => state.token
    }),
    ...mapGetters('form-registrar-horas', ['projetos', 'isReset']),
    descricao: {
      get () {
        return this.horas.descricao
      },
      set (text) {
        this.setDescricao(text)
      }
    }
  },
  watch: {
    dataSelects (selects) {
      if (selects.length) {
        this.fases = selects.find(select => select.title === 'Fases')
        this.subatividades = selects.find(
          select => select.title === 'Subatividades'
        )
      }
    },
    fase (newValue, oldValue) {
      this.addData()
    },
    multipleData (newValue, oldValue) {
      if (newValue.length > 0) {
        this.listarHoras(newValue)
      } else {
        this.arrayHoras = []
      }
    },
    idusuario (id) {
      if (id) {
        this.filterProjetos(this.idusuario)
        this.addData()
      }
    }
  },
  created () {
    this.addData()
    this.RESET_CALENDARIO()
  },
  methods: {
    ...mapActions('form-registrar-horas', [
      'addData',
      'toggleBar',
      'setDescricao',
      'RESET'
    ]),
    ...mapActions('usuario', ['filterProjetos']),
    ...mapMutations('form-registrar-horas', [
      'setValidationForm',
      'TOGGLE_CALENDARIO_STATUS',
      'RESET_CALENDARIO'
    ]),
    resetSelectBox (ref) {
      let select = document.querySelector(`#${ref}`)
      select.selectedIndex = 0
    },
    resetCalendario () {
      let calendario = document.querySelector('#tbody')

      calendario.childNodes.forEach(tr => {
        tr.childNodes.forEach(td => {
          td.classList.remove('selected')
        })
      })
    },
    resetForm (v) {
      this.resetSelectBox('projetos')
      this.resetSelectBox('fases')
      this.resetCalendario()
      this.RESET(v)
    },
    async postForm () {
      this.setValidationForm()
      const messages = this.validateForm.msg

      if (messages.length) {
        this.modal.show = true
        this.modal.title = 'Erro no formulário!'
        this.modal.error = true
        this.modal.description = 'Corriga os campos abaixo:'
        this.modal.descriptionList = this.validateForm.msg
        this.modal.actionText = 'Voltar'
        return
      }

      Promise.all(
        this.multipleData.map(dataRefInicio => {
          const horas = {
            usuario: this.idusuario,
            dataRefInicio,
            ...this.horas
          }
          return Horas.post(horas, this.token)
        })
      )
        .then(res => {
          this.TOGGLE_CALENDARIO_STATUS({ status: true })
          this.modal.show = true
          this.modal.title = 'Sucesso!'
          this.modal.error = false
          this.modal.description = 'Horas cadastradas'
          this.modal.descriptionList = []
          this.modal.actionText = 'Voltar'
          this.resetForm(true)
        })
        .catch(err => {
          this.modal.show = true
          this.modal.title = 'Erro!'
          this.modal.error = true
          this.modal.errorAPI = true
          this.modal.description = err.response.data.message
            ? err.response.data.message
            : err.message
          this.modal.descriptionList = []
          this.modal.actionText = 'Voltar'
          this.resetForm(true)
        })
        .finally(fn => {
          setTimeout(() => {
            this.RESET(false)
          }, 1500)
        })
    },
    async listarHoras (array) {
      this.arrayHoras = []

      await array.map(data => {
        return Horas.getStatus(this.idusuario, data).then(res => {
          if (res.data.totalHoras > 0) {
            this.arrayHoras.push({ data, res: res.data })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/form-horas.scss';

.registrar {
  &__modal {
    top: 0;
  }
}
.list_horas {
  margin-top: 7px;
  width: 100%;

  .list-enter-active,
  .list-leave-active {
    transition: all 0.2s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
  }
  &__title {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.1s;
  }
  &__title--show {
    opacity: 1;
  }
}
</style>
