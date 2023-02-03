<template>
  <div class="login-box">
    <el-card class="box-card">
      <div slot="header" class="clearfix header" ref="header">
        <span>黑马面经运营后台</span>
      </div>

      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="form"
        class="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <div style="text-align:center ;">
          <el-button type="primary" @click="doLogin">登录</el-button>
          <el-button @click="$refs.form.resetFields()">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      count: localStorage.getItem('count'),
      labelPosition: 'top',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 5,
            max: 11,
            message: '长度在 5 到 11 个字符',
            trigger: ['change', 'blue']
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 5,
            max: 11,
            message: '长度在 5 到 11 个字符',
            trigger: ['change', 'blue']
          }
        ]
      }
    }
  },
  methods: {
    async doLogin () {
      try {
        await this.$refs.form.validate()
        const res = await loginAPI(this.form)
        console.log(res)
        this.$store.commit('user/setToken', res.data.token)
        this.$message.success('登录成功')
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  background: url('@/assets/login-bg.svg') no-repeat center/cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .box-card {
    width: 450px;

    ::v-deep .el-card__header {
      padding: 0;

      .header {
        text-align: center;
        background: #727cf5;
        height: 80px;
        color: #fff;
        font-size: 18px;
        line-height: 80px;
      }
    }
  }
}
</style>
