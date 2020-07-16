import Projetos from '@/services/api-projeto'
import Usuarios from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'
import Fases from '@/services/api-fase'
import Lib from '@/libs'

export const state = () => ({
  fases: [],
  projetos: [],
  usuarios: [],
  usuariosProjetos: [],
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
const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const getters = {
  usuariosByProjetos: state => {
    const agrupado = groupBy(state.usuariosProjetos, 'projeto')

    return state.projetos.map(projeto => {
      const nomeProjeto = projeto.nome
      const equipe = agrupado[projeto.id].map(agUsuario => {
        return state.usuarios.filter(
          usuario => agUsuario.usuario === usuario.id
        )[0].nome
      })
      return {
        nomeProjeto,
        equipe
      }
    })
  }
}

export const actions = {
  getFases: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Fases.get()
      commit('SET', { data: data.values, key: 'fases' })
      commit('SET', { data: false, key: 'error' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getProjetos: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Projetos.get()
      commit('SET', { data: data.values, key: 'projetos' })
      commit('SET', { data: false, key: 'error' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getUsuarios: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Usuarios.get()
      commit('SET', { data: data.data, key: 'usuarios' })
      commit('SET', { data: false, key: 'error' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  getUsuariosProjetos: async ({ commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await UsuariosProjetos.get()
      commit('SET', { data: data.values, key: 'usuariosProjetos' })
      commit('SET', { data: false, key: 'error' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
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
