import axios from 'axios'
import { message } from 'ant-design-vue'
import Cookies from 'js-cookie'

const STATUS_SUCCESS = 200

const instance = axios.create({
  baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ` + Cookies.get('token')
  }
})

function request (options) {
  return instance(options)
    .then(res => {
      const data = res.data
      if (data.status === STATUS_SUCCESS) {
        console.log(data)
        return data
      }
      return Promise.reject(data)
    })
    .catch(err => {
      if (!err.status) {
        message.error('网络错误')
      }
      return Promise.reject(err)
    })
}

export {
  instance as axios,
  request
}
