import { http } from './http'

export default {
  get: () => {
    return http.get('/projetos')
	},
  post: (data, token) => {
		return http.post('/projetos', data, {
			headers: {
				'authorization': token
			}
		})
  }
}

