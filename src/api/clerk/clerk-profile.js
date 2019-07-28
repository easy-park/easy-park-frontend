import { request } from '@/util/request'

function loadClerkProfile () {
  return request({
    url: 'parkingBoys',
    method: 'GET'
  })
}

export {
  loadClerkProfile
}
