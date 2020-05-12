import Fases from '@/services/api-fase'
import Subatividades from  '@/services/api-subatividade'
export const state = () => ({
	fetching: false,
	error: false,
	message: '',
	fases: [],
	subatividades: []
})

export const getters = {
	fases: (state, getters, rootState) => {
		const fetchedTables = rootState['form-registrar-horas'].dataSelects

		if (fetchedTables.length) {
			return fetchedTables.find(select => select.title === 'Fases')
		}
		else {
			return state.fases
		}
	}
}

export const actions = {
	getFases: ({ commit }) => {
		commit('IS_FETCHING', true)
		Fases.get()
			.then(({ data }) => {
				commit('SET', { data, stateKey: 'fases' })
				commit('SET_ERROR', { status: false, message: '' })
			})
			.catch(({ message }) => {
				commit('SET_ERROR', { status: true, message })
			})
			.finally(() => commit('IS_FETCHING', false))
	},
	getSubatividades: ({ commit }, idFase) => {
		commit('IS_FETCHING', true)
		Subatividades.get(idFase)
			.then(({ data }) => {
				commit('SET', { data, stateKey: 'subatividades' })
				commit('SET_ERROR', false)
			})
			.catch(({ message }) => {
				commit('SET_ERROR', { status: true, message })
			})
			.finally(() => commit('IS_FETCHING', false))
	}
}

export const mutations = {
	SET: (state, { data, stateKey }) => { state[stateKey] = data.values },
	SET_ERROR: (state, { status, message })=> {
		state.error = status
		state.message = message
	},
	IS_FETCHING: (state, fetchState) => { state.fetching = fetchState }
}
