import Projetos from '@/services/api-projeto'
import Usuarios from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'

export const state = () => ({
	fetching: false,
	error: false,
	showModal: false,
	apiMessage: '',
	status: 0,
	projetos: [],//this is a fallback if getter.projetos is not ready, if is not ready just populate this state callign 'getProjetos',
	usuarios: [],
	usuariosProjeto: []
})

export const getters = {
	projetos: (state, getters, rootState) => {// in componentes always get projetos from here
		const fetchedTables = rootState['form-registrar-horas'].dataSelects
		if (fetchedTables.length) {
			return fetchedTables.find(select => select.title === 'Projetos').values
		}
		else return state.projetos
	},
	validUsuarios: (state) => {
		const validUsuarios = state.usuariosProjeto.map(item => item.usuario)
		return state.usuarios
			.filter(usuario => validUsuarios.includes(usuario.id))
			.map(usuario => usuario)
	}
}

export const actions = {
	getUsuarios: ({ commit }) => {
		commit('IS_FETCHING', true)
		Usuarios.get()
			.then(({ data }) => {
				commit('SET_USUARIOS', data)
				commit('SET_API_MESSAGE', { message:data.message })
				commit('SET_ERROR', { error: false })
			})
			.catch(err => {
				if (err.response.status) {
					commit('SET_ERROR', { error: true, status: err.response.status })
				} else {
					commit('SET_ERROR', { error: true })
				}
				commit('SET_API_MESSAGE', { message: err.message })				
				commit('SET_SHOW_MODAL', true)
			})
			.finally(() => commit('IS_FETCHING', false))
	},
	getProjetos: ({ commit }) => {
		commit('IS_FETCHING', true)
		Projetos.get()
			.then(({ data }) => {
				commit('SET_PROJETOS', data)
				commit('SET_API_MESSAGE', { message:data.title })
				commit('SET_ERROR', { error: false })
			})
			.catch(err => {
				if (err.response.status) {
					commit('SET_ERROR', { error: true, status: err.response.status })
				} else {
					commit('SET_ERROR', { error: true })
				}
				commit('SET_API_MESSAGE', { message: err.message })
				commit('SET_SHOW_MODAL', true)
			})
			.finally(() => commit('IS_FETCHING', false))
	},
	getUsuariosProjetos: ({ commit }, { idProjeto }) => {
		commit('IS_FETCHING', true)
		UsuariosProjetos.get(`?projeto=${idProjeto}`)
			.then(({ data }) => {
				commit('SET_USUARIOS_PROJETOS', data)
				commit('SET_API_MESSAGE', { message:data.title })
				commit('SET_ERROR', { error: false })
			})
			.catch(err => {
				if (err.response.status) {
					commit('SET_ERROR', { error: true, status: err.response.status })
				} else {
					commit('SET_ERROR', { error: true })
				}
				commit('SET_API_MESSAGE', { message: err.message })
				commit('SET_SHOW_MODAL', true)
			})
			.finally(() => commit('IS_FETCHING', false))
	},
	removeUsuario: ({ commit, state, rootState }, { idUsuario }) => {
		const toRemove = state.usuariosProjeto
			.filter(relation => relation.usuario === idUsuario)
			.map(relation => UsuariosProjetos.delete(relation.id, rootState.usuario.token))

		commit('IS_FETCHING', true)
		Promise.all(toRemove)
			.then(responses => {
				const updatedUsuarioProjeto = state.usuariosProjeto
					.filter(relation => relation.usuario !== idUsuario)

				const message = responses.map(({ data }) => data.message).join('. ')
				commit('SET_API_MESSAGE', { message })
				commit('SET_USUARIOS_PROJETOS', { values: updatedUsuarioProjeto })
			})
			.catch(err => {
				if (err.response.status) {
					commit('SET_ERROR', { error: true, status: err.response.status })
				} else {
					commit('SET_ERROR', { error: true })
				}
				commit('SET_ERROR', { error: true })
				commit('SET_API_MESSAGE', { message: err.message })
				commit('SET_SHOW_MODAL', true)
			})
			.finally(() => commit('IS_FETCHING', false))
	},
	createUsuariosProjetos: ({ commit, rootState }, { idUsuario, idProjeto }) => {
		commit('IS_FETCHING', true)
		const body = {
			usuario: idUsuario,
			projeto: idProjeto
		}
		UsuariosProjetos.post(body, rootState.usuario.token)
			.then(({ data }) => {
				commit('ADD_USUARIOS_PROJETOS', data)
				commit('SET_API_MESSAGE', { message: data.id })
			})
			.catch(err => {
				commit('SET_ERROR', { error: true })
				commit('SET_API_MESSAGE', { message: err.message })
				commit('SET_SHOW_MODAL', true)
			})
			.finally(() => commit('IS_FETCHING', false))
	},
	createUsuario: ({ commit, dispatch, rootState }, payload) => {
		const token = rootState.usuario.token
		Usuarios.create(payload, token)
			.then(({ data }) => {
				commit('SET_API_MESSAGE', { message: data.message })
				commit('SET_ERROR', { error: false, status: 200 })
				commit('SET_SHOW_MODAL', true)
				dispatch('getUsuarios')
			})
			.catch(err => {
				commit('SET_ERROR', { error: true })
				commit('SET_API_MESSAGE', { message: err.message })
				commit('SET_SHOW_MODAL', true)
			})
	},
	reset: ({ commit }) => { commit('RESET') }
}

export const mutations = {
	SET_USUARIOS: (state, { data }) => { state.usuarios = data },
	SET_PROJETOS: (state, { values }) => { state.projetos = values },
	SET_USUARIOS_PROJETOS: (state, { values }) => { state.usuariosProjeto = values },
	SET_API_MESSAGE: (state, { message }) => { state.apiMessage = message },
	SET_SHOW_MODAL: (state, value) => { state.showModal = value },
	ADD_USUARIOS_PROJETOS: (state, item) => state.usuariosProjeto.push(item),
	SET_ERROR: (state, { error, status }) => {
		state.error = error
		status ? state.status = status : state.status = state.status
	},
	IS_FETCHING: (state, fetchState) => { state.fetching = fetchState },
	RESET: (state) => {
		state.fetching = false
		state.error = false
		state.apiMessage = ''
		state.status = 0
		state.projetos = []
		state.usuarios = []
		state.usuariosProjeto = []
	}
}