<template>
  <div class="login-container">

    <el-form class="login-form" :model="loginForm"  :rules="loginRules" ref="loginForm">

      <div class="title-container">
        <h3 class="title">{{$t('login.title')}}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container-login">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" auto-complete="on" :placeholder="$t('login.username')"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" auto-complete="on" :placeholder="$t('login.password')"></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>

       <el-button type="primary" style="width:100%" @click.native.prevent="handleLogin" :loading="loading">{{$t('login.logIn')}}</el-button>
      <!-- <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="on"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm2.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item> -->
    </el-form>

  </div>
</template>

<script>
import {isvalidUsername} from '@/utils/validate'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码最少六位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
    }
  },
  methods: {
    handleLogin () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(res => {
            this.loading = false
            console.log(res)
          }).catch(() => {
            this.loading = false
          })
        } else {
          alert('error')
          return false
        }
      })
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    }
  }
}
</script>

<style lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container{
    position: fixed;
    width: 100%;
    height: 100%;
    background: $bg;
    .login-form{
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      margin: 120px auto;
      padding: 35px 35px 15px 35px;
      .title-container{
        position: relative;
        .title{
          font-size: 26px;
          font-weight: bold;
          text-align: center;
          color:$light_gray;
        }
      }
    }
    .svg-container{
      display: inline-block;
      color:$dark_gray;
      width: 30px;
      text-align:center;
      padding-left: 15px;
    }
}
</style>
