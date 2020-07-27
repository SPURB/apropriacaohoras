import Projetos from '@/services/api-projeto'
import Usuarios from '@/services/api-usuario'
import UsuariosProjetos from '@/services/api-usuarios-projetos'
import Fases from '@/services/api-fase'
import Horas from '@/services/api-horas'
import Subatividades from '@/services/api-subatividade'
import Grupos from '@/services/api-grupo'

export const state = () => ({
  fases: [], // lista de fases
  projetos: [], // lista de projetos
  grupos: [],
  usuarios: [], // lista de todos os usuários
  usuariosProjetos: [], // lista de usuarios registrados nos projetos
  usuariosIndividual: [], // lista de horas por fase e total separado por usuarios no projeto
  joinArrays: [], // junta os arrays pdfContent, horasFases, horasUsuarios,
  horasFase: [], // é o total de horas por fase/projeto
  horasUsuarios: [], // horas de usuarios por projeto
  pdfContent: [], // dados gerais do projeto
  fetching: false,
  error: false,
  err: ''
})

const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const arrayIntersect = (obj1, obj2, obj3) => {
  var arr_join = [],
    arr = obj1.values.map((res, i) => {
      arr_join.push({ ind: obj1.ind, values: res })
      if (obj2.values[i]) {
        arr_join.push({ ind: obj2.ind, values: obj2.values[i] })
      }
      if (obj3.values[i]) {
        arr_join.push({ ind: obj3.ind, values: obj3.values[i] })
      }

      return arr_join
    })
  return arr[0]
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
        const nomeProjeto = projeto.nome
        const equipe = agrupado[projeto.id].map(agUsuario => {
          return state.usuarios.filter(
            usuario => agUsuario.usuario === usuario.id
          )[0]
        })

        return {
          projeto: projeto.id,
          grupo: projeto.grupo,
          nomeProjeto,
          equipe
        }
      })

      for (const item of objs) {
        const horas = await Horas.get(`?projeto=${item.projeto}`)
        const fases = await Fases.get(`?grupo=${item.grupo}`)

        item.fases = fases.data.values
        item.horas = horas.data.values
      }

      objs = objs.map(obj => {
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
      // remove projetos que horas não existem.
      objs = objs.filter(p => p.horas.length > 0)

      commit('SET', { data: objs, key: 'pdfContent' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  usuariosBySubatividades: async ({ commit, state }) => {
    commit('SET', { data: true, key: 'fetching' })
    let usuariosProjetos = state.pdfContent
    try {
      // pega as subatividades pela fase
      for (const item of usuariosProjetos) {
        let fases = item.fases

        for (const fase of fases) {
          const { data } = await Subatividades.get(fase.idfase)
          fase.subatividades = data.values
        }
      }

      // pegando horas por subatividade
      const data = usuariosProjetos.map(obj => {
        const fases = obj.fases.map(fase => {
          const subatividades = fase.subatividades.map(s => {
            let totalHoras = 0
            let horas = obj.horas.filter(hora => hora.subatividade === s.id)

            horas.map(hora => {
              totalHoras = totalHoras + hora.horas + hora.extras
            })

            return {
              nome: s.nome,
              totalHoras
            }
          })

          return {
            nome: fase.nome,
            totalRows: subatividades.length + 1,
            subatividades
          }
        })

        return {
          nomeProjeto: obj.nomeProjeto,
          totalHoras: obj.totalHoras,
          fases
        }
      })
      commit('SET', { data, key: 'horasFase' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  usuariosHoras: ({ commit, state }) => {
    commit('SET', { data: true, key: 'fetching' })
    const usuariosProjetos = state.pdfContent
    const usuarios = state.usuarios

    try {
      const data = usuariosProjetos.map(obj => {
        const equipe = usuarios.map(usuario => {
          let horas = obj.horas.filter(hora => hora.usuario === usuario.id)
          let totalHoras = horas.reduce(
            (acc, { horas, extras }) => (acc += horas + extras),
            0
          )

          return {
            id: usuario.id,
            nome: usuario.nome,
            totalHoras
          }
        })

        return {
          nomeProjeto: obj.nomeProjeto,
          totalHoras: obj.totalHoras,
          equipe
        }
      })
      commit('SET', { data, key: 'horasUsuarios' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  usuariosIndividual: async ({ commit, state }) => {
    commit('SET', { data: true, key: 'fetching' })
    const usuariosProjetos = state.pdfContent

    try {
      const grupos = await Grupos.get()

      const data = usuariosProjetos.map(obj => {
        const grupo = grupos.data.values.filter(grupo => grupo.id === obj.grupo)
        let totalHorasProjetoUsuario = 0

        return obj.equipe.map(membro => {
          totalHorasProjetoUsuario = obj.horas
            .filter(hora => hora.usuario === membro.id)
            .reduce((acc, { horas, extras }) => (acc += horas + extras), 0)

          const fases = obj.fases.map(fase => {
            const horasUsuario = obj.horas
              .filter(
                hora => hora.fase === fase.idfase && hora.usuario === membro.id
              )
              .reduce((acc, { horas, extras }) => (acc += horas + extras), 0)
            const horasEquipe = obj.horas
              .filter(hora => hora.fase === fase.idfase)
              .reduce((acc, { horas, extras }) => (acc += horas + extras), 0)
            return {
              nome: fase.nome,
              horasUsuario,
              horasEquipe
            }
          })
          return {
            ind: 3,
            values: {
              nomeProjeto: obj.nomeProjeto,
              nomeMembro: membro.nome,
              grupo: grupo[0].nome,
              totalHorasProjeto: obj.totalHoras,
              totalHorasProjetoUsuario,
              fases
            }
          }
        })
      })

      let newData = []
      data.map(res => res.map(r => newData.push(r))) // deixando todos os arrays em 1 nivel

      commit('SET', { data: newData, key: 'usuariosIndividual' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  joinArrays: ({ state, commit }) => {
    commit('SET', { data: true, key: 'fetching' })
    try {
      const pdfContent = {
        ind: 0,
        values: state.pdfContent
      }

      const horasFase = {
        ind: 1,
        values: state.horasFase
      }
      const horasUsuarios = {
        ind: 2,
        values: state.horasUsuarios
      }

      let data = arrayIntersect(pdfContent, horasFase, horasUsuarios)
      data = [].concat(data, state.usuariosIndividual)

      commit('SET', { data, key: 'joinArrays' })
    } catch (err) {
      commit('SET', { data: err, key: 'err' })
      commit('SET', { data: true, key: 'error' })
    }
    commit('SET', { data: false, key: 'fetching' })
  },
  RESET: ({ commit }) => commit('RESET')
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  },
  RESET: state => {
    ;(state.fases = []),
      (state.projetos = []),
      (state.usuarios = []),
      (state.usuariosProjetos = [])
    state.usuariosIndividual = []
    state.joinArrays = []
    state.horasFase = []
    state.horasUsuarios = []
    state.pdfContent = []
    state.fetching = false
    ;(state.error = false), (state.err = '')
  }
}
