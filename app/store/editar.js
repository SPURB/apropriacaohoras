import Horas from '@/services/api-horas'

export const state = () => ({
  novaAtividade: [],
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
    let novaAtividade = state.novaAtividade
    let horas = 0
    let extras = 0

    registros.map(registro => {
      horas = horas + registro.horas
      extras = extras + registro.extras
    })
    
    novaAtividade.map(atividade => {
      horas = horas + atividade.horas
      extras = extras + atividade.extras
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
  },
  disabled: (state) => {
    let registros = state.registros
    let novaAtividade = state.novaAtividade
    let horas = 0

    registros.map(registro => horas = horas + registro.horas)
    novaAtividade.map(atividade => horas = horas + atividade.horas)

    if (horas < 8) {
      return true
    } else {
      return false
    }
  }
}

export const actions = {
  addAtividade: ({ commit, rootState }) => {
    commit('SET_NOVA_ATIVIDADE')
  },
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
    commit('STATE_ARRAYOF', payload)
  }
}

export const mutations = {
  SET: (state, { data, key }) => { state[key] = data },
  SET_NOVA_ATIVIDADE: (state) => {
    state.novaAtividade.push({
      horas: 0,
      extras: 0,
      projeto: 0,
      fase: 0,
      subatividade: 0,
    })
  },
  STATE_ARRAYOF: (state, { data, key, index, type }) => {
    switch (type) {
      case 0: 
        state.registros[index][key] = data
        break
      case 1:
        state.novaAtividade[index][key] = data
        break
      default:
        break
    }
  },
  RESET_REGISTROS: (state) => {
    state.registros = []
    state.novaAtividade = []
  },
  RESET: (state) => {
    state.registros = [],
    state.countHoras = [],
    state.error = false,
    state.errorStatus = 0,
    state.errorMessage = ''
  }
}