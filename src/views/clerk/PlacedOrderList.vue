<template>
  <order-list :btnName="() => '抢单'" :orders="orders" :btnCallback = "getOrder"></order-list>
</template>

<script>
import OrderList from '@/components/OrderList'
import { loadAvailableOrders, setParkingBoyToOrder } from '@/api/clerk/clerk-home'
import { BAD_REQUEST } from '@/api/status'
import { websocket } from '@/mixins/websocket'

export default {
  mixins: [ websocket ],
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
        .catch(err => {
          if (err.status === BAD_REQUEST) {
            this.$message('该订单已经被抢了')
          }
        })
    }
  }
}
</script>
