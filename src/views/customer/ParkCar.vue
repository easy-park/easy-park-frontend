<template>
  <div id="parkCar">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="车牌号"
      >
        <a-input
          v-decorator="[
            'carNumber',
            {rules: [{ required: true, message: '请输入车牌号' }, { message: '请输入正确车牌号', validator: checkCarNumber }]}
          ]"
          placeholder="请输入车牌号"
        />
      </a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        停车
      </a-button>
    </a-form>
    <a-modal v-model="visible" title="订单信息" :footer="null" destroyOnClose>
      <a-row>车牌号：{{ order.carNumber }}</a-row>
      <a-row>下单时间：{{ order.startTime | toDate }}</a-row>
    </a-modal>
  </div>
</template>

<script>
import { parkCar } from '@/api/customer/user-order'
import { formatDate } from '@/util/datetime'
export default {
  name: 'ParkCar',
  data () {
    return {
      carNumber: '',
      visible: false,
      order: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    checkCarNumber (rule, carNumber, callback) {
      if (carNumber.length === 7) {
        let express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
        express.test(carNumber) ? callback() : callback(rule.message)
      }
      callback(rule.message)
    },
    handleSubmit  (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          parkCar(values.carNumber).then(res => {
            if (res.status === 200) {
              this.order = res.data
              this.visible = true
              this.carNumber = ''
            }
          }).catch(res => {
            this.$message.error(res.msg + '，请确认输入无误')
          })
        }
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
