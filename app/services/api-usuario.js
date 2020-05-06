import { http } from './http'

export default {
  post: (body) => http.post('/usuarios/login', body),
  get: (id) => http.put('/usuarios/', {
    params: {
      id
    }
  })
}
