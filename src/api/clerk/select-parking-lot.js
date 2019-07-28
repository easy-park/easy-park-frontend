import { request } from '@/util/request'
import { PARKED } from './order-status'

function loadClerkParkingLots () {
  return request({
    url: 'parkingLots',
    method: 'GET'
  })
}

function receiptOrder (params) {
  return request({
    url: 'parkingLots',
    method: 'GET',
    params
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
  })
}

export {
  loadClerkParkingLots,
  receiptOrder,
  loadOrder,
  parkedCar
}
