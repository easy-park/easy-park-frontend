<template>
  <a-layout>
    <title-header :title="title" :showLeftButton="true"></title-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import TitleHeader from '@/components/clerk/TitleHeader'
export default {
  components: { TitleHeader },
  data () {
    return {
      title: ''
    }
  },
  created () {
    const { title } = this.$route.meta
    this.title = title || this.title
  }
}
</script>
