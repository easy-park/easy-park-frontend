<template>
    <div>
        <a-row>
            <a-col :span="6">车牌号：</a-col>
            <a-col :span="18">{{ order.carNumber }}</a-col>
        </a-row>
        <a-row>
            <a-col :span="6">停车场：</a-col>
            <a-col :span="18">{{ order.parkingLot.name }}</a-col>
        </a-row>
        <a-row>
            <a-col :span="6">开始时间：</a-col>
            <a-col :span="18">{{ order.startTime | toDate }}</a-col>
        </a-row>
        <a-row>
            <a-col :span="6">结束时间：</a-col>
            <a-col :span="18">{{ order.endTime | toDate }}</a-col>
        </a-row>
        <a-row>
            <a-col :span="6">停车员：</a-col>
            <a-col :span="18">{{ order.parkingBoy.name }}</a-col>
        </a-row>
    </div>
</template>

<script>
import { formatDate } from '@/util/datetime'
export default {
  name: 'orderDetail',
  props: ['order'],
  filters: {
    toDate (datetimeString) {
      return datetimeString ? formatDate(new Date(datetimeString), 'YYYY-MM-DD hh:mm') : ''
    }
  }
}
</script>
