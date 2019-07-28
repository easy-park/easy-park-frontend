<template>
  <order-list :btnName="() => '抢单'" :orders="orders" :btnCallback = "getOrder"></order-list>
</template>

<script>
import OrderList from '@/components/clerk/OrderList'
import { loadAvailableOrders, setParkingBoyToOrder } from '@/api/clerk/clerk-home'

export default {
  components: { OrderList },
  data () {
    return {
      orders: []
    }
  },
  beforeMount () {
    this.loadOrders()
  },
  methods: {
    loadOrders () {
      loadAvailableOrders()
        .then(res => {
          this.orders = res.data
        })
    },
    getOrder (order) {
      setParkingBoyToOrder(order.id)
        .then(res => {
          // nothing
        })
      this.$router.push(`/select/${order.id}`)
    }
  }
}
</script>
