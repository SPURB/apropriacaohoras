import Projetos from '@/services/api-projeto'
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
  }
}

export const mutations = {
  SET: (state, { data, key }) => { state[key] = data },
  RESET: (state) => {
    state.registros = [],
    state.countHoras = [],
    state.error = false,
    state.errorStatus = 0,
    state.errorMessage = ''
  }
}