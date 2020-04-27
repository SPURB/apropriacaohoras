<template>
  <div class="registrar" @click="frameClick($event)">
    <modal />
    <app-header
      @toggle-menu="toggleUserMenu"
      :userMenuState="userMenuState"
      :fullHeaderFromParent="true"
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

          <custom-select :title="'Projeto'" :values="projetos" />

          <custom-select
            v-if="fases.title"
            :title="fases.title"
            :values="fases.values"
          />

          <custom-select
            v-if="subatividades.title"
            :title="subatividades.title"
            :values="subatividades.values"
          />
        </div>

        <div class="formbtm">
          <fieldset>
            <label for="descricao">Descrição (opcional)</label>
            <input
              id="descricao"
              @keyup="setDescricao(descricao)"
              v-model="descricao"
              type="text"
            />
          </fieldset>
        </div>

        <button type="submit" class="postBtn">Registrar horas</button>
      </form>
    </main>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'
import Modal from '~/components/modals/Modal'
import Calendario from '~/components/Calendario'
import CustomSelect from '~/components/CustomSelect'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',
  name: 'Registrar',
  components: {
    AppHeader,
    AppFooter,
    Calendario,
    CustomSelect,
    Modal
  },
  data () {
    return {
      userMenuState: false,
      userMenuEl: null,
      descricao: '',
      fases: {},
      subatividades: {}
    }
  },
  computed: {
    ...mapState('form-registrar-horas', {
      horas: state => state.horas,
      showModal: state => state.showModal,
      dataSelects: state => state.dataSelects
    }),
    ...mapGetters('form-registrar-horas', ['projetos'])
  },
  watch: {
    dataSelects (selects) {
      if (selects) {
        this.fases = selects.find(select => select.title === 'Fase')
        this.subatividades = selects.find(
          select => select.title === 'Subatividade'
        )
      }
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
      'postForm'
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
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/form-horas.scss';
</style>
