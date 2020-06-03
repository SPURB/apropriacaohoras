import Projetos from '@/services/api-projeto'
import Horas from '@/services/api-horas'
import Usuarios from '@/services/api-usuario'
import Fases from '@/services/api-fase'
import Subatividades from '@/services/api-subatividade'

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

    Promise.all(projetos.map(id => Projetos.get(`/${id}/acoes/agrupar-horas/${inicio}/${fim}`)))
      .then((totais => {
        const data = totais.map(res => {
          return {
            horas: res.data.horas,
            extras: res.data.extras,
            total: res.data.total,
            idProjeto: res.data.idProjeto,
            ultimoMes: res.data.totalPeriodo
          }
        })

        commit('SET', { key: 'horasProjeto', data })
      }))
      .catch(err => {
        commit('SET', { key: 'error', data: true })
        if (err.response && err.message) {
          commit('SET', { key: 'errorStatus', data: err.response.status })
          commit('SET', { key: 'errorMessage', data: err.message })
        }
      })
      .finally(() => commit('SET', { key: 'fetching', data: false }))
  },
  getRelatorioDetalhado: ({ commit, rootState }) => {
    let projeto
    rootState['form-registrar-horas'].horas.projeto !== null ? 
    projeto = rootState['form-registrar-horas'].horas.projeto :
    projeto = 1
    Promise.all([
      Usuarios.get(),
      Fases.get(),
      Subatividades.get(),
      Horas.get(`?projeto=${projeto}`)
    ]).then(responses => {
      const usuarios = responses[0].data.data
      const fases = responses[1].data.values
      const subatividades = responses[2].data.values
      const horas = responses[3].data.values

      let mappedValues = []
      horas.forEach(hora => {

         let usuario = {
          nome: usuarios.find(usuario => usuario.id === hora.usuario).nome,
          registros: hora.horas + hora.extras,
          subatividade: subatividades.find(subatividade => subatividade.id === hora.subatividade).nome,
          fase: fases.find(fase => fase.id === hora.fase).nome
        }        
        mappedValues.push(usuario)
      })
      commit('SET', { key: 'horasUsuariosByProjetos', mappedValues })
    })
  }
}

export const mutations = {
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