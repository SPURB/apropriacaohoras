import { http } from './http'

export default {
  get: () => {
    return http.get('/horas')
  },
  getStatus: (id, data) => {
    return http.get(`/horas/status/${id}/${data}`)
  },
  post: horas => {
    return http.post('/horas', horas)
  }
}
