import Subatividade from '@/services/api-subatividade'
import { promiseAllTable } from '@/libs/helpers'

export const state = () => ({
  subatividades: [],
  fetching: false,
  error: false,
  err: ''
})

export const getters = {
  subatividadesFlat: state => {
    if (!state.subatividades.length) return []
    return state.subatividades.map(({ values }) => values).flat()
  },
  fasesPaginadas: (state, getters, rootState, rootGetters) => {
    const fasesComHoras =
      rootGetters['admin/pre-impressao/section1/fasesComHoras']
    const subatividadesFlat = getters['subatividadesFlat']
    const horas = rootState.admin['pre-impressao'].section1.horas

    if (!fasesComHoras.length || !subatividadesFlat.length || !horas.length)
      return 0
    let paginas = []
    let pagina = []

    let soma = 0
    const maxSoma = 18 // máximo de linhas de cada página

    fasesComHoras
      .map(({ nome, id, totalHorasFase }) => {
        const subatividades = subatividadesFlat
          .filter(subatividade => subatividade.fase === id)
          .map(subatividade => {
            const horasSubatividade = horas
              .filter(hora => hora.subatividade === subatividade.id)
              .map(hora => hora.horas + hora.extras)
              .reduce((a, ac) => a + ac, 0)

            return {
              nome: subatividade.nome,
              horas: horasSubatividade
            }
          })

        return {
          nome,
          id,
          totalHorasFase,
          subatividades
        }
      })
      .forEach((item, index, array) => {
        const len = item.subatividades.length
        const currentSoma = len + soma

        if (currentSoma <= maxSoma) {
          pagina.push(item)
          soma = currentSoma
        } else {
          paginas.push(pagina)
          pagina = []
          pagina.push(item)
          soma = len
        }

        if (index === array.length - 1) {
          paginas.push(pagina)
        }
      })

    return paginas
  },
  totalPages: (state, getters) => {
    return getters['fasesPaginadas'].length + 2
  }
}

export const actions = {
  getSubatividades: ({ commit }, fases) => {
    commit('SET', { data: true, key: 'fetching' })
    const promises = fases.map(({ id }) =>
      Subatividade.getQueries(`?fase=${id}`)
    )
    promiseAllTable(commit, { promises, table: 'subatividades' })
  }
}

export const mutations = {
  SET: (state, { data, key }) => {
    state[key] = data
  },
  RESET: (state, { data, key }) => {
    state.subatividades = {}
  }
}
