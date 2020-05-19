import Fases from '@/services/api-fase'
import Subatividades from  '@/services/api-subatividade'
import Projetos from '@/services/api-projeto'

export const state = () => ({
	fetching: false,
	error: false,
	success: false,
	message: '',
	fases: [],
	subatividades: []
})

export const actions = {
	getFases: ({ commit }) => {
		commit('IS_FETCHING', true)
		Fases.get()
			.then(({ data }) => {
				commit('SET', { data: data.values, stateKey: 'fases' })
				commit('SET_ERROR', { status: false, message: '' })
			})
			.catch(({ message }) => commit('SET_ERROR', { status: true, message }))
			.finally(() => commit('IS_FETCHING', false))
	},
	getSubatividades: ({ commit }, idFase) => {
		commit('IS_FETCHING', true)
		Subatividades.get(idFase)
			.then(({ data }) => {
				commit('SET', { data: data.values, stateKey: 'subatividades' })
				commit('SET_ERROR', { status: false, message: '' })
			})
			.catch(({ message }) => commit('SET_ERROR', { status: true, message }))
			.finally(() => commit('IS_FETCHING', false))
	},
	postTableItem: ({ commit, rootState }, { table, data }) => {
		const token =  rootState.usuario.token
		let request

		if (table === 'projetos') {
			request = Projetos.post({ nome: data.nome }, token)
		}
		else if (table === 'fases'){
			request = Fases.post({ nome: data.nome }, token)
		}
		else if (table === 'subatividades') {
			request = Subatividades.post({ nome: data.nome, fase: data.fase }, token)
		}

		commit('IS_FETCHING', true)
		request
			.then(res => {
				commit('SET', { data: true, stateKey: 'success' })
				commit('SET', { data: `${res.data.nome} criado`, stateKey: 'message' })
				commit('SET_ERROR', { status: false, message: '' })
			})
			.catch(({ message }) => commit('SET_ERROR', { status: true, message }))
			.finally(() => commit('IS_FETCHING', false))
	},
	reset: ({commit}) => commit('RESET')
}

export const mutations = {
	SET: (state, { data, stateKey }) => { state[stateKey] = data },
	SET_ERROR: (state, { status, message })=> {
		state.error = status
		state.message = message
	},
	IS_FETCHING: (state, fetchState) => { state.fetching = fetchState },
	RESET: (state) => {
		state.error = false
		state.fetching = false
		state.success = false,
		state.message = ''
	}
}
