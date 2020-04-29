import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/horas${query}`)
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
