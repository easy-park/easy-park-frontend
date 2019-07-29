import { request } from '@/util/request'
import Cookies from 'js-cookie'

function signUp (body) {
  return request({
    url: 'customer/register',
    method: 'POST',
    data: body
  }).then(res => {
    Cookies.set('token', res.data)
    return res
  })
}

export {
  signUp
}
