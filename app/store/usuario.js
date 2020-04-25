import Usuario from '@/services/api-usuario'

export const state = () => ({
	id: 0,
	error: false,
	fetching: false,
	errorResponse: {},
	usuario: {},
	auth: {}
})

export const actions = {
  login ({ commit }, body) {
		commit('IS_FETCHING', true)
		Usuario.post(body)
			.then(({ data }) => commit('SET_USER', data))
			.catch(err => commit('SET_ERROR', err))
			.finally(() => commit('IS_FETCHING', false))
	}
}

export const mutations = {
	IS_FETCHING (state, fetchState) { state.fetching = fetchState },
  SET_USER (state, { usuario, auth }) {
		state.usuario = usuario
		state.id = usuario.id
		state.auth = auth
	},
	SET_ERROR (state, errorResponse) {
		state.error = true
		state.errorResponse = errorResponse
	},
	RESET (state) {
		state.id = 0
		state.error = false
		state.errorResponse = {}
		state.fetching = false
		state.usuario = {}
		state.auth = {}
	}
}
