<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">

      <div class="formInput">
        <!-- 用户框 -->
        <el-form-item prop="username">
          <span class="svg-container el-icon-mobile-phone" />
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <!-- 用户框 -->
        <!-- 密码框 -->
        <el-form-item prop="password">
          <span class="svg-container el-icon-lock" />
          <el-input
            ref="pwd"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
          />
          <span class="show-pwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" style="font-size:18px" @click="iconBtn" />
          </span>
        </el-form-item>
        <!-- 密码框 -->
        <!-- 验证码 -->
        <el-form-item prop="code">
          <span class="svg-container el-icon-circle-check" />
          <el-input
            v-model="loginForm.code "
            placeholder="请输入验证码"
          />
          <span class="yanzheng" @click="checkPhoto"><img :src="mapSrc" alt=""></span>
        </el-form-item>
        <!-- 验证码 -->
        <!-- 登录按钮 -->
        <el-button :loading="loading" class="login" @click.enter="Login">登录</el-button>
      <!-- 登录按钮 -->
      </div>
      <img class="touxiang" src="@/assets/imgs/touxiang.png" alt="">

    </el-form>
  </div>
</template>

<script>
import { validUser } from '@/utils/validate'
import { getYzPhotoAPI } from '@/api/login'
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'Login',
  data() {
    const vlidate = (rule, value, callback) => {
      if (validUser(value)) {
        callback()
      } else {
        callback(new Error('手机号格式错误'))
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        code: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }, { validator: vlidate }],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { min: 6, max: 16, message: '密码长度为6-16位', trigger: 'blur' }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' },
          { message: '验证码错误', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      mapSrc: '',
      a: ''
    }
  },
  watch: {
  },
  created() {
    const id = uuidv4()
    this.a = id.toString().replace(/-/g, '')
    getYzPhotoAPI(this.a).then(d => {
      // console.log(d)
      if (d.data) { // 如果返回的有值，则使用返回的底图
        // 先将二进制的流转为blob，注意后面type一定要设置为图片格式
        const blob = new Blob([d.data], { type: 'image/jpeg' })
        var Fr = new FileReader()
        Fr.readAsDataURL(blob)
        Fr.onload = (e) => {
          // 这个就是转换为的base64图片地址
          this.mapSrc = e.target.result
        }
      }
    })
  },
  methods: {
    iconBtn() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    checkPhoto() {
      const id = uuidv4()
      this.a = id.toString().replace(/-/g, '')
      getYzPhotoAPI(this.a).then(d => {
        console.log(id)
        if (d.data) { // 如果返回的有值，则使用返回的底图
        // 先将二进制的流转为blob，注意后面type一定要设置为图片格式
          const blob = new Blob([d.data], { type: 'image/jpeg' })
          var Fr = new FileReader()
          Fr.readAsDataURL(blob)
          Fr.onload = (event) => {
          // 这个就是转换为的base64图片地址
            this.mapSrc = event.target.result
          }
        }
      })
    },
    async Login() {
      // console.log(1)
      try {
        this.loading = true
        await this.$store.dispatch('user/loginActions', {
          loginName: this.loginForm.username,
          password: this.loginForm.password,
          code: this.loginForm.code,
          clientToken: this.a,
          loginType: 0
        })
        this.$router.push('/')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

  }
}

/* reset element-ui css */
.login-container {
  background: url('~@/assets/imgs/background.png') no-repeat;
  background-size: cover;
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
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }

  }

 .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border: 1px solid #e2e2e2;
    border-radius: 5px;
    color: #454545;
    height: 52px;
}
}
.login{
    width: 100%;
    height: 56px;
    background:linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
}
.touxiang{
  position: absolute;
    width: 96px;
    height: 96px;
    top: 120px;
    left: 50%;
    margin-left: -48px;
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

.formInput{
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 20px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .yanzheng{
    position: absolute;
    top: 0;
    right: 0;
  }
}

</style>
