import { request } from '@/util/request'
import { FETCHING, COMPLETED } from '@/api/clerk/order-status'

function loadUnfinishedOrders () {
  return request({
    url: 'parking_orders_customer',
    method: 'GET'
  })
}

function fetchCar (id) {
  return request({
    url: `parkingOrders/${id}`,
    method: 'PUT',
    params: { status: FETCHING }
  })
}

function finishOrder (id) {
  return request({
    url: `parkingOrders/${id}`,
    method: 'PUT',
    params: { status: COMPLETED }
  })
}

function parkCar (carNumber) {
  return request({
    url: 'parkingOrders',
    method: 'POST',
    params: { carNumber: carNumber }
  })
}

export {
  loadUnfinishedOrders,
  fetchCar,
  parkCar,
  finishOrder
}