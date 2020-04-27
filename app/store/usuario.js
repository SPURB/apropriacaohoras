import Usuario from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'

export const state = () => ({
	id: 0,
	error: false,
	fetching: false,
	errorResponse: {},
	usuario: {},
	token: '',
	projetos: []
})

export const actions = {
  login: ({ commit }, body) => {
		commit('IS_FETCHING', true)
		Usuario.post(body)
			.then(({ data }) => commit('SET_USER', data))
			.catch(err => commit('SET_ERROR', err))
			.finally(() => commit('IS_FETCHING', false))
	},
	filterProjetos: ({ commit }, idUsuario) => {
		commit('IS_FETCHING', true)
		UsuariosProjetos.get(idUsuario)
			.then(({ data }) => commit('SET_PROJETOS', data))
			.catch(err => commit('SET_ERROR', err))
			.finally(() => commit('IS_FETCHING', false))
	}
}

export const mutations = {
	IS_FETCHING (state, fetchState) { state.fetching = fetchState },
  SET_USER (state, { usuario, auth }) {
		state.usuario = usuario
		state.id = usuario.id
		state.token = auth.token
	},
	SET_PROJETOS: (state, { values }) => state.projetos = values.map(value => value.projeto),
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
		state.auth = ''
	}
}
