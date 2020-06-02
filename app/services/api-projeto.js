import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/projetos${query}`)
	},
  post: (data, token) => {
		return http.post('/projetos', data, {
			headers: {
				'authorization': token
			}
		})
  },
  put: (data, id, token) => {
    return http.put(`/projetos/${id}`, data, {
			headers: {
				'authorization': token
			}
		})
  }
}

