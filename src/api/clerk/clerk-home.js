import { request } from '@/util/request'

function loadAvailableOrder (params = { status: 1 }) {
  return request({
    url: 'parkingOrders',
    method: 'GET',
    params
  })
}

export {
  loadAvailableOrder
}
