<template>
  <a-layout class="clerk-home">
    <a-row id="header">{{ headName }}</a-row>
    <a-tabs class="tabs" :tabBarGutter="0" defaultActiveKey="0" tabPosition="bottom">
      <a-tab-pane key="0">
        <div slot="tab" class="tab-slot">
          <a-icon type="home"/>
          <span>接单</span>
        </div>
        <div class="content">
          <placed-order-list></placed-order-list>
        </div>
      </a-tab-pane>
      <a-tab-pane key="1">
        <div slot="tab" class="tab-slot">
          <a-icon type="swap"/>
          <span>取车</span>
        </div>
        <div class="content">
          <received-order-list></received-order-list>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <div slot="tab" class="tab-slot">
          <a-icon type="bars"/>
          <span>历史</span>
        </div>
        <div class="content">
          <history-order-list></history-order-list>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <div slot="tab" class="tab-slot">
          <a-icon type="user"/>
          <span>我的</span>
        </div>
        <div class="content" @click="$router.push('/clerk/login')">Content3</div>
      </a-tab-pane>
    </a-tabs>
  </a-layout>
</template>

<script>
import PlacedOrderList from './PlacedOrderList'
import ReceivedOrderList from './ReceivedOrderList'
import HistoryOrderList from './HistoryOrderList'

export default {
  name: 'clerk-home',
  components: { PlacedOrderList, ReceivedOrderList, HistoryOrderList },
  data () {
    return {
      visible: false,
      headName: '订单'
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
#header{
  text-align: center;
  height: 50px;
  line-height: 50px;
  background: #1890ff;
  color: white;
  font-size: 18px;
}
</style>
