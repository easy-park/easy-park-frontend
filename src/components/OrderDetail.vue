<template>
  <div class="order-detail">
    <a-row class="row" type="flex" justify="space-around" align="middle">
      <a-col :span="6" class="align-right">客户姓名：</a-col>
      <a-col :span="18" class="align-right">{{ order.customer.name }}</a-col>
    </a-row>
    <a-row class="row" type="flex" justify="space-around" align="middle">
      <a-col :span="6" class="align-right">客户手机号：</a-col>
      <a-col :span="18" class="align-right">{{ order.customer.phone }}</a-col>
    </a-row>
    <a-row class="row" type="flex" justify="space-around" align="middle">
      <a-col :span="6" class="align-right">车牌号：</a-col>
      <a-col :span="18" class="align-right">{{ order.carNumber }}</a-col>
    </a-row>
    <a-row v-show="!!order.parkingLot" class="row" type="flex" justify="space-around" align="middle">
      <a-col :span="6" class="align-right">停车场：</a-col>
      <a-col :span="18" class="align-right">{{ (order.parkingLot || {}).name }}</a-col>
    </a-row>
    <a-row class="row" type="flex" justify="space-around" align="middle">
      <a-col :span="6" class="align-right">开始时间：</a-col>
      <a-col :span="18" class="align-right">{{ order.startTime | toDate }}</a-col>
    </a-row>
    <a-row v-show="order.endTime" class="row" type="flex" justify="space-around" align="middle">
      <a-col :span="6" class="align-right">结束时间：</a-col>
      <a-col :span="18" class="align-right">{{ order.endTime | toDate }}</a-col>
    </a-row>
    <a-row class="row" type="flex" justify="space-around" align="middle">
      <a-col :span="6" class="align-right">停车员：</a-col>
      <a-col :span="18" class="align-right">{{ order.parkingBoy.name }}</a-col>
    </a-row>
  </div>
</template>

<script>
import { formatDate } from '@/util/datetime'

export default {
  props: {
    order: Object
  },
  filters: {
    toDate (datetimeString) {
      return datetimeString ? formatDate(new Date(datetimeString), 'YYYY-MM-DD hh:mm') : ''
    }
  }
}
</script>

<style scoped>
.order-detail {
  padding: 10px;
  background: white;
  border-bottom: 2px dashed rgba(0, 0, 0, .3);
}

.row {
  height: 30px;
}

.align-right {
  text-align: right;
}
</style>
