import { request } from '@/util/request'
import { PLACED, COMPLETED, FETCHED } from './order-status'

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

function loadUnfinishedOrders () {
  return request({
    url: 'parkingOrders',
    method: 'GET'
  })
}

function fetchCar (id) {
  return request({
    url: `parkingOrders/${id}`,
    method: 'PUT',
    params: { status: FETCHED }
  })
}

function setParkingBoyToOrder (order) {
  return request({
    url: 'parkingOrders',
    method: 'PUT',
    data: { id: order.id }
  })
}

export {
  loadAvailableOrders,
  loadHistoryOrders,
  loadUnfinishedOrders,
  fetchCar,
  setParkingBoyToOrder
}
