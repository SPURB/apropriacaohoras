import { http } from './http'

export default {
  get: fase => {
    return http.get('/subatividades', {
      params: {
        fase
      }
    })
  },
  getQueries: (query = '') => {
    return http.get(`/subatividades${query}`)
  },
  post: (data, token) => {
    return http.post('/subatividades', data, {
      headers: {
        authorization: token
      }
    })
  },
  put: (data, id, token) => {
    return http.put(`/subatividades/${id}`, data, {
      headers: {
        authorization: token
      }
    })
  }
}
