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
      })
    },
    mapBtnName (order) {
      return STATUS[order.status]
    }
  }
}
</script>
