import { request } from '@/util/request'

function loadUnfinishOrders () {
  return request({
    url: 'parkingOrders',
    method: 'GET'
  })
}

function fetchCar (order) {
  return request({
    url: 'parkingOrders',
    method: 'PUT',
    data: { id: order.id }
  })
}

function parkCar (carNumber) {
  return request({
    url: 'parkingOrders',
    method: 'POST',
    data: { carNumber: carNumber }
  })
}

export {
  loadUnfinishOrders,
  fetchCar,
  parkCar
}
