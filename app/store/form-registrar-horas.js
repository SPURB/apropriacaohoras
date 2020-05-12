import Fase from '@/services/api-fase'
import Projeto from '@/services/api-projeto'
import Subatividade from '@/services/api-subatividade'

import Lib from '@/libs'

export const state = () => ({
  updateCalendario: false,
  reset: false, // variavel para resetar
  dataSelects: [],
  multipleData: [],
  validateForm: {
    msg: [],
    disabled: false
  },
  horas: {
    horas: null,
    extras: 0,
    projeto: null,
    fase: null,
    subatividade: null,
    descricao: ''
  }
})

export const actions = {
  async addData ({ commit, state }) {
    let fase = ''
    if (state.horas.fase !== null) fase = state.horas.fase

		Promise.all([Fase.get(), Projeto.get(), Subatividade.get(fase)])
			.then(values => commit('setSelects', values.map(res => res.data)))
			.catch(err => {
				alert('Ocorreu algum erro! Tente mais tarde.')
				new Error(err)
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
  setMultipleData ({ commit }, payload) {
    commit('setMultipleData', payload)
  },
  RESET ({ commit }, payload) {
    commit('RESET', payload)
  }
}

export const getters = {
	projetos: (state, getters, rootState) => {// projetos válidos para este usuário
		if (state.dataSelects.length) {
			const allProjetos = state.dataSelects.find(select => select.title === 'Projetos').values
			return rootState.usuario.projetos.map(id => allProjetos.find(projeto => projeto.id === id))
		}
		else return []
  },
  isReset (state) {
    return state.reset
  }
}

export const mutations = {
  setSelects (state, payload) {
    state.dataSelects = payload
  },
  setValueOption (state, payload) {
		switch (payload.title) {
      case 'Fases':
        state.horas.fase = payload.value
        break
      case 'Projetos':
        state.horas.projeto = payload.value
        break
      case 'Subatividades':
        state.horas.subatividade = payload.value
        break
      default:
        break
    }
  },
  setDescricao (state, payload) {
    state.horas.descricao = payload
  },
  setMultipleData (state, payload) {
    let eTarget = payload.event
    let data = payload.date

    const isWeekend = Lib.isWeekend(data)
    const sDate = Lib.splitDate(data)
    const currentDate = Lib.currentDate()

    // verifica se é final de semana
		if ((sDate.sDay > currentDate.cDay && isWeekend === false) || isWeekend === true) {
			state.validateForm = { msg: [], disabled: false } // zera o state para um vazio
      state.validateForm.msg.push('Data informada inválida')
      state.validateForm.disabled = true

    } else {
      if (eTarget.target.classList.contains('selected')) {
        eTarget.target.classList.remove('selected')
        state.multipleData = state.multipleData.filter(item => item !== data)
      } else {
        eTarget.target.classList.add('selected')
        state.multipleData.push(data)
      }
    }
  },
  hoursInc (state) {
    state.horas.horas = state.horas.horas + 1
    if (state.horas.horas > 8) {
      state.horas.horas = 8 // força o state para 8
      state.horas.extras = state.horas.extras + 1
    }
  },
  hoursDec (state) {
    if (state.horas.extras > 0) {
      state.horas.extras = state.horas.extras - 1
    } else {
      state.horas.horas = state.horas.horas - 1
    }
  },
  setValidationForm (state) {
    let array = []
    state.validateForm = { msg: [], disabled: false }
         
    // valida o objeto horas :: sem dataRefInicio
    Object.keys(state.horas).map(key => {
      const value = state.horas[key]
      if (value == null && key !== 'extras' && key !== 'descricao') {
        array.push(key)
      }
    })

    // valida o multipleData :: dataRefInicio
    if (state.multipleData.length == 0) {
      array.push('dataRefInicio')
    }

    array.forEach(element => {
      switch (element) {
        case 'dataRefInicio':
          state.validateForm.msg.push('Selecione datas no calendário')
          state.validateForm.disabled = true
          break
        case 'horas':
          state.validateForm.msg.push('Determine um número de horas')
          state.validateForm.disabled = true
          break
        case 'fase':
          state.validateForm.msg.push('Selecione a fase da tarefa realizada')
          state.validateForm.disabled = true
          break
        case 'projeto':
          state.validateForm.msg.push('Selecione um projeto')
          state.validateForm.disabled = true
          break
        case 'subatividade':
          state.validateForm.msg.push('Selecione uma subatividade')
          state.validateForm.disabled = true
          break
      }
    })
  },
  setErroData (state, payload) {
    state.validateForm = { msg: [], disabled: false }
    state.validateForm.msg.push(payload.message)
    state.validateForm.msg.push(`Dia negado: ${payload.data}`)
    state.validateForm.disabled = true
  },  
  RESET (state, payload) {
    state.multipleData = []
    state.horas =  {
      horas: null,
      extras: 0,
      projeto: null,
      fase: null,
      subatividade: null,
      descricao: ''
    }
    state.reset = payload
  },
  RESET_CALENDARIO (state) {
    state.multipleData = []
  },
  TOGGLE_CALENDARIO_STATUS: (state, { status }) => state.updateCalendario = status
}
