import Horas from '@/services/api-horas'

export const state = () => ({
  registros: [],
  countHoras: {},
  fetching: false,
  error: false,
  errorStatus: 0,
  errorMessage: ''
})

export const getters = {
  isValid: (state) => {
    let registros = state.registros
    let horas = 0
    let extras = 0

    registros.map(registro => {
      horas = horas + registro.horas
      extras = extras + registro.extras
    })
    
    if (horas > 8 && extras > 4) {
      return { message: 'Horas totais ultrapassaram o limite', disabled: false }
    } else if (extras > 4) {
      return { message: 'Horas `extras` ultrapassaram o limite', disabled: false }
    } else if (horas > 8) {
      return { message: 'Horas `comum` ultrapassaram o limite', disabled: false }
    } else {
      return { message: '', disabled: true }
    }
  }
}

export const actions = {
  getRegistros: ({ commit, dispatch, rootState }, data) => {
    Horas.get(`?usuario=${rootState.usuario.id}&dataRefInicio=${data}`)
      .then(res => {
        const data = res.data.values
        commit('SET', { key: 'registros', data })
      }).catch(err => {
        commit('SET', { key: 'error', data: true })
        if (err.response && err.message) {
          commit('SET', { key: 'errorStatus', data: err.response.status })
          commit('SET', { key: 'errorMessage', data: err.message })
        }
      }).finally(() => dispatch('countHoras', data))
  },
  countHoras: ({ commit, rootState }, data) => {
    const idusuario = rootState.usuario.id

    Horas.getStatus(idusuario, data)
      .then(res => {
        commit('SET', { key: 'countHoras', data: {res: res.data, data: data }})
      }).catch(err => {
        commit('SET', { key: 'error', data: true })
        if (err.response && err.message) {
          commit('SET', { key: 'errorStatus', data: err.response.status })
          commit('SET', { key: 'errorMessage', data: err.message })
        }
      })
  },
  stateArrayOf ({ commit }, payload) {
    const { data, key, index } = payload
    commit('STATE_ARRAYOF', { data, key, index })
  }
}

export const mutations = {
  SET: (state, { data, key }) => { state[key] = data },
  STATE_ARRAYOF: (state, { data, key, index }) => {
    state.registros[index][key] = data
  },
  RESET: (state) => {
    state.registros = [],
    state.countHoras = [],
    state.error = false,
    state.errorStatus = 0,
    state.errorMessage = ''
  }
}