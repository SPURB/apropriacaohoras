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
import Modal from '~/components/sections/Modal'
import Calendario from '~/components/sections/Calendario'
import CustomSelect from '~/components/forms/CustomSelect'
import ListarHoras from '~/components/sections/ListarHoras'
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

<style lang="scss" scoped>
.registrar {
  &__modal {
    top: 0;
  }
  margin-bottom: 10vh;
  h2 {
    max-width: 1200px;
    font-size: 1.5rem;
    color: #fff;
    line-height: 3rem;
    margin: 4rem auto 1rem;
  }
  #form-registrar-horas {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    color: #fff;
    & > * {
      border-radius: 1.5rem;
    }
    & > .calendario {
      width: calc(50% - 2rem);
      margin-right: 2rem;
      @include bg-white-alpha(0.08);
    }
    * > fieldset {
      padding: 0;
      border: 0;
      label {
        display: block;
        @include color-white-alpha(0.4);
        font-size: 0.75rem;
        line-height: 1;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
      }
      input,
      select {
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 1.5rem;
        @include bg-white-alpha(0.08);
        width: 100%;
        option {
          color: $preto;
        }
        padding: 0 0.75rem;
        height: 3rem;
        border-radius: 1.5rem;
      }
      // sumindo com os controles de input number no firefox, chrome...
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'] {
        -moz-appearance: textfield;
        caret-color: transparent;
      }

      select:hover {
        cursor: pointer;
      }
    }
    & > .formtop {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      width: calc(50% - 2rem);
      margin-left: 2rem;
      fieldset {
        &.timeInput {
          .main {
            display: inline-block;
            width: 30%;
            label {
              display: inline-block;
            }
            & > div {
              position: relative;
              button {
                position: absolute;
                top: 0.5rem;
                height: calc(100% - 1rem);
                width: 20%;
                color: inherit;
                font-size: inherit;
                background-color: $verde;
                text-align: center;
                cursor: pointer;
                border: 2px solid rgba(255, 255, 255, 0.12);
                box-shadow: $s-1-2-48;
                &:first-child {
                  left: 0.5rem;
                  border-radius: 1.5rem 0 0 1.5rem;
                  padding-left: 0.65rem;
                }
                &:last-child {
                  right: 0.5rem;
                  border-radius: 0 1.5rem 1.5rem 0;
                  padding-right: 1rem;
                }
              }
              input {
                text-align: center;
              }
            }
          }
          aside {
            display: inline-block;
            height: 100%;
            width: calc(74.5% - 2rem);
            vertical-align: top;
            padding-left: 2rem;
            label {
              display: inline-block;
              margin-right: 0.75rem;
            }
            .bar {
              @include bg-white-alpha(0.08);
              padding: 0.5rem;
              width: 100%;
              height: 3rem;
              border-radius: 1.5rem;
              display: flex;
              position: relative;

              .normal-hours,
              .extra-hours {
                margin: 0;
                padding: 0;
                width: 100%;
                display: flex;

                .count-hours {
                  background-color: $verde;
                  border: 2px solid rgba(255, 255, 255, 0.2);
                  height: 100%;
                  width: 12%;
                  margin-left: 0.5%;

                  &:nth-child(1) {
                    border-radius: 1.5rem 0 0 1.5rem;
                  }
                  &:nth-child(8) {
                    border-radius: 0 1.5rem 1.5rem 0;
                  }
                }
              }

              .extra-hours {
                .count-hours {
                  background-color: $verde-claro;
                  width: 25%;

                  &:nth-child(4) {
                    border-radius: 0 1.5rem 1.5rem 0;
                  }
                }
              }
            }
          }
        }
      }
    }
    & > .formbtm {
      width: 100%;
      margin-top: 2rem;
    }
    & > .postBtn {
      border: 2px solid rgba(255, 255, 255, 0.24);
      background-color: $verde;
      font-size: inherit;
      font-family: inherit;
      border-radius: 2rem;
      color: inherit;
      padding: 1rem;
      margin: 2rem 0 0;
      width: 100%;
      box-shadow: $s-2-4-48;
      cursor: pointer;
      transition: all ease-in 0.2s;
      &:hover {
        box-shadow: $s-4-8-24;
      }
    }
  }
}

@media (max-width: 850px) {
  .registrar {
    h2 {
      margin-left: 15px;
    }
    #form-registrar-horas {
      flex-direction: column;
      padding: 15px;

      .calendario,
      .formtop {
        margin: 0 !important;
        width: 100%;

        fieldset {
          margin: 15px 0px 15px 0px;
        }
        .timeInput {
          .main,
          aside {
            margin: 0px;
            width: 100% !important;
          }
          aside {
            padding-left: 0rem !important;
          }
        }
      }
    }
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
