<template>
  <a-layout class="clerk-home">
    <title-header>{{ title }}</title-header>
    <a-tabs class="tabs" :tabBarGutter="0" :defaultActiveKey="defaultActiveKey" tabPosition="bottom" @tabClick="onTabClick" @change="onTabChange">
      <a-tab-pane :key="0">
        <div slot="tab" class="tab-slot">
          <a-icon type="home"/>
          <span>接单</span>
        </div>
        <div class="content">
          <placed-order-list :refresh="shouldRefreshObjs[0]"></placed-order-list>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="1">
        <div slot="tab" class="tab-slot">
          <a-icon type="swap"/>
          <span>取车</span>
        </div>
        <div class="content">
          <received-order-list :refresh="shouldRefreshObjs[1]"></received-order-list>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="2">
        <div slot="tab" class="tab-slot">
          <a-icon type="bars"/>
          <span>历史</span>
        </div>
        <div class="content">
          <history-order-list :refresh="shouldRefreshObjs[2]"></history-order-list>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="3">
        <div slot="tab" class="tab-slot">
          <a-icon type="user"/>
          <span>我的</span>
        </div>
        <div class="content">
          <clerk-profile :refresh="shouldRefreshObjs[3]"></clerk-profile>
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-layout>
</template>

<script>
import PlacedOrderList from './PlacedOrderList'
import ReceivedOrderList from './ReceivedOrderList'
import HistoryOrderList from './HistoryOrderList'
import ClerkProfile from './ClerkProfile'
import TitleHeader from '@/components/clerk/TitleHeader'

const TITLES = ['接单', '取车', '历史', '我的']

export default {
  name: 'clerk-home',
  components: { PlacedOrderList, ReceivedOrderList, HistoryOrderList, ClerkProfile, TitleHeader },
  data () {
    return {
      visible: false,
      headName: '订单',
      shouldRefreshObjs: [{}, {}, {}, {}],
      defaultActiveKey: 0,
      title: TITLES[0]
    }
  },
  methods: {
    onTabClick (key) {
      this.$set(this.shouldRefreshObjs, key, {})
    },
    onTabChange (key) {
      this.title = TITLES[key]
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.query.role === 'customer') {
      next('/clerk/login')
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="less">
.clerk-home {
  position: absolute;
  width: 100%;
  height: 100%;
}

.tabs /deep/ .ant-tabs-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
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

  i {
    margin: 0 !important;
    font-size: 16px;
  }

  span {
    font-size: 14px;
    line-height: 1em;
    margin: 2px 0 0;
  }
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

#header{
  text-align: center;
  height: 50px;
  line-height: 50px;
  background: #1890ff;
  color: white;
  font-size: 18px;
}
</style>
