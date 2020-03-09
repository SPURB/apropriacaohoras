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
                :disabled="this.registro.horas == 1"
                @click="hoursDec"
              >
                -
              </button> 
              <input 
                id="horas"
                v-model="registro.horas"
                type="number"
                min="0" 
                max="12"
                ref="hours"
                value="0"
              />
              <button
                :disabled="this.registro.horas == 12"
                @click="hoursInc">
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
          <input id="descricao" type="text">
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
      registro: {
        dataRefInicio: null,
        dataRefFim: null,
        id: null,
        horas: 0,
        extras: 0,
        projeto: null,
        fase: null,
        subatividade: null,
        descricao: null,
      }
    }
  },
  computed: {
    dataSelects () {
      const data = [
        {
          title: 'Projeto/Atividade',
          values: [
            { name: 'PIU Minhocão', value: '0' },
            { name: 'PIU Setor Central', value: '1' },
            { name: 'PIU Bairros do Tamanduateí', value: '2' },
            { name: 'PIU Jockey Club', value: '3'}
          ]
        },
        {
          title: 'FASE',
          values: [
            { name: 'Diagnóstico Socioterritorial', value: '0' },
            { name: 'Diagnóstico Territorial', value: '1' },
            { name: 'Programa de Interesse Público', value: '2' },
            { name: 'Diretrizes Urbanísticas', value: '3' },
            { name: 'Viabilidade da Transformação', value: '4' },
            { name: 'Adensamento Populacional', value: '5' }
          ]
        },
        {
          title: 'Subatividade',
          values: [
            { name: 'Elementos prévios', value: '0' },
            { name: 'Formulação', value: '1' },
            { name: 'Consolidação', value: '2' },
          ]
        }
      ]
      return data
    }
  },
  methods: {
    toggleUserMenu (elementFromChild) {
      this.userMenuState = !this.userMenuState
      if (this.userMenuEl === undefined) { this.userMenuEl = elementFromChild }
    },
    frameClick (event) {
      if (this.userMenuState && event.target.contains(this.userMenuEl)) {
        this.toggleUserMenu()
      }
    },
    hoursInc () {
     this.registro.horas = this.registro.horas + 1
     if (this.registro.horas > 8) {
       this.registro.extras = this.registro.extras + 1
     }
    },
    hoursDec () {
      this.registro.horas = this.registro.horas - 1
      this.extraHoursDec()
    },
    extraHoursDec () {
      this.registro.extras = this.registro.extras - 1
      if (this.registro.horas <= 8) {
        this.registro.extras = 0
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/form-horas.scss';
</style>
