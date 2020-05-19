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
  }
}
