<template>
  <order-list :btnName="() => '抢单'" :orders="orders" :btnCallback = "getOrder"></order-list>
</template>

<script>
import OrderList from '@/components/clerk/OrderList'
import { loadAvailableOrders, setParkingBoyToOrder } from '@/api/clerk/clerk-home'

export default {
  components: { OrderList },
  props: {
    refresh: {
      type: Object, // 父组件传任意一个对象进来，表示需要重新刷新数据
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      orders: [],
      isRefreshing: false
    }
  },
  beforeMount () {
    this.loadOrders()
  },
  watch: {
    refresh () {
      this.loadOrders()
    }
  },
  methods: {
    loadOrders () {
      if (this.isRefreshing) {
        return
      }
      this.isRefreshing = true
      loadAvailableOrders().then(res => {
        this.orders = res.data
      }).finally(() => {
        this.isRefreshing = false
      })
    },
    getOrder (order) {
      setParkingBoyToOrder(order)
        .then(res => {
          this.$router.push(`/select/${order.id}`)
        })
    }
  }
}
</script>
