import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/fases${query}`)
  },
  post: (data, token) => {
		return http.post('/fases', data, {
			headers: {
				'authorization': token
			}
		})
  },
  put: (data, id, token) => {
    return http.put(`/fases/${id}`, data, {
			headers: {
				'authorization': token
			}
		})
  }
}
