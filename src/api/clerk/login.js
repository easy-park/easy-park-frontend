import { request } from '@/util/request'
import Cookies from 'js-cookie'

const LOGIN_SUCCESS = '登录成功'

function login(body) {
  let login = JSON.stringify(body)
  console.log(login)
  console.log(body)
  return request({
    url: 'parkingBoys',
    method: 'POST',
    data: body
  }).then(res => {
    if (res.status === 200 && res.msg === LOGIN_SUCCESS) {
      Cookies.set('token', res.data)
    }
    return res
  })
}

export {
  login
}
