import Fases from '@/services/api-fase'
import Projetos from '@/services/api-projeto'
import Usuarios from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'
import Horas from '@/services/api-horas'

export const state = () => ({
  projeto: '',
  grupo: 0,
  fases: [],
  usuarios: [],
  horas: [],
  fetching: false,
  error: false,
  err: ''
})

export const getters = {
  totalHoras: state => {
    if (!state.horas.length) return 0
    return state.horas
      .map(({ horas, extras }) => horas + extras)
      .reduce((a, c) => a + c, 0)
  },
  fasesComHoras: state => {
    if (!state.fases.length || !state.horas.length) return []
    return state.fases.map(({ nome, id }) => {
      const totalHorasFase = state.horas
        .filter(({ fase }) => fase === id)
        .map(({ horas, extras }) => horas + extras)
        .reduce((a, c) => a + c, 0)

      return {
        totalHorasFase,
        nome,
        id
      }
    })
  }
}

export const actions = {
  getProjetoInfo: async ({ commit }, idProjeto) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const projetoRes = await Projetos.get(`/${idProjeto}`)
      const { nome, grupo } = projetoRes.data

      const fasesRes = await Fases.get(`?grupo=${grupo}`)
      const fases = fasesRes.data.values

      commit('SET', { data: nome, key: 'projeto' })
      commit('SET', { data: grupo, key: 'grupo' })
      commit('SET', { data: fases, key: 'fases' })
    } catch (err) {
      commit('SET', { data: true, key: 'error' })
      commit('SET', { data: err, key: 'err' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getUsuarios: async ({ commit }, idProjeto) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const UsuariosProjetoRes = await UsuariosProjetos.get(
        `?projeto=${idProjeto}`
      )
      const { values } = UsuariosProjetoRes.data

      const usuariosReqs = values.map(({ usuario }) =>
        Usuarios.get(`/${usuario}`)
      )
      const usuariosRes = await Promise.all(usuariosReqs)
      const usuarios = usuariosRes.map(({ data }) => data)

      commit('SET', { data: usuarios, key: 'usuarios' })
    } catch (err) {
      commit('SET', { data: true, key: 'error' })
      commit('SET', { data: err, key: 'err' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getHoras: async ({ commit }, idProjeto) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Horas.get(`?projeto=${idProjeto}`)
      commit('SET', { data: data.values, key: 'horas' })
    } catch (err) {
      commit('SET', { data: true, key: 'error' })
      commit('SET', { data: err, key: 'err' })
    }
    commit('SET', { data: false, key: 'fetching' })
  }
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  },
  RESET: (state, { data, key }) => {
    state.fases = {}
    state.horasUsuarios = []
  }
}
