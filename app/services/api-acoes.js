import { http } from './http'

export default {
  agruparHoras: (ids, inicio, fim, query = '') => {
    return http.get(`/projetos/[${ids}]/acoes/agrupar-horas/${inicio}/${fim}?${query}`)
  }
}

