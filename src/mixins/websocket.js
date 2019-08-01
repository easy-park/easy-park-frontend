const websocket = {
  mounted () {
    const vm = this
    let retryTimes = 5
    const url = `${process.env.VUE_APP_WEBSOCKET_BASE_URL}WebSocket`
    function retry () {
      const websocket = new WebSocket(url)
      websocket.onmessage = function () {
        vm.refreshData()
      }
      websocket.onerror = function () {
        if (--retryTimes > 0) {
          retry()
        }
      }
      vm.$once('hook:beforeDestroy', function () {
        websocket.close()
      })
    }
    retry()
  },
  methods: {
    refreshData () {}
  }
}

export {
  websocket
}
