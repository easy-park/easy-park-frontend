import { request } from '@/util/request'
import { PLACED, COMPLETED, FETCHED } from './order-status'
import { sendMessage } from '@/api/customer/websocket'

function loadAvailableOrders () {
  return request({
    url: 'parkingOrders',
    method: 'GET',
    params: { status: PLACED }
  })
}

function loadHistoryOrders () {
  return request({
    url: 'parkingHistoryOrders',
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
  }).then(res => {
    sendMessage()
    return res
  })
}

function setParkingBoyToOrder (order) {
  return request({
    url: 'parkingOrders',
    method: 'PUT',
    data: { id: order.id }
  }).then(res => {
    sendMessage()
    return res
  })
}

export {
  loadAvailableOrders,
  loadHistoryOrders,
  loadUnfinishedOrders,
  fetchCar,
  setParkingBoyToOrder
}
