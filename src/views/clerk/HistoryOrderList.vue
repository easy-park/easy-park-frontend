<template>
  <div>
    <order-list :btnName="() => '详细信息'" :orders="historyOrders" :btnCallback = "orderInfo"></order-list>
    <a-modal v-model="visible" title="详细信息" :footer="null" destroyOnClose>
      <order-detail :order='order'></order-detail>
    </a-modal>
  </div>
</template>

<script>
import OrderList from '@/components/clerk/OrderList'
import { loadHistoryOrders } from '@/api/clerk/clerk-home'

export default {
  components: { OrderList },
  data () {
    return {
      historyOrders: [],
      order: undefined,
      visible: false
    }
  },
  beforeMount () {
    loadHistoryOrders()
      .then(res => {
        this.historyOrders = res.data
      })
  },
  methods: {
    orderInfo (order) {
      this.visible = true
      this.order = order
    }
  }
}
</script>
