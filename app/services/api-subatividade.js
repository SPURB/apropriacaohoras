import { http } from './http'

export default {
  get: (fase) => {
    return http.get('/subatividades', {
      params: {
        fase
      }
    })
  }
}
