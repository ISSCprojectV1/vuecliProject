<template>
  <div class="login">
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="accountId">
        <el-input type="text" placeholder="请输入账号" v-model="form.accountId"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-radio-group v-model="form.role">
          <el-radio label="user">普通用户</el-radio>
          <el-radio label="admin">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
      <el-link type="primary" v-on:click="onRegister()">注册</el-link>
    </el-form>

    <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>账号或密码错误！请检查后重新登陆！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {setToken, getToken, setUserTrue, getUserTrue, setAdminTrue, getAdminTrue} from "@/utils/auth"
import {
  getRolenameById
} from "@/api/part1/Multimodal-multigranularity";


export default {
  name: "Login",
  data() {
    return {
      form: {
        accountId: '',
        password: '',
        role: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        accountId: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ],
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能，用于表单基本validation（必填项是否填充等）
      this.$refs[formName].validate(valid => {
        if (valid) {
          const params = {
            accountId: this.form.accountId,
            password: this.form.password
          }
          this.loginDispatch(params)
        }
      });
    },
    // login dispatch via user.js
    loginDispatch(params) {
      this.$store.dispatch('login', params).then(res => {
        setToken(res.data.userid) // set token in cookies
        let url = '/getroles/' + res.data.userid

        // 根据id获取role并设置cookies
        this.getRoleById(url)
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '【登录失败】请检查账号密码',
          type: 'error'
        });
      })
    },
    // 根据id获取role并设置cookies
    getRoleById(url) {
      getRolenameById(url).then(res => {
        if (!res.data.roleList)
          return

        let roleList = res.data.roleList
        for (let i = 0; i < roleList.length; i++) {
          if (roleList[i].roleName === 'user')  // 登录角色为user
            setUserTrue("true")
          else // 登录角色为admin
            setAdminTrue("true")
        }

        // 根据用户选择的登录角色进入不同页面，进入前首先通过cookies判断用户role
        if (this.form.role === 'admin') { // 用户希望进入admin界面
          if (getAdminTrue())  // 当前用户是admin，允许进入
            this.$router.push('/admin')
          else // 当前用户不是是admin，不允许进入
            this.$message({
              showClose: true,
              message: '您没有权限',
              type: 'error'
            });
        } else { // 用户希望进入trade界面，无需判断role
          this.$router.push('/trade/Dashboard')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 注册
    onRegister() {
      this.$router.push("/register");
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("~@/assets/part1/background2.jpg");
  background-size: cover;
}

.login-box {
  background: #ffffff;
  opacity: 0.97;
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 160px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
