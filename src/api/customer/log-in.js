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

function logOut () {
  Cookies.remove('token')
  if (Cookies.get('token') === undefined) {
    return true
  }
  return false
}

function getUserInfo () {
  return request({
    url: 'customer/userInfo',
    method: 'GET'
  })
}

export {
  logIn,
  logOut,
  getUserInfo
}
