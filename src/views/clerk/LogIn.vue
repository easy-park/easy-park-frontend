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
          { rules: [{ required: true, message: '请输入手机号/邮箱' }] }
        ]"
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
        type="password"
        placeholder="密码">
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item class="form-item-login-btn">
      <a-button
        block
        type="primary"
        html-type="submit"
        class="login-form-button">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
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

.form-item-login-btn {
  padding: 0 24px;
}
</style>
