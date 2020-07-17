import Projetos from '@/services/api-projeto'
import Usuarios from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'
import Fases from '@/services/api-fase'
import Horas from '@/services/api-horas'
import Lib from '@/libs'

export const state = () => ({
  fases: [],
  projetos: [],
  usuarios: [],
  usuariosProjetos: [],
  pdfContent: [],
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
  pdfContent: state => {
    return state.pdfContent.filter(p => p.horas.length > 0)
  }
}

export const actions = {
  getFases: async ({ commit }, { id }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const { data } = await Fases.get(`?grupo=${id}`)
      return data.values
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
  usuariosByProjetos: async ({ state, commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const agrupado = groupBy(state.usuariosProjetos, 'projeto')

      let objs = state.projetos.map(projeto => {
        commit('SET', { data: true, key: 'fetching' })

        const nomeProjeto = projeto.nome
        const equipe = agrupado[projeto.id].map(agUsuario => {
          return state.usuarios.filter(
            usuario => agUsuario.usuario === usuario.id
          )[0].nome
        })

        return {
          projeto: projeto.id,
          grupo: projeto.grupo,
          nomeProjeto,
          equipe
        }
      })

      for (const item of objs) {
        commit('SET', { data: true, key: 'fetching' })

        const horas = await Horas.get(`?projeto=${item.projeto}`)
        const fases = await Fases.get(`?grupo=${item.grupo}`)

        item.fases = fases.data.values
        item.horas = horas.data.values
      }

      objs = objs.map(obj => {
        commit('SET', { data: true, key: 'fetching' })

        let totalHoras = 0
        obj.horas.forEach(hora => {
          totalHoras = totalHoras + hora.horas + hora.extras
          obj.totalHoras = totalHoras
        })

        obj.fases = obj.fases.map(fase => {
          let horas = obj.horas.filter(
            horas => horas.fase === fase.id && horas.projeto === obj.projeto
          )
          let faseV = {}
          if (horas.length > 0) {
            let totalHorasFase = 0
            horas.forEach(hora => {
              totalHorasFase = totalHorasFase + hora.horas + hora.extras
              faseV = {
                idfase: fase.id,
                nome: fase.nome,
                totalHorasFase
              }
            })
          } else {
            faseV = {
              idfase: fase.id,
              nome: fase.nome,
              totalHorasFase: 0
            }
          }
          return faseV
        })
        return obj
      })
      commit('SET', { data: objs, key: 'pdfContent' })
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
