<template>
    <OrderList :btnName="mapBtnName" :orders="orders" :btnCallback = "fetchCar" :userStatus="userStatus"/>
</template>

<script>
import OrderList from '@/components/OrderList'
import { loadUnfinishOrders, fetchCar } from '@/api/user/user-order'
import { PARKED, FETCHING, FETCHED } from '@/api/clerk/order-status'

export default {
  name: 'FetchCar',
  components: { OrderList },
  data () {
    return {
      orders: [],
      userStatus: true
    }
  },
  beforeMount () {
    loadUnfinishOrders()
      .then(res => {
        this.orders = res.data
      })
  },
  methods: {
    fetchCar (order) {
      fetchCar(order).then(res => {
        // set stauts = 4
      })
    },
    mapBtnName (order) {
      if (order.status === PARKED) {
        return '取车'
      }
      if (order.status === FETCHING || order.status === FETCHED) {
        return '确认取车'
      }
    }
  }
}
</script>
