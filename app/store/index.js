import Fase from '@/services/api-fase'
import Projeto from '@/services/api-projeto'
import Subatividade from '@/services/api-subatividade'
import Horas from '@/services/api-horas'

export const state = () => ({
  dataSelects: [],
  selection: null,
  showModal: null,
  horas: {
    dataRefInicio: null,
    id: 1, // id fixo mudar para quando for consumir api
    horas: null,
    extras: null,
    projeto: null,
    fase: null,
    subatividade: null,
    descricao: null
  },
  validate: {}
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
  async postForm ({ state, commit }) {
    await Horas.post(state.horas)
      .then(res => {
        commit('setShowModal', true)
        console.log(res)
      })
      .catch(err => {
        alert('Ocorreu algum erro! Tente mais tarde')
      })
      .finally(() => {
        setTimeout(() => {
          commit('setShowModal', false)
        }, 2000)
      })
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
  setData ({ commit }, payload) {
    commit('toggleSelect', event)
    commit('setData', payload)
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
    let res = []
    Object.keys(state.horas).map(key => {
      const value = state.horas[key]
      if (value == null) {
        res.msg = 'Preecha todos os campos'
        res.disabled = true
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
  toggleSelect (state, event) {
    state.selection ? state.selection.classList.remove('selected') : false
    event.target.innerText ? (state.selection = event.target) : false
    state.selection ? state.selection.classList.add('selected') : false
  },
  setData (state, payload) {
    let newPayload = `${payload.year}-${payload.month}-${payload.day} ${payload.hms}`
    state.horas.dataRefInicio = newPayload
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
