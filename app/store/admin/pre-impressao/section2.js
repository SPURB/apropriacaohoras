import Subatividade from '@/services/api-subatividade'
import { promiseAllTable } from '@/libs/helpers'

export const state = () => ({
  subatividades: [],
  fetching: false,
  error: false,
  err: ''
})

export const getters = {
  subatividadesFlat: state => {
    if (!state.subatividades.length) return []
    return state.subatividades.map(({ values }) => values).flat()
  }
}

export const actions = {
  getSubatividades: ({ commit }, fases) => {
    commit('SET', { data: true, key: 'fetching' })
    const promises = fases.map(({ id }) =>
      Subatividade.getQueries(`?fase=${id}`)
    )
    promiseAllTable(commit, { promises, table: 'subatividades' })
  }
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  },
  RESET: (state, { data, key }) => {
    state.subatividades = {}
  }
}
