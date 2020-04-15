<template>
  <div class="container">
    <el-card class="my-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <el-form :model="loginForm" ref="loginForm" :rules="loginRules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="please enter your mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input class="my-code" v-model="loginForm.code" placeholder="please eneter your code"></el-input>
          <el-button type="primary">send code</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已仔细阅和同意相关条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm">login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    var checkLogin = (rules, value, callback) => {
      (!/^1[3-9]\d{9}/.test(value)) && callback(new Error('Mobile format is wrong'))
      callback()
    }

    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: 'pealse enter your Mobile', trigger: 'blur' },
          { validator: checkLogin, trigger: 'blur' }
        ],
        code: [
          { required: true, message: 'pealse enter your code', trigger: 'blur' },
          { len: 6, message: 'please enter 6-digit verification code', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        valid &&
        this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          .then(res => {
            this.$router.push('/')
          })
          .catch(() => {
            this.$message.error('Mob or code wrong')
          })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  position: absolute;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
  }
  img {
    width: 200px;
    display: block;
    margin: 0 auto 30px;
  }
}
.my-code {
  width: 239px;
  margin-right: 10px;
 }
</style>
