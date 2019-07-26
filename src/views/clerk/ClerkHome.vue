<template>
  <a-layout class="clerk-home">
    <a-tabs class="tabs" :tabBarGutter="0" defaultActiveKey="1" tabPosition="bottom">
      <a-tab-pane key="0">
        <div slot="tab" class="tab-slot">
          <a-icon type="home"/>
          <span>接单</span>
        </div>
        <div class="content">Content</div>
      </a-tab-pane>
      <a-tab-pane key="1">
        <div slot="tab" class="tab-slot">
          <a-icon type="swap"/>
          <span>取车</span>
        </div>
        <div class="content">Content</div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <div slot="tab" class="tab-slot">
          <a-icon type="bars"/>
          <span>历史</span>
        </div>
        <div class="content">Content</div>
      </a-tab-pane>
      <a-tab-pane key="3">
        <div slot="tab" class="tab-slot">
          <a-icon type="user"/>
          <span>我的</span>
        </div>
        <div class="content">Content</div>
      </a-tab-pane>
    </a-tabs>
  </a-layout>
</template>

<script>
export default {
  name: 'clerk-home'
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
</style>
