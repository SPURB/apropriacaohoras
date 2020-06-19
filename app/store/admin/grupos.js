import Grupos from '@/services/api-grupo'

export const state = () => ({
  fetching: false,
  error: false,
  title: '',
  success: false,
  grupos: [],
  message: ''
})

export const actions = {
  getGrupos: ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    Grupos.get()
      .then(({ data }) => {
          commit('SET', { data: data.values, key: 'grupos' })
        })
      .catch(({ message }) => {
        commit('SET', { data: false, key: 'success' })
        commit('SET', { data: true, key: 'error' })
        commit('SET', { data: message, key: 'message' })
      })
      .finally(() => commit('SET', { data: false, key: 'fetching' }))
  },
  setGrupo: ({ commit, rootState }, { nome, descricao }) => {
    const token =  rootState.usuario.token
    Grupos.post({ nome, descricao }, token)
      .then(res => {
        commit('SET', { data: false, key: 'error' })
        commit('SET', { data: true, key: 'success' })
        commit('SET', { data: 'Grupo cadastrado', key: 'title' })
        commit('SET', { data: '', key: 'message' })
    })
      .catch(({ message }) => {
        commit('SET', { data: false, key: 'success' })
        commit('SET', { data: true, key: 'error' })
        commit('SET', { data: 'Erro!', key: 'title' })
        commit('SET', { data: message, key: 'message' })
      })
      .finally(() => commit('SET', { data: false, key: 'fetching' }))
  },
  putGroup: ({ commit, dispatch, rootState }, data) => {
    const token =  rootState.usuario.token
    const { descricao, nome, id } = data.body
    
    Grupos.put({ descricao, nome }, id, token)
      .then(res => {
        dispatch('getGrupos')
        commit('SET', { data: false, key: 'error' })
        commit('SET', { data: true, key: 'success' })
        commit('SET', { data: 'Grupo atualizado', key: 'title' })
        commit('SET', { data: '', key: 'message' })
      }).catch(({ message }) => {
        commit('SET', { data: false, key: 'success' })
        commit('SET', { data: true, key: 'error' })
        commit('SET', { data: 'Erro!', key: 'title' })
        commit('SET', { data: message, key: 'message' })
      }) 
  },
  reset: ({ commit }) => commit('RESET')
}

export const mutations = {
  SET: (state, { data, key }) => { state[key] = data },
  RESET: (state) => {
    state.fetching = false
    state.error = false
    state.success = false
    state.grupos= []
    state.message = ''
  }
}
