import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://apropriacaohoras.herokuapp.com'
})
