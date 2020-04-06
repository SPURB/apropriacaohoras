import Fase from '@/services/api-fase'
import Projeto from '@/services/api-projeto'
import Subatividade from '@/services/api-subatividade'
import Horas from '@/services/api-horas'

export const state = () => ({
  dataSelects: [],
  selection: null,
  showModal: null,
  multipleData: [],
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
  async postForm ({ commit, getters, state }) {
    let validateForm = getters.validateForm
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
              console.log(err)
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
    let array = []
    let res = {
      msg: [],
      disabled: false
    }
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
          res.msg.push('Preencha o campo data')
          res.disabled = true
          break
        case 'horas':
          res.msg.push('Preencha o campo horas')
          res.disabled = true
          break
        case 'fase':
          res.msg.push('Preencha o campo fase')
          res.disabled = true
          break
        case 'projeto':
          res.msg.push('Preencha o campo projeto')
          res.disabled = true
          break
        case 'subatividade':
          res.msg.push('Preencha o campo subatividade')
          res.disabled = true
          break
      }
    })
    return res
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
  setShowModal (state, payload) {
    state.showModal = payload
  },
  setMultipleData (state, payload) {
    let eTarget = payload.event
    let data = payload.date
    if (eTarget.target.classList.contains('selected')) {
      eTarget.target.classList.remove('selected')
      state.multipleData = state.multipleData.filter(item => item !== data)
    } else {
      eTarget.target.classList.add('selected')
      state.multipleData.push(data)
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
  }
}
