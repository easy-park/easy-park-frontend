import { request } from '@/util/request'
import { PLACED, COMPLETED } from './order-status'

function loadAvailableOrders () {
  return request({
    url: 'parkingOrders',
    method: 'GET',
    params: { status: PLACED }
  })
}

function loadHistoryOrders () {
  return request({
    url: 'parkingOrders',
    method: 'GET',
    params: { status: COMPLETED }
  })
}

export {
  loadAvailableOrders,
  loadHistoryOrders
}
