<template>
  <div id="select">
    <a-layout>
      <title-header :showLeftButton="true">停车地点</title-header>
      <a-layout-content style="background-color: white">
        <div style="margin-top: 30px">
          <a-select placeholder="选择停车场" style="width: 90%" size="large" defaultActiveFirstOption @change="onSelectChange">
            <a-select-option
              v-for="(parkingLot, index) in parkingLots"
              v-bind:key="parkingLot.id"
              :value="index"
              :disabled="parkingLot.available <= 0">
              {{ `${parkingLot.name} (${parkingLot.available})` }}
            </a-select-option>
          </a-select>
        </div>
        <div style="margin-top: 100px">
          <a-button type="primary" style="width: 80%;height: 50px" @click="receiptOrder">开始停车</a-button>
        </div>
      </a-layout-content>
    </a-layout>
    <a-modal v-model="visible" title="详细信息" destroyOnClose>
      <order-detail :order='order'></order-detail>
      <template slot="footer">
        <a-button key="submit" type="primary" @click="onParkedCar">
          完成停车
        </a-button>
      </template>
    </a-modal>
  </div>
</template>
<script>
import OrderDetail from '@/components/OrderDetail'
import TitleHeader from '@/components/clerk/TitleHeader'
import { loadClerkParkingLots, receiptOrder, loadOrder, parkedCar } from '@/api/clerk/select-parking-lot'

export default {
  name: 'select-parkinglot',
  components: { OrderDetail, TitleHeader },
  data () {
    return {
      parkingLots: [],
      selectedParkingLot: undefined,
      visible: false,
      order: {}
    }
  },
  beforeMount () {
    loadClerkParkingLots()
      .then(res => {
        this.parkingLots = res.data
      })
    loadOrder(this.$route.params.orderId)
      .then(res => {
        this.order = res.data
      })
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    onSelectChange (parkingLotIndex) {
      this.selectedParkingLot = this.parkingLots[parkingLotIndex]
    },
    receiptOrder () {
      receiptOrder({
        parkingOrderId: this.$route.params.orderId,
        parkingLotId: this.selectedParkingLot.id
      }).then(res => {
        this.order = res.data
        this.visible = true
      })
    },
    onParkedCar () {
      parkedCar(this.$route.params.orderId)
        .then(res => {
          this.visible = false
          this.$router.back()
        })
    }
  }
}
</script>

<style scoped>
#select{
  text-align: center
}
</style>
