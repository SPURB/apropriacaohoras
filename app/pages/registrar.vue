<template>
  <div class="registrar" @click="frameClick($event)">
    <Header @toggle-menu="toggleUserMenu" :userMenuState="userMenuState" :fullHeaderFromParent="true"></Header>
    <h2>Registrar horas</h2>
    <main>

      <Calendario class="calendario"></Calendario>

      <div class="formtop">
        <fieldset class="timeInput">
          <div class="main">
            <label for="horas">Número de horas</label>
            <div>
              <button
                :disabled="registro.horas == 1"
                @click="toggleBar(false)"
              >
                -
              </button> 
              <input 
                id="horas"
                :value="registro.horas"
                type="number"
                min="0" 
                max="12"
                ref="hours"
              />
              <button
                :disabled="registro.horas == 12"
                @click="toggleBar(true)">
                +
              </button>
            </div>
          </div>
          <aside>
            <label for="">Restante do dia</label><label for="">Horas extras</label>
            <div class="bar">
              <div class="normal-hours" v-if="registro.horas <= 8">
                <div
                  :key="`normal-${index}`"
                  class="count-hours"
                  v-for="index in registro.horas"
                ></div>
              </div>
              <div class="extra-hours" v-else>
                <div
                  :key="`extras-${index}`"
                  class="count-hours"
                  v-for="index in registro.extras"
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

      <button class="postBtn">Registrar horas</button>
    
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Calendario from '@/components/Calendario'
import CustomSelect from '@/components/CustomSelect'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Registrar',
  components: {
    Header,
    Footer,
    Calendario,
    CustomSelect
  },
  data () {
    return {
      userMenuState: false,
      userMenuEl: null,
      descricao: ''
    }
  },
  computed: {
    ...mapState(['registro']),
    ...mapGetters([
      'dataSelects'
    ]),
  },
  created () {
    this.addData()
  },
  methods: { 
    ...mapActions([
      'addData','toggleBar','setDescricao'
    ]),
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
