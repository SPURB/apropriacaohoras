import { http } from './http'

export default {
  get: () => {
    return http.get('/horas')
  },
  post: horas => {
    return http.post('/horas', horas)
  }
}
