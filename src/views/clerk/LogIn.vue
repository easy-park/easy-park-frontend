<template>
  <a-form
    :form="form"
    class="login-form"
    @submit="handleSubmit">
    <a-avatar class="avatar" :size="64" icon="user"></a-avatar>
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [
              { required: true, message: '请输入手机号/邮箱' },
              { message: '格式错误', validator: validateUserName }
            ]
          }
        ]"
        size="large"
        placeholder="手机号/邮箱">
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] }
        ]"
        size="large"
        type="password"
        placeholder="密码">
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item class="login-btn-form-item">
      <a-button
        block
        size="large"
        :loading="isLoading"
        type="primary"
        html-type="submit"
        class="login-form-button">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { EMAIL as EMAIL_REGEXP, MOBILE_PHONE as MOBOILE_PHONE_REGEXP } from '@/util/regexp'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    validateUserName (rule, value, callback) {
      if (new RegExp(EMAIL_REGEXP).test(value) || new RegExp(MOBOILE_PHONE_REGEXP).test(value)) {
        console.log(value)
        callback()
      } else {
        callback(rule.message)
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLoading = true
          setTimeout(() => {
            this.isLoading = false
          }, 2000)
        }
      })
    }
  }
}
</script>

<style>
.login-form {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  padding: 24px;
}

.avatar {
  margin: 24px auto;
  background-color: #1890ff;
}

.login-btn-form-item {
  padding: 0 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>
