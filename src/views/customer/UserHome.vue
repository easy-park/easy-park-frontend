<template>
  <a-layout class="user-home">
    <a-row id="header">{{ title }}</a-row>
    <a-tabs class="tabs" :tabBarGutter="0" :defaultActiveKey="defaultActiveKey" tabPosition="bottom" @change="onTabChange" @tabClick="onTabClick">
      <a-tab-pane key="0">
        <div slot="tab" class="tab-slot">
          <a-icon type="home"/>
          <span>停车</span>
        </div>
        <div class="content">
          <ParkCar />
        </div>
      </a-tab-pane>
      <a-tab-pane key="1">
        <div slot="tab" class="tab-slot">
          <a-icon type="swap"/>
          <span>取车</span>
        </div>
        <div class="content">
          <FetchCar :refresh="shouldRefreshObjs"/>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <div slot="tab" class="tab-slot">
          <a-icon type="bars"/>
          <span>历史</span>
        </div>
        <div class="content">
          <HistoryOrders />
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <div slot="tab" class="tab-slot">
          <a-icon type="user"/>
          <span>我的</span>
        </div>
        <div class="content">
          <CustomerProfile />
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-layout>
</template>

<script>
import ParkCar from './ParkCar'
import FetchCar from './FetchCar'
import HistoryOrders from './HistoryOrders'
import CustomerProfile from './CustomerProfile'
const TITLES = ['停车', '取车', '历史', '我的']
export default {
  name: 'user-home',
  components: { ParkCar, FetchCar, HistoryOrders, CustomerProfile },
  data () {
    return {
      defaultActiveKey: '0',
      title: TITLES[0],
      shouldRefreshObjs: {}
    }
  },
  methods: {
    onTabChange (key) {
      this.title = TITLES[key]
      this.shouldRefreshObjs = {}
    },
    onTabClick (key) {
      this.shouldRefreshObjs = {}
    }
  }
}
</script>

<style scoped>
#header{
  text-align: center;
  height: 50px;
  line-height: 50px;
  background: #1890ff;
  color: white;
  font-size: 18px;
}
.user-home {
  position: absolute;
  width: 100%;
  height: 100%;
}

.tabs /deep/ .ant-tabs-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
}

.content {
  width: 100%;
  height: 100%;
  position: fixed;
  padding: 0 0 65px;
}

.tab-slot {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.tab-slot i {
  margin: 0 !important;
  font-size: 20px;
}

/deep/ .ant-tabs-nav {
  width: 100%;
}

/deep/ .ant-tabs-nav > div {
  display: flex;
}

/deep/ .ant-tabs-nav .ant-tabs-tab {
  flex: 1 1 auto;
}
</style>
