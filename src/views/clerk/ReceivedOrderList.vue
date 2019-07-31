<template>
  <order-list :btnName="mapBtnName" :orders="unfinishedOrders" :btnCallback = "fetchCar"></order-list>
</template>

<script>
import OrderList from '@/components/OrderList'
import { loadUnfinishedOrders, fetchCar } from '@/api/clerk/clerk-home'
import { PARKED, FETCHING } from '@/api/clerk/order-status'
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
      unfinishedOrders: [],
      isRefreshing: false
    }
  },
  beforeMount () {
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
      loadUnfinishedOrders().then(res => {
        this.unfinishedOrders = res.data
        if (res.data && res.data.length > 0) {
          this.parkingBoyStatus = res.data[0].parkingBoy.status
        }
      }).finally(() => {
        this.isRefreshing = false
      })
    },
    fetchCar (order) {
      fetchCar(order.id).then(res => {
        const index = this.unfinishedOrders.findIndex(v => v.id === order.id)
        this.unfinishedOrders.splice(index, 1)
      })
    },
    mapBtnName (order) {
      if (order.status === PARKED) {
        return '已停'
      }
      if (order.status === FETCHING) {
        return '取车'
      }
    },
    refreshData () { // 重写 websocket (mixins) 的方法
      this.loadUnfinishedOrders()
    }
  }
}
</script>
