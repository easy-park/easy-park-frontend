<template>
  <div>
    <OrderList :btnName="mapBtnName" :orders="orders" :btnCallback = "fetchCar"/>
    <a-alert
      v-if="show"
      message="Success Tips"
      :description="msg"
      type="success"
      showIcon
      closable
    />
  </div>
</template>

<script>
import OrderList from './UserOrders'
import { loadUnfinishedOrders, fetchCar, finishOrder } from '@/api/user/user-order'
import { PARKED, FETCHING, FETCHED, PLACED, RECEIVED } from '@/api/clerk/order-status'

export default {
  name: 'FetchCar',
  components: { OrderList },
  props: {
    refresh: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      orders: [],
      show: false,
      msg: ''
    }
  },
  mounted () {
    this.loadUnfinishedOrders()
  },
  watch: {
    refresh () {
      this.loadUnfinishedOrders()
    }
  },
  methods: {
    loadUnfinishedOrders () {
      if (this.isRefreshing) {
        return
      }
      this.isRefreshing = true
      loadUnfinishedOrders()
        .then(res => {
          this.orders = res.data
        }).finally(() => {
          this.isRefreshing = false
        })
    },
    fetchCar (order) {
      if (order.status === PARKED) {
        fetchCar(order.id).then(res => {
          this.show = true
          this.msg = '取车中，请稍后!'
          const index = this.orders.findIndex(e => e.id === order.id)
          this.orders.splice(index, 1, res.data)
        })
      } else {
        finishOrder(order.id).then(res => {
          this.show = true
          this.msg = '完成订单!'
          const index = this.orders.findIndex(e => e.id === order.id)
          this.orders.splice(index, 1)
        })
      }
    },
    mapBtnName (order) {
      if (order.status === PLACED) {
        return '待接单'
      }
      if (order.status === RECEIVED) {
        return '已接单'
      }
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
