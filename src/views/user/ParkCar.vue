<template>
  <div id="parkCar">
    <a-input placeholder="请输入车牌号" type="text" v-model="carNumber"/>
    <a-button type="primary" style="margin-top: 20px" @click="parkCar">停车</a-button>
    <a-model v-model="visible" title="订单信息" :footer="null" destroyOnClose>
      <order-detail :order='order'></order-detail>
    </a-model>
  </div>
</template>

<script>
import { parkCar } from '@/api/user/user-order'
export default {
  name: 'parkCar',
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
        this.visible = true
        this.order = res.data
      })
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
