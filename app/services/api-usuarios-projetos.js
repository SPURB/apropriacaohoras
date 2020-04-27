import { http } from './http'

export default {
  get: id => {
    return http.get(`/usuarios-projetos?usuario=${id}`)
  }
}
