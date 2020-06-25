import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/grupos${query}`)
  },
  post: (data, token) => {
    return http.post('/grupos', data, {
      headers: {
        'authorization': token
      }
    })
  },
  put: (data, id, token) => {
    return http.put(`/grupos/${id}`, data, {
			headers: {
				'authorization': token
			}
		})
  }
}
