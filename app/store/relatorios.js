import Projetos from '@/services/api-projeto'
import Horas from '@/services/api-horas'
import Usuarios from '@/services/api-usuario'
import Fases from '@/services/api-fase'
import Subatividades from '@/services/api-subatividade'
import Acoes from '@/services/api-acoes'

import moment from 'moment'

export const state = () => ({
  projetos: [],
  horasUsuario: [],
  horasProjeto: [],
  horasUsuariosByProjetos: [],
  fetching: false,
  error: false,
  errorStatus: 0,
  errorMessage: ''
})

export const getters = {
  projetosMap: (state) => {
    if (state.projetos.length) {
      let mapped = {}
      state.projetos.forEach(projeto => mapped[projeto.id] = projeto.nome)

      return mapped
    }
    return {}
  },
  projetosCardMap: (state, getters, rootState) => {
    const ready = state.horasUsuario.length ||
      state.projetos.length ||
      rootState.usuario.projetos.length ||
      state.horasProjeto.length

    if (!ready) return []

    return state.horasProjeto
      .map((horas, index) => {
        const minhasHoras = state.horasUsuario
          .filter(hora => hora.projeto === horas.idProjeto)
          .map(hora => hora.horas + hora.extras)
          .reduce((horaTotal, hora) => horaTotal + hora, 0)

        horas.id = index + 1
        horas.minhasHoras = minhasHoras
        horas.nome = getters.projetosMap[horas.idProjeto]
        horas.desdeInicio = horas.total
        return horas
      })
      .sort((a, b) => b.desdeInicio - a.desdeInicio)
  }
}

export const actions = {
  getRelatorios: ({ commit, rootState }) => {
    commit('SET', { key: 'fetching', data: true })
    Promise.all([
      Projetos.get(),
      Horas.get(`?usuario=${rootState.usuario.id}`)
    ])
      .then(responses => {
        const projetos = responses[0].data.values
        const horas = responses[1].data.values
        commit('SET', { key: 'projetos', data: projetos })
        commit('SET', { key: 'horasUsuario', data: horas })
      })
      .catch(err => {
        commit('SET', { key: 'error', data: true })
        if (err.response && err.message) {
          commit('SET', { key: 'errorStatus', data: err.response.status })
          commit('SET', { key: 'errorMessage', data: err.message })
        }
      })
      .finally(() => commit('SET', { key: 'fetching', data: false }))
  },
  getHorasProjeto: ({ commit, rootState }) => {
    if (!rootState.usuario.projetos.length) return

    const inicio = moment().startOf("month").format("YYYY-MM-DD")
    const fim = moment().endOf("month").format("YYYY-MM-DD")

    commit('SET', { key: 'fetching', data: true })
    const projetos = rootState.usuario.projetos

    Acoes.agruparHoras(projetos, inicio, fim)
      .then((totais => {
        const data = totais.data.map(res => {
          return {
            horas: res.horas,
            extras: res.extras,
            total: res.total,
            idProjeto: res.idProjeto,
            ultimoMes: res.totalPeriodo != null ? res.totalPeriodo : 0
          }
        })
        commit('SET', { key: 'horasProjeto', data })
      }))
      .catch(err => {
        console.log(err)
        commit('SET', { key: 'error', data: true })
        if (err.response && err.message) {
          commit('SET', { key: 'errorStatus', data: err.response.status })
          commit('SET', { key: 'errorMessage', data: err.message })
        }
      })
      .finally(() => commit('SET', { key: 'fetching', data: false }))
  },
  getRelatorioDetalhado: ({ commit, rootState }) => {
    let url
    rootState['form-registrar-horas'].horas.projeto !== null ? 
    url = `?projeto=${rootState['form-registrar-horas'].horas.projeto}` :
    url = ''
    Promise.all([
      Usuarios.get(),
      Fases.get(),
      Subatividades.get(),
      Horas.get(url)
    ]).then(responses => {
      const usuarios = responses[0].data.data
      const fases = responses[1].data.values
      const subatividades = responses[2].data.values
      const horas = responses[3].data.values

      let data = []
      horas.forEach(hora => {

         let usuario = {
          nome: usuarios.find(usuario => usuario.id === hora.usuario).nome,
          registros: hora.horas + hora.extras,
          subatividade: subatividades.find(subatividade => subatividade.id === hora.subatividade).nome,
          fase: fases.find(fase => fase.id === hora.fase).nome
        }        
        data.push(usuario)
      })
      commit('SET', { data, key: 'horasUsuariosByProjetos' })
    })
  },
  orderBy: ({ commit }, payload) => {
    commit('ORDER_BY', payload)
  }
}

export const mutations = {
  ORDER_BY: (state, payload) => {
    state.horasUsuariosByProjetos = state.horasUsuariosByProjetos
                                    .sort((a, b) => (a.payload > b.payload) ? 1 : -1)
  },
  SET: (state, { data, key }) => { state[key] = data },
  RESET: (state) => {
    state.projetos = []
    state.horasUsuario = [],
    state.horasUsuariosByProjetos = []
    state.fetching = false
    state.error = false
    state.errorStatus = 0
    state.errorMessage =''
  }
}