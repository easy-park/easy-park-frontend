<template>
  <a-form
    :form="form"
    class="login-form"
    @submit="handleSubmit">
    <a-avatar class="avatar" :size="64" icon="user"></a-avatar>
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          {
            rules: [
              { required: true, message: '请输入手机号/邮箱' }
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
import { login } from '@/api/clerk/login'

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
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLoading = true
          const body = Object.assign({
            username: undefined,
            email: undefined,
            phoneNumber: undefined,
            password: undefined
          }, values)
          if (new RegExp(EMAIL_REGEXP).test(body.username)) {
            body.email = body.username
            body.username = undefined
          } else if (new RegExp(MOBOILE_PHONE_REGEXP).test(body.username)) {
            body.phoneNumber = body.username
            body.username = undefined
          }
          login(body)
            .then(res => {
              if (res.status === 200 && res.msg === '登录成功') {
                this.$message.success('登录成功')
                this.$router.push('/')
              } else {
                this.$message.error('用户名或密码错误')
              }
            })
            .finally(() => {
              this.isLoading = false
            })
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
