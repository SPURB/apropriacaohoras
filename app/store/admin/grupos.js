import Grupos from '@/services/api-grupo'

export const state = () => ({
  fetching: false,
  error: false,
  grupos: [],
  message: ''
})

export const actions = {
  getGrupos: ({ commit }) => {
    commit('IS_FETCHING', true)
    Grupos.get()
    .then(({ data }) => {
        commit('SET', { data: data.values })
        commit('SET_ERROR', { status: false, message: '' })
      })
      .catch(({ message }) => commit('SET_ERROR', { status: true, message }))
      .finally(() => commit('IS_FETCHING', false))
  }
}

export const mutations = {
	SET: (state, { data }) => { state.grupos = data },
	SET_ERROR: (state, { status, message })=> {
		state.error = status
		state.message = message
	},
	IS_FETCHING: (state, fetchState) => { state.fetching = fetchState },
	RESET: (state) => {
		state.error = false
		state.fetching = false
		state.message = ''
	}
}
