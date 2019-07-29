<template>
  <div>
    <order-list :btnName="() => '详细信息'" :orders="historyOrders" :btnCallback = "orderInfo"></order-list>
    <a-modal v-model="visible" title="详细信息" :footer="null" destroyOnClose>
      <order-detail :order='order'></order-detail>
    </a-modal>
  </div>
</template>

<script>
import OrderList from '@/components/OrderList'
import OrderDetail from '@/components/OrderDetail'
import { loadHistoryOrders } from '@/api/clerk/clerk-home'
import { websocket } from '@/mixins/websocket'

export default {
  mixins: [ websocket ],
  components: { OrderList, OrderDetail },
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
      historyOrders: [],
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
        this.historyOrders = res.data
      }).finally(() => {
        this.isRefreshing = false
      })
    },
    orderInfo (order) {
      this.visible = true
      this.order = order
    },
    refreshData () { // 重写 websocket (mixins) 的方法
      this.loadOrders()
    }
  }
}
</script>
