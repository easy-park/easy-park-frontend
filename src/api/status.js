const STATUS_TAG = Symbol('STATUS_TAG')
const MESSAGE_TAG = Symbol('MESSAGE_TAG')

class Status {
  [STATUS_TAG]
  [MESSAGE_TAG]

  constructor (status, message) {
    this[STATUS_TAG] = status
    this[MESSAGE_TAG] = message
  }

  get STATUS () {
    return this[STATUS_TAG]
  }

  get MESSAGE () {
    return this[MESSAGE_TAG]
  }
}

const UNKNOWN_ERROR = new Status(0, '未知错误')
const BAD_REQUEST = new Status(400, '用户名或密码错误')
const FROZEN_ACCOUNT = new Status(800, '该账号已被冻结')

export {
  Status,
  UNKNOWN_ERROR,
  BAD_REQUEST,
  FROZEN_ACCOUNT
}
