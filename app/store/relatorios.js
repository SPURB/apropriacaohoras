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

export const getters = {
  projetosMap: (state, getters) => {
    if (state.projetos.length) {
      let mapped = {}
      state.projetos.forEach(projeto => mapped[projeto.id] = projeto.nome)

      return mapped
    }
    return {}
  },
  projetosCardMap: (state, getters, rootState) => {
    const projetosUsuario = rootState.usuario.projetos

    if (state.projetos.length && projetosUsuario.length) {
      return projetosUsuario.map((idProjeto, index) => {
        return {
          id: index + 1,
          nome: getters.projetosMap[idProjeto]
        }
        // id: 1,
        // nome: 'Estudos de Viabilidade Imobiliária',
        // desdeInicio: '4784',
        // data: '2020-05-15',
        // ultimoMes: '477',
        // minhasHoras: '415'
      })
    }

    return []
  }
}

export const actions = {
  getRelatorios: ({ commit, rootState }) => {
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