<template>
  <div>
    <OrderList :btnName="mapBtnName" :orders="orders" :btnCallback="fetchCar"/>
    <a-alert
      v-if="show"
      :message="msg"
      type="success"
      showIcon
      closable
    />
    <a-modal
      title="支付订单"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>车牌号：{{ clickOrder.carNumber }}</p>
      <p>停车时间：{{ clickOrder.startTime | toDate }}</p>
      <p>取车时间：{{ clickOrder.endTime | toDate }}</p>
      <p>待支付：{{ clickOrder.price }} 元</p>
    </a-modal>
  </div>
</template>

<script>
import OrderList from './UserOrders'
import { loadUnfinishedOrders, fetchCar, finishOrder } from '@/api/customer/user-order'
import { PARKED, FETCHING, FETCHED, PLACED, RECEIVED } from '@/api/clerk/order-status'
import { setInterval, clearInterval } from 'timers'
import { websocket } from '@/mixins/websocket'
import { formatDate } from '@/util/datetime'

export default {
  name: 'FetchCar',
  mixins: [ websocket ],
  components: { OrderList },
  props: {
    refresh: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  filters: {
    toDate (datetimeString) {
      return datetimeString ? formatDate(new Date(datetimeString), 'YYYY-MM-DD hh:mm') : ''
    }
  },
  data () {
    return {
      orders: [],
      show: false,
      msg: '',
      autoTime: 0,
      visible: false,
      clickOrder: Object
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
          this.getShowTime()
          this.msg = '取车中，请稍后!'
          const index = this.orders.findIndex(e => e.id === order.id)
          this.orders.splice(index, 1, res.data)
        })
      } else {
        this.clickOrder = order
        this.visible = true
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
      if (order.status === FETCHING) {
        return '待取车'
      }
      if (order.status === FETCHED) {
        return '确认取车'
      }
    },
    getShowTime () {
      this.show = true
      this.autoTime = 3
      const timer = setInterval(() => {
        this.autoTime--
        if (this.autoTime <= 0) {
          this.show = false
          clearInterval(timer)
        }
      }, 1000)
    },
    refreshData () { // 重写 websocket (mixins) 的方法
      this.loadUnfinishedOrders()
    },
    handleOk () {
      finishOrder(this.clickOrder.id).then(res => {
        this.visible = false
        this.getShowTime()
        this.msg = '完成订单!'
        const index = this.orders.findIndex(e => e.id === this.clickOrder.id)
        this.orders.splice(index, 1)
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
