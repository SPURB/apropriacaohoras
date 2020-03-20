import { http } from './http'

export default {
  get: () => {
    return http.get('/horas')
  },
  getStatus: data => {
    return http.get('/horas/status', data)
  },
  post: horas => {
    return http.post('/horas', horas)
  }
}
