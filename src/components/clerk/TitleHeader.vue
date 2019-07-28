<template>
  <div class="title-header">
    <h2 class="title">{{ title }}</h2>
    <a href="javascript: void 0" v-if="showLeftButton">
      <a-icon type="arrow-left" class="icon"></a-icon>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showLeftButton: {
      type: Boolean,
      default: false
    },
    leftButtonAction: {
      type: Function,
      default: () => {
        this.$router.back()
      }
    }
  },
  methods: {
    leftButtonClick () {
      this.leftButtonAction()
    }
  }
}
</script>

<style scoped lang="less">
.title-header {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 56px;
  background-color: #1890ff;

  .title {
    font-size: 18px;
    text-align: center;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    padding: 0 56px;
    position: absolute;
    left: 0;
    top: 0;
    color: white;
  }

  a {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 1;
  }

  a:hover {
    background-color: rgba(0, 0, 0, .05);
  }

  .icon {
    font-size: 18px;
    padding: 4px;
    color: white;
  }
}
</style>
