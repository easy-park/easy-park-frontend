import { request } from '@/util/request'
import Cookies from 'js-cookie'

function logIn (body) {
  return request({
    url: 'customer/login',
    method: 'POST',
    data: body
  }).then(res => {
    Cookies.set('token', res.data)
    return res
  })
}

export {
  logIn
}
