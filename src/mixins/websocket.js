import { store } from '@/store'

const websocket = {
  mounted () {
    const vm = this
    const url = `${process.env.VUE_APP_WEBSOCKET_BASE_URL}WebSocket/${this.currentLogInUser.id}`
    const websocket = new WebSocket(url)
    websocket.addEventListener('message', function () {
      vm.refreshData()
    })
    this.$once('hook:beforeDestroy', function () {
      websocket.close()
    })
  },
  computed: {
    currentLogInUser () {
      return store.state.user
    }
  },
  methods: {
    refreshData () {}
  }
}

export {
  websocket
}
