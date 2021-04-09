<template>
  <div class = "register">
    <el-form ref="registerForm" :model="form" :rules="rules" class="login-box">
      <h3 class="register-title">新用户注册</h3>
      <el-form-item label="账号" prop="accountId" ref="accountId" >
        <el-input type="text" placeholder="请输入账号" v-model="form.accountId"/>
      </el-form-item>
      <el-form-item label="用户名" prop="name"  ref="name">
        <el-input type="text" placeholder="请输入用户名" v-model="form.name"/>
      </el-form-item>
      <el-form-item label="密码" prop="password" ref="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" v-on:click="onSubmit('registerForm')">注册</el-button>
      </el-form-item>
        <el-link type="primary" v-on:click="backLogin()">返回登录页面</el-link>

    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>信息填写不符合规范，请检查后重新登陆！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import {newregister} from "../../api/part1/common.js"
import loginByEmail from "@/api/part1/common.js"
  export default {
    name: "Register",
    data() {
      return {
        form: {
          accountId:'',
          name: '',
          password: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          accountId: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '用户名不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(registerForm) {
        // 为表单绑定验证功能
        this.$refs[registerForm].validate((valid) => {
          if (valid) {

            console.log(this.$refs.name)
            console.log(this.$refs.password)
        let data = registerForm;
            let dataa={
              "accountId":this.$refs.accountId.fieldValue,
              "name":this.$refs.name.fieldValue,
              "password":this.$refs.password.fieldValue,


            }
            console.log(dataa)
        console.log(data.accountId)
            console.log(data.name)
            console.log(data.password)

            console.log(data);

            newregister(dataa)
       .then(res=>{
        console.log('res=>',res);
        if(res.data.status == 200){
         console.log('响应结果：'+ res.data.message);
         // 注册成功，回到登录页面
         this.$router.push("/login");
          }else{
          console.log("登陆失败");
          this.dialogVisible = true;
          return false;
               }
            })
          } else {
            this.dialogVisible = true;
            return false;
          }
        });
      },
      backLogin(){
         this.$router.push("/login");
      }
    }
  }
</script>

<style lang="scss" scoped>
.register{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("~@/assets/part1/background2.jpg");
  background-size: cover;
}
  .login-box {
    border: 1px solid #DCDFE6;
    background: #ffffff;
    opacity:0.97;
    width: 350px;
    margin: 110px auto;
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
