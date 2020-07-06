import { http } from './http'

export default {
  post: body => http.post('/usuarios/login', body),
  reset: (body, id, token) =>
    http.put(`/usuarios/${id}`, body, {
      headers: {
        Authorization: token
      }
    }),
  get: () => http.get('/usuarios'),
  logout: token =>
    http.delete('/usuarios/logout', {
      headers: {
        Authorization: token
      }
    }),
  create: (body, token) =>
    http.post('/usuarios', body, {
      headers: {
        Authorization: token
      }
    }),
  put: (body, id, token) =>
    http.put(`/usuarios/${id}`, body, {
      headers: {
        Authorization: token
      }
    })
}
