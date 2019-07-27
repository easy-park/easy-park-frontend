import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:80/parking/',
  headers: {
    ContentType: 'application/json'
  }
})

export {
  instance as request
}
