<template>
  <order-list :btnName="mapBtnName" :orders="unfinishedOrders" :btnCallback = "fetchCar" :parkingBoyStatus="parkingBoyStatus"></order-list>
</template>

<script>
import OrderList from '@/components/clerk/OrderList'
import { loadUnfinishedOrders, fetchCar } from '@/api/clerk/clerk-home'
import { STATUS } from '@/api/clerk/order-status'
import { BUSY } from '@/api/clerk/clerk-status'

export default {
  components: { OrderList },
  data () {
    return {
      unfinishedOrders: [],
      parkingBoyStatus: BUSY
    }
  },
  beforeMount () {
    loadUnfinishedOrders()
      .then(res => {
        this.unfinishedOrders = res.data
        if (res.data && res.data.length > 0) {
          this.parkingBoyStatus = res.data[0].parkingBoy.status
        }
      })
  },
  methods: {
    fetchCar (order) {
      fetchCar(order.id)
        .then(res => {
          this.parkingBoyStatus = BUSY
        })
    },
    mapBtnName (order) {
      return STATUS[order.status]
    }
  }
}
</script>
