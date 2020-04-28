import { http } from './http'

export default {
  get: () => {
    return http.get('/horas')
  },
  getStatus: (id, data) => {
    return http.get(`/horas/status/${id}/${data}`)
  },
  post: (data, token) => {
		return http.post('/horas', data, {
			headers: {
				'authorization': token
			}
		})
  }
}
