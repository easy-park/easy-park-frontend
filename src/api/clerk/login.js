import { request } from '@/util/request'
import Cookies from 'js-cookie'
import { loadClerkProfile } from './clerk-profile'
import { store } from '@/store'

function login (body) {
  return request({
    url: 'parkingBoys',
    method: 'POST',
    data: body
  }).then(res => {
    Cookies.set('token', res.data)
    return loadClerkProfile()
  }).then(res => {
    store.commit('setUser', res.data)
    return res
  })
}

function logout () {
  Cookies.remove('token')
  if (Cookies.get('token') === undefined) {
    return true
  }
  return false
}

export {
  login,
  logout
}
