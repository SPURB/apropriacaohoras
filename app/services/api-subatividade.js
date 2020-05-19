import { http } from './http'

export default {
  get: (fase) => {
    return http.get('/subatividades', {
      params: {
        fase
      }
    })
	},
  post: (data, token) => {
		return http.post('/subatividades', data, {
			headers: {
				'authorization': token
			}
		})
  }
}
