<template>
  <div id="select">
    <a-layout>
      <title-header :showLeftButton="true">停车地点</title-header>
      <a-skeleton :loading="!order" active :paragraph="{rows: 6, width: '100%'}" :title="false">
        <order-detail :order="order"></order-detail>
      </a-skeleton>
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
        <div style="margin-top: 30px">
          <a-button
            type="primary"
            @click="onBtnClick"
            size="large"
            :isBtnLoading="isParkingLotSelected"
          >{{ btnText }}</a-button>
        </div>
      </a-layout-content>
    </a-layout>
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
      selectedParkingLot: null,
      isParkingLotSelected: false,
      order: null,
      isBtnLoading: false
    }
  },
  computed: {
    btnText () {
      return this.isParkingLotSelected ? '完成停车' : '选择该停车场'
    }
  },
  beforeMount () {
    loadClerkParkingLots().then(res => {
      this.parkingLots = res.data
    })
    loadOrder(this.$route.params.orderId).then(res => {
      this.order = res.data
    })
  },
  methods: {
    onSelectChange (parkingLotIndex) {
      const parkingLot = this.parkingLots[parkingLotIndex]
      this.$set(this.order, 'parkingLot', parkingLot)
      this.selectedParkingLot = parkingLot
    },
    onBtnClick () {
      if (!this.isParkingLotSelected) {
        this.isBtnLoading = true
        receiptOrder({
          parkingOrderId: this.$route.params.orderId,
          parkingLotId: this.selectedParkingLot.id
        }).then(res => {
          this.isParkingLotSelected = true
          this.order = res.data
        }).catch(err => {
          this.$message.error(err.msg)
        }).finally(() => {
          this.isBtnLoading = false
        })
      } else {
        this.isBtnLoading = true
        parkedCar(this.$route.params.orderId).then(res => {
          this.$router.back()
        }).catch(err => {
          this.$message.error(err.msg)
        }).finally(() => {
          this.isBtnLoading = false
        })
      }
    }
  }
}
</script>

<style scoped>
#select{
  text-align: center
}
</style>
