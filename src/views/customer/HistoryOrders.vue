<template>
  <div>
    <OrderList :btnName="() => '详细信息'" :orders="orders" :btnCallback = "orderInfo"/>
    <a-modal v-model="visible" title="详细信息" :footer="null" destroyOnClose>
      <OrderDetail :order='order' />
    </a-modal>
  </div>
</template>

<script>
import OrderList from './UserOrders'
import { loadHistoryOrders } from '@/api/customer/user-order.js'
import OrderDetail from '@/components/OrderDetail'
import { websocket } from '@/mixins/websocket'

export default {
  name: 'historyOrders',
  mixins: [ websocket ],
  components: { OrderList, OrderDetail },
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
      order: undefined,
      visible: false,
      isRefreshing: false
    }
  },
  beforeMount () {
    this.loadHistoryOrders()
  },
  watch: {
    refresh () {
      this.loadHistoryOrders()
    }
  },
  methods: {
    loadHistoryOrders () {
      if (this.isRefreshing) {
        return
      }
      this.isRefreshing = true
      loadHistoryOrders().then(res => {
        this.orders = res.data
      }).finally(() => {
        this.isRefreshing = false
      })
    },
    orderInfo (order) {
      this.visible = true
      this.order = order
    },
    refreshData () { // 重写 websocket (mixins) 的方法
      this.loadHistoryOrders()
    }
  }
}
</script>
