import Projetos from '@/services/api-projeto'
import Horas from '@/services/api-horas'

export const state = () => ({
  projetos: [],
  horasUsuario: [],
  fetching: false,
  error: false,
  errorStatus: 0,
  errorMessage: ''
})

export const actions = {
  get: ({ commit, rootState }) => {
    if (!rootState.usuario.id) {
      commit('SET', { key: 'error', data: true })
      commit('SET', { key: 'errorStatus', data: 403 })
      commit('SET', { key: 'errorMessage', data: 'Usuário inválido. Faça login novamente' })
      return
    }
    else {
      commit('RESET')
    }

    commit('SET', { key: 'fetching', data: true })

    Promise.all([Projetos.get(), Horas.get(`?usuario=${rootState.usuario.id}`)])
      .then(responses => {
        const projetos = responses[0].data.values
        const horas = responses[1].data.values
        commit('SET', { key: 'projetos', data: projetos })
        commit('SET', { key: 'horasUsuario', data: horas })
      })
      .catch(err => {
        commit('SET', { key: 'error', data: true })
        if (err.response && err.message) {
          commit('SET', { key: 'errorStatus', data: err.response.status })
          commit('SET', { key: 'errorMessage', data: err.message })
        }
      })
      .finally(() => commit('SET', { key: 'fetching', data: false }))
  }
}

export const mutations = {
  SET: (state, { data, key }) => { state[key] = data },
  RESET: (state) => {
    state.projetos = []
    state.horasUsuario = []
    state.fetching = false
    state.error = false
    state.errorStatus = 0
    state.errorMessage =''
  }
}