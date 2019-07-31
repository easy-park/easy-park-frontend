<template>
  <div class="clerk-info">
    <a-card hoverable>
      <a-card-meta
        :title="user.username">
        <a-avatar slot="avatar" :size="64" icon="user"/>
        <div slot="description" class="description">
          <p>姓名：{{ user.name }}</p>
          <p>电话：{{ user.phone }}</p>
        </div>
      </a-card-meta>
    </a-card>
    <a-row>
      <a-col :span="24">
        <a-button type="danger" style="width:100%; margin-top:20px; height:60px" @click="handleLogout">退出登录</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { logOut, getUserInfo } from '@/api/customer/log-in'

export default {
  props: {
    refresh: {
      type: Object, // 父组件传任意一个对象进来，表示需要重新刷新数据
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    getUserInfo().then(res => {
      if (res.status === 200) {
        this.user = res.data
      }
    })
  },
  methods: {
    handleLogout () {
      if (logOut()) {
        this.$router.push('/clerk/login')
      }
    }
  }
}
</script>

<style scoped lang="less">
.clerk-info {
  padding: 16px;
}

.clerk-info .description {
  font-size: 14px;

  p {
    margin: 0;
  }
}
</style>
