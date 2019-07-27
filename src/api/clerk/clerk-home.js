import { request } from '@/util/request'

function loadAvailableOrders () {
  return request({
    url: 'parkingOrders',
    method: 'GET',
    params: { status: 1 }
  })
}

function loadHistoryOrders () {
  return request({
    url: 'parkingOrders',
    method: 'GET',
    params: { status: 6 }
  })
}

export {
  loadAvailableOrders,
  loadHistoryOrders
}
