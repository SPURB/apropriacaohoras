import Usuario from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'

export const state = () => ({
	id: 0,
	error: false,
	fetching: false,
	admin: false,
	nome: '',
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
	logout: ({ commit }, token) => {
		Usuario.logout(token)
			.then(() => commit('RESET'))
			.catch(err => commit('SET_ERROR', err))
			.finally(() => commit('IS_FETCHING', false))
	},
	filterProjetos: ({ commit }, idUsuario) => {
		commit('IS_FETCHING', true)
		UsuariosProjetos.get(`?usuario=${idUsuario}`)
			.then(({ data }) => commit('SET_PROJETOS', data))
			.catch(err => commit('SET_ERROR', err))
			.finally(() => commit('IS_FETCHING', false))
	},
	resetAsync: ({ commit }) => {
		commit('RESET')		
	}
}

export const mutations = {
	IS_FETCHING (state, fetchState) { state.fetching = fetchState },
  SET_USER (state, { usuario, auth }) {
		state.usuario = usuario
		state.id = usuario.id
		state.token = auth.token
		state.admin = usuario.admin
		state.nome = usuario.nome
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
		state.admin = false
	}
}
