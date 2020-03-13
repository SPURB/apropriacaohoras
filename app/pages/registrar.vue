<template>
  <div class="registrar" @click="frameClick($event)">
    
    <Modal />
    <Header @toggle-menu="toggleUserMenu" :userMenuState="userMenuState" :fullHeaderFromParent="true"></Header>

    <h2>Registrar horas</h2>
    <main>
      <form @submit.prevent="postForm">
      <Calendario class="calendario"></Calendario>

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
                @click="toggleBar(true)">
                +
              </button>
            </div>
          </div>
          <aside>
            <label for="">Restante do dia</label><label for="">Horas extras</label>
            <div class="bar">
              <div class="normal-hours" v-if="horas.horas + horas.extras <= 8">
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
          :key="index"
          :buildSelect="item"
          v-for="(item, index) in dataSelects"
        />
      </div>

      <div class="formbtm">
        <fieldset>
          <label for="descricao">Descrição (opcional)</label>
          <input id="descricao" @keyup="setDescricao(descricao)" v-model="descricao" type="text">
        </fieldset>
      </div>

      <button type="submit" class="postBtn">Registrar horas</button>
    </form>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
import Calendario from '@/components/Calendario'
import CustomSelect from '@/components/CustomSelect'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Registrar',
  components: {
    Header,
    Footer,
    Calendario,
    CustomSelect,
    Modal
  },
  data () {
    return {
      userMenuState: false,
      userMenuEl: null,
      descricao: ''
    }
  },
  computed: {
    ...mapState('module/form-registrar-horas', {
      horas: state => state.horas,
      showModal: state => state.showModal
    }),
    ...mapGetters('module/form-registrar-horas', ['dataSelects', 'showModal']),
  },
  created () {
    this.addData()
  },
  methods: { 
    ...mapActions('module/form-registrar-horas', ['addData','toggleBar','setDescricao','postForm']),
    toggleUserMenu (elementFromChild) {
      this.userMenuState = !this.userMenuState
      if (this.userMenuEl === undefined) { this.userMenuEl = elementFromChild }
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
