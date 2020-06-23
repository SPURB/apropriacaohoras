import { http } from './http'

export default {
  agruparHoras: (id, dataInicio, dataFim, query = '') => {
    return http.get(`/projetos/${id}/acoes/agrupar-horas/${dataInicio}/${dataFim}?${query}`)
  }
}

