import { store } from '@/store'

const websocket = {
  data () {
    return {
      __websocket: undefined
    }
  },
  mounted () {
    // WebSocket
    if ('WebSocket' in window) {
      const str = `${process.env.VUE_APP_WEBSOCKET_BASE_URL}WebSocket/${this.currentLogInUser.id}`
      this.__websocket = new WebSocket(str)
      this.initWebSocket()
    } else {
      alert('当前浏览器 Not support websocket')
    }
  },
  computed: {
    currentLogInUser () {
      return store.state.user
    }
  },
  beforeDestroy () {
    this.onbeforeunload()
  },
  methods: {
    initWebSocket () {
      this.__websocket.onerror = this.setErrorMessage
      this.__websocket.onopen = this.setOnopenMessage
      this.__websocket.onmessage = this.setOnmessageMessage
      this.__websocket.onclose = this.setOncloseMessage
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage () {
    },
    setOnopenMessage () {
    },
    setOnmessageMessage (event) {
      // 根据服务器推送的消息做自己的业务处理
    },
    setOncloseMessage () {
    },
    onbeforeunload () {
      this.closeWebSocket()
    },
    closeWebSocket () {
      this.__websocket.close()
    }
  }
}

export {
  websocket
}
