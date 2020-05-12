<template>
  <div class="registrar" @click="frameClick($event)">
    <modal
      v-if="modal.show"
      :title="modal.title"
      :error="modal.error"
      :description="modal.description"
      :description-list="modal.descriptionList"
      :action-text="modal.actionText"
      @setModalAction="modal.show = !modal.show"
    />
    <router-link to="/admin">admin</router-link>

    <!-- <app-header
      @toggle-menu="toggleUserMenu"
      :userMenuState="userMenuState"
      :fullHeaderFromParent="true"
    /> -->

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
                  type="button"
                  @click="toggleBar(false)"
                >
                  -
                </button>
                <input
                  id="horas"
                  :value="horas.horas + horas.extras"
                  type="number"
                  min="0"
                  max="12"
                  ref="hours"
                />
                <button
                  :disabled="horas.horas + horas.extras == 12"
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
            :title="'Projetos'"
            :idInput="'projetos'"
            :values="projetos"
          />

          <custom-select
            v-if="fases.title"
            :idInput="'fases'"
            :title="fases.title"
            :values="fases.values"
          />

          <custom-select
            v-if="subatividades.title"
            :idInput="'subatividades'"
            :disabled="fase !== null ? false : true"
            :title="subatividades.title"
            :values="subatividades.values"
          />
        </div>

        <div class="formbtm">
          <fieldset>
            <label for="descricao">Descrição (opcional)</label>
            <input
              id="descricao"
              v-model="descricao"
              type="text"
            />
          </fieldset>
        </div>

        <button type="submit" class="postBtn">Registrar horas</button>
      </form>
    </main>
    <!-- <app-footer /> -->
  </div>
</template>

<script>
// import AppHeader from '~/components/AppHeader'
// import AppFooter from '~/components/AppFooter'
import Modal from '~/components/Modal'
import Calendario from '~/components/Calendario'
import CustomSelect from '~/components/CustomSelect'
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Horas from '@/services/api-horas'

export default {
  name: 'Registrar',
  components: {
    // AppHeader,
    // AppFooter,
    Calendario,
    CustomSelect,
    Modal
  },
  data () {
    return {
      userMenuState: false,
      userMenuEl: null,
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
      }
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
			get () { return this.horas.descricao },
			set (text) { this.setDescricao(text) }
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
    }
  },
  created () {
    this.addData()
  },
  methods: {
    ...mapActions('form-registrar-horas', [
      'addData',
      'toggleBar',
      'setDescricao',
      'RESET'
    ]),
    ...mapMutations('form-registrar-horas', [
      'setValidationForm',
      'TOGGLE_CALENDARIO_STATUS'
    ]),
    toggleUserMenu (elementFromChild) {
      this.userMenuState = !this.userMenuState
      if (this.userMenuEl === undefined) {
        this.userMenuEl = elementFromChild
      }
    },
    frameClick (event) {
      if (this.userMenuState && event.target.contains(this.userMenuEl)) {
        this.toggleUserMenu()
      }
    },
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
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/form-horas.scss';
</style>
