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
          <OrderList :btnName="() => '抢单'" :orders="orders"
            :btnCallback = "getOrder"/>
        </div>
      </a-tab-pane>
      <a-tab-pane key="1">
        <div slot="tab" class="tab-slot">
          <a-icon type="swap"/>
          <span>取车</span>
        </div>
        <div class="content">
          <OrderList :btnName="(order) => order.status" :orders="orders1"
             :btnCallback = "fetchCar" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <div slot="tab" class="tab-slot">
          <a-icon type="bars"/>
          <span>历史</span>
        </div>
        <div class="content">
          <OrderList :btnName="() => '详细信息'" :orders="orders2"
             :btnCallback = "orderInfo" />
          <a-modal v-model="visible" title="详细信息"
          :footer="null" destroyOnClose><OrderDetail :order = 'order'/></a-modal>
        </div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <div slot="tab" class="tab-slot">
          <a-icon type="user"/>
          <span>我的</span>
        </div>
        <div class="content">Content3</div>
      </a-tab-pane>
    </a-tabs>
  </a-layout>
</template>

<script>
import OrderList from '@/components/clerk/OrderList'
import OrderDetail from './OrderDetail'
export default {
  name: 'clerk-home',
  components: { OrderList, OrderDetail },
  data () {
    return {
      visible: false,
      headName: '订单',
      order: {},
      orders1: [
        {
          carNumber: '1234',
          startTime: '12:23',
          endTime: '',
          status: '已停'
        },
        {
          carNumber: '1234',
          startTime: '12:23',
          endTime: '',
          status: '待取'
        }
      ],
      orders: [
        {
          carNumber: '1234',
          startTime: '12:23'
        },
        {
          carNumber: '1234',
          startTime: '12:23'
        }
      ],
      orders2: [
        {
          carNumber: '1234',
          startTime: '12:23',
          endTime: '15:35',
          parkingLot: {
            name: '金湾停车场'
          },
          parkingBoy: {
            name: '张三'
          }
        },
        {
          carNumber: '1234',
          startTime: '12:23',
          endTime: '15:35',
          parkingLot: {
            name: '唐家停车场'
          },
          parkingBoy: {
            name: '李四'
          }
        }
      ]
    }
  },
  methods: {
    getOrder (order) {},
    fetchCar (order) {},
    orderInfo (order) {
      this.visible = true
      this.order = order
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
