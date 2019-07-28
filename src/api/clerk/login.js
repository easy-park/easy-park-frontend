import { request } from '@/util/request'

function login (body) {
  return request({
    url: 'parkingBoys',
    method: 'POST',
    body
  })
}

export {
  login
}
