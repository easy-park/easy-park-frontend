<template>
<div>
  <a-list itemLayout="horizontal"
    :dataSource="orders">
    <a-list-item slot="renderItem" slot-scope="order">
      <a-col align="center" :span="4"><img class="icon" src="@/assets/car.svg" alt="car"></a-col>
      <a-col :span="14">
        <a-row>
          车牌号：{{ order.carNumber }}
        </a-row>
        <a-row>
          停车时间：{{ order.startTime | toDate }}
          <span v-if="order.endTime"> - </span>
          {{ order.endTime | toDate }}
        </a-row>
      </a-col>
      <a-col align="center" :span="6">
        <a-button type="primary" @click="btnCallback(order)" :disabled="order.status=='已停'">{{ btnName(order) }}</a-button>
      </a-col>
    </a-list-item>
  </a-list>
</div>
</template>

<script>
import { formatDate } from '@/util/datetime'

export default {
  name: 'orderList',
  props: {
    btnCallback: Function,
    btnName: Function,
    orders: Array
  },
  filters: {
    toDate (datetimeString) {
      return datetimeString ? formatDate(new Date(datetimeString), 'MM-DD hh:mm') : ''
    }
  }
}
</script>

<style scoped>
.icon {
  width: 10vw;
  height: 10vw;
}
</style>
