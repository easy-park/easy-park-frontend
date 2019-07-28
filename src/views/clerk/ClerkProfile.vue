<template>
  <div class="clerk-info">
    <a-card hoverable>
      <img
        alt="example"
        src="@/assets/profile-bg.jpg"
        slot="cover"/>
      <a-card-meta
        :title="user.username">
        <a-avatar slot="avatar" icon="user"/>
        <div slot="description" class="description">
          <p>姓名：{{ user.name }}</p>
          <p>状态：{{ user.status | mapUserStatus }}</p>
        </div>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script>
import { IDLE, BUSY } from '@/api/clerk/clerk-status'
import { loadClerkProfile } from '@/api/clerk/clerk-profile'

export default {
  data () {
    return {
      user: {
        username: '123',
        name: '456',
        status: 0
      }
    }
  },
  filters: {
    mapUserStatus (status) {
      switch (status) {
        case IDLE: return '空闲'
        case BUSY: return '忙碌'
      }
      return ''
    }
  },
  beforeMount () {
    loadClerkProfile()
      .then(res => {
        this.user = res.data
      })
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
