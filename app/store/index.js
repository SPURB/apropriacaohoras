import Fase from '@/services/api-fase'
import Projeto from '@/services/api-projeto'
import Subatividade from '@/services/api-subatividade'

export const state = () => ({
  dataSelects: [],
  registro: {
    dataRefInicio: null,
    dataRefFim: null,
    id: null,
    horas: 0,
    extras: 0,
    projeto: null,
    fase: null,
    subatividade: null,
    descricao: null
  }
})

export const actions = {
  async addData ({ commit }) {
    const payload = []
    try {
      await Promise.all([Fase.get(), Projeto.get(), Subatividade.get()]).then(
        values => {
          values.map(res => {
            payload.push(res.data)
          })
        }
      )
      commit('setSelects', payload)
    } catch (error) {
      alert('Ocorreu algum erro! Tente mais tarde.')
    }
  },
  toggleBar ({ commit }, bool) {
    if (bool) {
      commit('hoursInc')
    } else {
      commit('hoursDec')
    }
  },
  setValueOption ({ commit }, payload) {
    commit('setValueOption', payload)
  },
  setDescricao ({ commit }, payload) {
    commit('setDescricao', payload)
  }
}

export const getters = {
  dataSelects (state) {
    return state.dataSelects
  }
}

export const mutations = {
  setSelects (state, payload) {
    state.dataSelects = payload
  },
  setValueOption (state, payload) {
    switch (payload.title) {
      case 'Fase':
        state.registro.fase = payload.value
        break
      case 'Projeto':
        state.registro.projeto = payload.value
        break
      case 'Subatividade':
        state.registro.subatividade = payload.value
        break
      default:
        break
    }
  },
  setDescricao (state, payload) {
    state.registro.descricao = payload
  },
  hoursInc (state) {
    state.registro.horas = state.registro.horas + 1
    if (state.registro.horas > 8) {
      state.registro.extras = state.registro.extras + 1
    }
  },
  hoursDec (state) {
    state.registro.horas = state.registro.horas - 1
    state.registro.extras = state.registro.extras - 1
    if (state.registro.horas <= 8) {
      state.registro.extras = 0
    }
  }
}
