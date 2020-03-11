import Fase from '@/services/api-fase'
import Projeto from '@/services/api-projeto'
import Subatividade from '@/services/api-subatividade'
import Horas from '@/services/api-horas'

export const state = () => ({
  dataSelects: [],
  horas: {
    dataRefInicio: null,
    id: 1, // id fixo mudar para quando for consumir api
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
  async postForm ({ state }) {
    await Horas.post(state.horas)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        alert('Ocorreu algum erro! Tente mais tarde')
      })
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
  },
  setData ({ commit }, payload) {
    commit('setData', payload)
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
        state.horas.fase = payload.value
        break
      case 'Projeto':
        state.horas.projeto = payload.value
        break
      case 'Subatividade':
        state.horas.subatividade = payload.value
        break
      default:
        break
    }
  },
  setDescricao (state, payload) {
    state.horas.descricao = payload
  },
  setData (state, payload) {
    let newPayload = `${payload.year}-${payload.month}-${payload.day} ${payload.hms}`
    state.horas.dataRefInicio = newPayload
  },
  hoursInc (state) {
    state.horas.horas = state.horas.horas + 1
    if (state.horas.horas > 8) {
      state.horas.extras = state.horas.extras + 1
    }
  },
  hoursDec (state) {
    state.horas.horas = state.horas.horas - 1
    state.horas.extras = state.horas.extras - 1
    if (state.horas.horas <= 8) {
      state.horas.extras = 0
    }
  }
}
