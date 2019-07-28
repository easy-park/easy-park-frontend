import axios from 'axios'
import { message } from 'ant-design-vue'

const STATUS_SUCCESS = 200

const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
  headers: {
    ContentType: 'application/json'
  }
})

function request (options) {
  return instance(options)
    .then(res => {
      const data = res.data
      if (data.status === STATUS_SUCCESS) {
        return data
      }
      return Promise.reject(data)
    })
    .catch(err => {
      message.error('网络错误')
      return err
    })
}

export {
  instance as axios,
  request
}
