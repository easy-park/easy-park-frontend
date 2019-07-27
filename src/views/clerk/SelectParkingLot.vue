<template>
  <div id="select">
    <a-layout>
      <a-layout-header style="background-color: #1890ff;font-size:large">
        <a-button style="float: left;margin-left: -40px;margin-top: 15px;border-style: none" :ghost="true" @click="goBack">
          <a-icon type="left" />
        </a-button>
        <span style="color: white">停车地点</span>
      </a-layout-header>
      <a-layout-content style="background-color: white">
        <div style="margin-top: 30px">
          <a-select placeholder="选择停车场" style="width: 90%" size="large">
            <a-select-option v-for="column in columns" v-bind:key="column.id" :disabled="!column.rest">{{column.name+"("+column.rest+")"}}</a-select-option>
          </a-select>
        </div>
        <div style="margin-top: 100px">
          <a-button type="primary" style="width: 80%;height: 50px">完成订单</a-button>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
export default {
  name: 'select-parkinglot',
  data () {
    return {
      columns: [
        { id: 1,
          name: '停车场A',
          rest: 9
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
#select{
  text-align: center
}

</style>
