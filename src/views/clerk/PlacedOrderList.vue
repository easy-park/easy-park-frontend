<template>
  <div>
    <a-alert v-show="isShowAlert" message="你有一个订单需要处理" banner></a-alert>
    <order-list :btnName="(order) => order.status === 1 ? '抢单' : '停车'" :orders="orders" :btnCallback = "getOrder"></order-list>
  </div>
</template>

<script>
import OrderList from '@/components/OrderList'
import { loadAvailableOrders, setParkingBoyToOrder } from '@/api/clerk/clerk-home'
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
  computed: {
    isShowAlert () {
      return this.orders.some(order => order.status === 2)
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
      if (order.status === 1) {
        setParkingBoyToOrder(order).then(res => {
          this.$router.push(`/select/${order.id}`)
        }).catch(err => {
          this.$message.error(err.msg)
        }).finally(() => {
          this.refreshData()
        })
      }
      if (order.status === 2) {
        this.$router.push(`/select/${order.id}`)
      }
    },
    refreshData () { // 重写 websocket (mixins) 的方法
      this.loadOrders()
    }
  }
}
</script>
