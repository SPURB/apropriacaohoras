import { http } from './http'

export default {
  get: (query = '') => {
    return http.get(`/usuarios-projetos${query}`)
	},
	delete: (id, token) => http.delete(`/usuarios-projetos/${id}`, {
		headers: {
			authorization: token
		}
	}),
	post: (body, token) => http.post(`/usuarios-projetos`, body, {
		headers: {
			authorization: token
		}
	})
}
