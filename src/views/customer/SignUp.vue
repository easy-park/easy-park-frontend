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
              { required: true, message: '请输入用户名' }
            ]
          }
        ]"
        size="large"
        placeholder="用户名">
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'name',
          {
            rules: [
              { required: true, message: '请输入姓名' }
            ]
          }
        ]"
        size="large"
        placeholder="姓名">
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'phone',
          {
            rules: [
              { required: true, message: '请输入手机号' },
              { message: '手机号格式错误', validator: validatePhoneNumber }
            ]
          }
        ]"
        size="large"
        placeholder="手机号">
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
          {
            rules: [
              { required: true, message: '请输入密码' },
              { validator: validateToNextPassword }
            ]
          },
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
    <a-form-item>
      <a-input
        v-decorator="[
          'confirmPassword',
          {
            rules: [{
              required: true, message: '请确认你的密码',
            }, {
              message: '两次输入的密码不一致', validator: compareToFirstPassword,
            }],
          }
        ]"
        size="large"
        type="password"
        placeholder="确认密码"
        @blur="handleConfirmBlur">
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item class="login-btn-form-item" style="text-align: center">
      <a-button
        block
        size="large"
        :loading="isLoading"
        type="primary"
        html-type="submit"
        class="login-form-button">注册</a-button>
      <a href="javascript: void 0" @click="onLogInClick">
        登录
      </a>
    </a-form-item>
  </a-form>
</template>

<script>
import { MOBILE_PHONE as MOBOILE_PHONE_REGEXP } from '@/util/regexp'
import { signUp } from '@/api/customer/sign-up'
import { BAD_REQUEST } from '@/api/status'

export default {
  data () {
    return {
      isLoading: false,
      confirmPasswordDirty: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    validatePhoneNumber (rule, value, callback) {
      console.log(value)
      if (value && !new RegExp(MOBOILE_PHONE_REGEXP).test(value)) {
        callback(rule.message)
      } else {
        callback()
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isLoading = true
          const body = this.collectLoginInfo(values)
          signUp(body).then(res => {
            this.$message.success('登录成功')
            this.$router.push('/customer/home')
          }).catch((err) => {
            if (err.status === BAD_REQUEST) {
              this.$message.error('用户名已存在')
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
    onLogInClick () {
      this.$router.push('/customer/login')
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(rule.message)
      } else {
        callback()
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form
      if (value && this.confirmPasswordDirty) {
        form.validateFields(['confirmPassword'], { force: true })
      }
      callback()
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmPasswordDirty = this.confirmPasswordDirty || !!value
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
