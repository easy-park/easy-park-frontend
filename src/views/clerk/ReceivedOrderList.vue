<template>
  <order-list :btnName="mapBtnName" :orders="unfinishedOrders" :btnCallback = "fetchCar" :parkingBoyStatus="parkingBoyStatus"></order-list>
</template>

<script>
import OrderList from '@/components/OrderList'
import { loadUnfinishedOrders, fetchCar } from '@/api/clerk/clerk-home'
import { PARKED, FETCHING } from '@/api/clerk/order-status'
import { BUSY } from '@/api/clerk/clerk-status'

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
      unfinishedOrders: [],
      parkingBoyStatus: BUSY,
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
        this.parkingBoyStatus = BUSY
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
    }
  }
}
</script>
