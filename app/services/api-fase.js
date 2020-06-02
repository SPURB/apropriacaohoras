import { http } from './http'

export default {
  get: () => {
    return http.get('/fases')
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
