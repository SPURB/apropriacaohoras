import { http } from './http'

export default {
  post: (body) => http.post('/usuarios/login', body),
  reset: (body, id, token) => http.put(`/usuarios/${id}`, body, {
    headers: {
      Authorization: token
    }
  }),
	get: () => http.get('/usuarios')
}
