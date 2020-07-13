import Projetos from '@/services/api-projeto'
import Grupos from '@/services/api-grupo'
import Fases from '@/services/api-fase'
import Horas from '@/services/api-horas'

export const state = () => ({
  horasProjetosUsuario: [],
  projetosUsuario: [],
  gruposUsuario: [],
  fasesUsuario: [],
  horas: [],
  contentForPdf: [],
  fetching: false,
  error: false,
  err: ''
})

function promiseAllTable (commit, { promises, table }) {
  Promise.all(promises)
    .then(res => {
      const datas = res.map(({ data }) => data)
      commit('SET', { data: datas, key: table })
    })
    .catch(err => {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    })
    .finally(() => commit('SET', { data: false, key: 'fetching' }))
}

export const actions = {
  getHorasProjetos: async ({ commit }, { ids, today, user }) => {
    if (!ids || !ids.length) return
    const where = user ? `?usuario=${user}` : ''
    const key = user ? 'horasProjetosUsuario' : 'horasProjetosTotais'

    commit('SET', { data: true, key: 'fetching' })

    try {
      const { data } = await Projetos.get(
        `/[${ids.toString()}]/acoes/agrupar-horas/2000-01-01/${today}${where}`
      )
      commit('SET', { data, key })
      commit('SET', { data: false, key: 'error' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getProjetosUsuario: ({ commit }, { ids }) => {
    if (!ids || !ids.length) return
    commit('SET', { data: true, key: 'fetching' })
    const projetos = ids.map(id => Projetos.get(`/${id}`))
    promiseAllTable(commit, { promises: projetos, table: 'projetosUsuario' })
  },
  getGruposUsuario: ({ commit }, { ids }) => {
    if (!ids || !ids.length) return
    commit('SET', { data: true, key: 'fetching' })
    const grupos = ids.map(id => Grupos.get(`/${id}`))
    promiseAllTable(commit, { promises: grupos, table: 'gruposUsuario' })
  },
  getFasesUsuario: ({ commit }, { ids }) => {
    if (!ids || !ids.length) return
    commit('SET', { data: true, key: 'fetching' })
    const grupos = ids.map(id => Fases.get(`?grupo=${id}`))
    promiseAllTable(commit, { promises: grupos, table: 'fasesUsuario' })
  },
  getHoras: ({ commit }, { ids }) => {
    if (!ids || !ids.length) return
    commit('SET', { data: true, key: 'fetching' })
    const horas = ids.map(id => Horas.get(`?projeto=${id}`))
    promiseAllTable(commit, { promises: horas, table: 'horas' })
  },
  setContentForPdf: ({ commit }, payload) => {
    commit('SET', { data: payload, key: 'contentForPdf' })
  },
  reset: ({ commit }) => commit('RESET')
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  },
  RESET: state => {
    state.horasProjetosUsuario = []
    state.fetching = false
  }
}
