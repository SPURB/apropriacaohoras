import { http } from './http'

export default {
  get: () => {
    return http.get('/grupos')
  },
  post: (data, token) => {
    return http.post('/grupos', data, {
      headers: {
        'authorization': token
      }
    })
  }
}
