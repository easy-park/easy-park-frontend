<template>
  <order-list :btnName="mapBtnName" :orders="unfinishedOrders" :btnCallback = "fetchCar"></order-list>
</template>

<script>
import OrderList from '@/components/clerk/OrderList'
import { loadUnfinishedOrders } from '@/api/clerk/clerk-home'
import { STATUS } from '@/api/clerk/order-status'

export default {
  components: { OrderList },
  data () {
    return {
      unfinishedOrders: []
    }
  },
  beforeMount () {
    loadUnfinishedOrders()
      .then(res => {
        this.unfinishedOrders = res.data
      })
  },
  methods: {
    fetchCar (order) {},
    mapBtnName (order) {
      return STATUS[order.status]
    }
  }
}
</script>
