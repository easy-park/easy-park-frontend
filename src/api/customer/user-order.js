import { request } from '@/util/request'
import { FETCHING, COMPLETED } from '@/api/clerk/order-status'
import { sendMessage } from './websocket'

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
  }).then(res => {
    sendMessage()
    return res
  })
}

function finishOrder (id) {
  return request({
    url: `parkingOrders/${id}`,
    method: 'PUT',
    params: { status: COMPLETED }
  }).then(res => {
    sendMessage()
    return res
  })
}

function parkCar (carNumber) {
  return request({
    url: 'parkingOrders',
    method: 'POST',
    params: { carNumber: carNumber }
  }).then(res => {
    sendMessage()
    return res
  })
}

function loadHistoryOrders () {
  return request({
    url: 'customer/historyorder',
    method: 'GET'
  })
}

function loadCarNumbers () {
  return request({
    url: '/unrepeatcarnumbers',
    method: 'GET'
  })
}

export {
  loadUnfinishedOrders,
  fetchCar,
  parkCar,
  finishOrder,
  loadHistoryOrders,
  loadCarNumbers
}
