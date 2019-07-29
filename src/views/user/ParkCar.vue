<template>
  <div id="parkCar">
    <a-input placeholder="请输入车牌号" type="text" v-model="carNumber"/>
    <a-button type="primary" style="margin-top: 20px" @click="parkCar">停车</a-button>
    <a-modal v-model="visible" title="订单信息" :footer="null" destroyOnClose>
      <a-row>车牌号：{{ order.carNumber }}</a-row>
      <a-row>下单时间：{{ order.startTime | toDate }}</a-row>
    </a-modal>
  </div>
</template>

<script>
import { parkCar } from '@/api/user/user-order'
import { formatDate } from '@/util/datetime'
export default {
  name: 'ParkCar',
  data () {
    return {
      carNumber: '',
      visible: false,
      order: {}
    }
  },
  methods: {
    parkCar () {
      parkCar(this.carNumber).then(res => {
        this.order = res.data
        this.visible = true
        this.carNumber = ''
      })
    }
  },
  filters: {
    toDate (datetimeString) {
      return datetimeString ? formatDate(new Date(datetimeString), 'YYYY-MM-DD hh:mm') : ''
    }
  }
}
</script>

<style scoped>
#parkCar {
  height: 100vh;
  text-align: center;
  margin: 30vh 20vw;
}
</style>
