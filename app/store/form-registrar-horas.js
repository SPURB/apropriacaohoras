import Fase from '@/services/api-fase'
import Projeto from '@/services/api-projeto'
import Subatividade from '@/services/api-subatividade'
import Horas from '@/services/api-horas'

import Lib from '@/libs'

export const state = () => ({
  dataSelects: [],
  showModal: false,
  multipleData: [],
  validateForm: {
    msg: [],
    disabled: false
  },
  horas: {
    usuario: 1, // id fixo mudar para quando for consumir api
    horas: null,
    extras: 0,
    projeto: null,
    fase: null,
    subatividade: null,
    descricao: ''
  }
})

export const actions = {
  async addData ({ commit }) {
    const payload = []
    try {
      await Promise.all([Fase.get(), Projeto.get(), Subatividade.get()]).then(
        values => {
          values.map(res => {
            payload.push(res.data)
          })
        }
      )
      commit('setSelects', payload)
    } catch (error) {
      alert('Ocorreu algum erro! Tente mais tarde.')
    }
  },
  async postForm ({ commit, state }) {
    commit('setValidationForm', state.horas)
    let validateForm = state.validateForm
    try {
      if (validateForm.disabled !== true) {
        state.multipleData.forEach(dataRefInicio => {
          const postObj = {
            dataRefInicio,
            ...state.horas
          }
          Horas.post(postObj)
            .then(() => {
              commit('setShowModal', true)
            })
            .catch(err => {
              commit('setErroData', err.response.data)
              commit('setShowModal', true)
              setTimeout(() => {
                commit('setShowModal', false)
              }, 3000)
            })
        })
      } else {
        throw validateForm
      }
    } catch (error) {
      commit('setShowModal', true)
      setTimeout(() => {
        commit('setShowModal', false)
      }, 2500)
    }
  },
  toggleBar ({ commit }, bool) {
    if (bool) {
      commit('hoursInc')
    } else {
      commit('hoursDec')
    }
  },
  setValueOption ({ commit }, payload) {
    commit('setValueOption', payload)
  },
  setDescricao ({ commit }, payload) {
    commit('setDescricao', payload)
  },
  setMultipleData ({ commit }, payload) {
    commit('setMultipleData', payload)
    setTimeout(() => {
      commit('setShowModal', false)
    }, 2500)
  }
}

export const getters = {
  dataSelects (state) {
    return state.dataSelects
  },
  showModal (state) {
    return state.showModal
  },
  validateForm (state) {
    return state.validateForm
  }
}

export const mutations = {
  setSelects (state, payload) {
    state.dataSelects = payload
  },
  setValueOption (state, payload) {
    switch (payload.title) {
      case 'Fase':
        state.horas.fase = payload.value
        break
      case 'Projeto':
        state.horas.projeto = payload.value
        break
      case 'Subatividade':
        state.horas.subatividade = payload.value
        break
      default:
        break
    }
  },
  setDescricao (state, payload) {
    state.horas.descricao = payload
  },
  setShowModal (state, payload) { state.showModal = payload },
  setMultipleData (state, payload) {
    let eTarget = payload.event
    let data = payload.date

    const isWeekend = Lib.isWeekend(data)
    const sDate = Lib.splitDate(data)
    const currentDate = Lib.currentDate()

    // verifica se é final de semana
    if (
      sDate.sMonth !== currentDate.cMonth ||
      (sDate.sDay > currentDate.cDay && isWeekend === false) ||
      isWeekend === true
    ) {
      state.validateForm = { msg: [], disabled: false } // zera o state para um vazio

      state.validateForm.msg.push('Data informada inválida')
      state.validateForm.disabled = true

      state.showModal = true
    } else {
      if (eTarget.target.classList.contains('selected')) {
        eTarget.target.classList.remove('selected')
        state.multipleData = state.multipleData.filter(item => item !== data)
      } else {
        eTarget.target.classList.add('selected')
        state.multipleData.push(data)
      }
    }
  },
  hoursInc (state) {
    state.horas.horas = state.horas.horas + 1
    if (state.horas.horas > 8) {
      state.horas.horas = 8 // força o state para 8
      state.horas.extras = state.horas.extras + 1
    }
  },
  hoursDec (state) {
    if (state.horas.extras > 0) {
      state.horas.extras = state.horas.extras - 1
    } else {
      state.horas.horas = state.horas.horas - 1
    }
  },
  setValidationForm (state) {
    let array = []
    state.validateForm = { msg: [], disabled: false }

    // valida o objeto horas :: sem dataRefInicio
    Object.keys(state.horas).map(key => {
      const value = state.horas[key]
      if (value == null && key !== 'extras' && key !== 'descricao') {
        array.push(key)
      }
    })

    // valida o multipleData :: dataRefInicio
    if (state.multipleData.length == 0) {
      array.push('dataRefInicio')
    }

    array.forEach(element => {
      switch (element) {
        case 'dataRefInicio':
          state.validateForm.msg.push('Preencha o campo data')
          state.validateForm.disabled = true
          break
        case 'horas':
          state.validateForm.msg.push('Preencha o campo horas')
          state.validateForm.disabled = true
          break
        case 'fase':
          state.validateForm.msg.push('Preencha o campo fase')
          state.validateForm.disabled = true
          break
        case 'projeto':
          state.validateForm.msg.push('Preencha o campo projeto')
          state.validateForm.disabled = true
          break
        case 'subatividade':
          state.validateForm.msg.push('Preencha o campo subatividade')
          state.validateForm.disabled = true
          break
      }
    })
  },
  setErroData (state, payload) {
    state.validateForm = { msg: [], disabled: false }
    state.validateForm.msg.push(payload.message)
    state.validateForm.msg.push(`Dia negado: ${payload.data}`)
    state.validateForm.disabled = true
  }
}
