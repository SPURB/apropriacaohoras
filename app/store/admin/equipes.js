import Projetos from '@/services/api-projeto'
import Usuarios from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'

export const state = () => ({
	fetching: false,
	error: false,
	message: '',
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
			.then(({data}) => {
				commit('SET_USUARIOS', data)
				commit('SET_ERROR', false)
			})
			.catch(() => { commit('SET_ERROR', true)})
			.finally(() => commit('IS_FETCHING', false))
	},
	getProjetos: ({ commit }) => {
		commit('IS_FETCHING', true)
		Projetos.get()
			.then(({ data }) => {
				commit('SET_PROJETOS', data)
				commit('SET_ERROR', false)
			})
			.catch(() => { commit('SET_ERROR', true)})
			.finally(() => commit('IS_FETCHING', false))
	},
	getUsuariosProjetos: ({ commit }, { idProjeto }) => {
		commit('IS_FETCHING', true)
		UsuariosProjetos.get(`?projeto=${idProjeto}`)
			.then(({ data }) => {
				commit('SET_USUARIOS_PROJETOS', data)
				commit('SET_ERROR', false)
			})
			.catch(() => { commit('SET_ERROR', true)})
			.finally(() => commit('IS_FETCHING', false))
	},
	removeUsuario: ({ commit, state, rootState }, { idUsuario }) => {
		const toRemove = state.usuariosProjeto
			.filter(relation => relation.usuario === idUsuario)
			.map(relation => UsuariosProjetos.delete(relation.id, rootState.usuario.token))

		commit('IS_FETCHING', true)
		Promise.all(toRemove)
			.then(() => {
				const updatedUsuarioProjeto = state.usuariosProjeto
					.filter(relation => relation.usuario !== idUsuario)

				commit('SET_USUARIOS_PROJETOS', { values: updatedUsuarioProjeto })
			})
			.catch(() => { commit('SET_ERROR', true)})
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
			})
			.catch(() => { commit('SET_ERROR', true)})
			.finally(() => commit('IS_FETCHING', false))
	}
}

export const mutations = {
	SET_USUARIOS: (state, { data }) => { state.usuarios = data },
	SET_PROJETOS: (state, { values }) => { state.projetos = values },
	SET_USUARIOS_PROJETOS: (state, { values }) => { state.usuariosProjeto = values },
	ADD_USUARIOS_PROJETOS: (state, item) => state.usuariosProjeto.push(item),
	SET_ERROR: (state, payload) => { state.error = payload },
	IS_FETCHING: (state, fetchState) => { state.fetching = fetchState },
}