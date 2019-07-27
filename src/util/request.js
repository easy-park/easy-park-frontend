import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://47.92.227.24/parking/',
  headers: {
    ContentType: 'application/json'
  }
})

export {
  instance as request
}
