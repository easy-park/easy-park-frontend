import { request } from '@/util/request'
import { PARKED } from './order-status'
import { sendMessage } from '@/api/customer/websocket'

function loadClerkParkingLots () {
  return request({
    url: 'parkingLots',
    method: 'GET'
  })
}

function receiptOrder (params) {
  return request({
    url: 'parkingOrders',
    method: 'GET',
    params
  }).then(res => {
    sendMessage()
    return res
  })
}

function loadOrder (id) {
  return request({
    url: `parkingOrders/${id}`,
    method: 'GET'
  })
}

function parkedCar (orderId) {
  return request({
    url: `parkingOrders/${orderId}`,
    method: 'PUT',
    params: { status: PARKED }
  }).then(res => {
    sendMessage()
    return res
  })
}

export {
  loadClerkParkingLots,
  receiptOrder,
  loadOrder,
  parkedCar
}
