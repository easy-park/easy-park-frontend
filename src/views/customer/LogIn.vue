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
              { required: true, message: '请输入用户名/手机号' }
            ]
          }
        ]"
        size="large"
        placeholder="用户名/手机号">
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
      没有账号？<a href="javascript: void 0" @click="onSignUpClick">
        现在注册
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { MOBILE_PHONE as MOBOILE_PHONE_REGEXP } from '@/util/regexp'
import { logIn } from '@/api/customer/log-in'
import { BAD_REQUEST } from '@/api/status'

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
          const body = this.collectLoginInfo(values)
          logIn(body).then(res => {
            this.$message.success('登录成功')
            this.$router.push('/customer/home')
          }).catch((err) => {
            if (err.status === BAD_REQUEST) {
              this.$message.error('用户名或密码错误')
            }
          }).finally(() => {
            this.isLoading = false
          })
        }
      })
    },
    collectLoginInfo (values) {
      const ret = Object.assign({
        username: undefined,
        phoneNumber: undefined,
        password: undefined
      }, values)
      if (new RegExp(MOBOILE_PHONE_REGEXP).test(ret.username)) {
        ret.phoneNumber = ret.username
        ret.username = undefined
      }
      return ret
    },
    onSignUpClick () {
      this.$router.push('/customer/signup')
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
