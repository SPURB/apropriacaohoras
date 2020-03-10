import { http } from './http'

export default {
  get: () => {
    return http.get('/projetos')
  }
}
