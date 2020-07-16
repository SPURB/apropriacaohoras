import { get } from 'axios'

export const state = () => ({
  doubts: []
})

export const actions = {
  fetchLocalDoubts: async ({ commit }, path) => {
    try {
      const { data } = await get(path)
      const { _data } = data._collections[0]
      const { doubts } = _data.find(item => item.slug === 'index')

      commit('SET', { data: doubts, key: 'doubts' })
    } catch (err) {
      throw new Error(err) // https://github.com/nuxt/content/issues?q=is%3Aissue+static
    }
  }
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  },
  RESET: state => {
    state.doubts = []
  }
}
