import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    ContentType: 'application/json'
  }
})

export {
  instance as request
}