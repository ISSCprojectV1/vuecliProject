<template>
  <div class = "login">
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="accountId"  ref="accountId">
        <el-input type="text" placeholder="请输入账号" v-model="form.accountId"/>
      </el-form-item>
      <el-form-item label="密码" prop="password" ref="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
         <el-link type="primary" style="margin-left:10px" v-on:click="onRegister()">注册</el-link>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>账号或密码错误！请检查后重新登陆！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="温馨提示"
      :visible.sync="messageVisible"
      width="30%"
      :before-close="handleClose">
      <span>账号或密码错误！请检查后重新登陆！</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="messageVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import {newlogin} from "../../api/part1/common.js"

import loginByEmail from "@/api/part1/common.js"
  export default {
    name: "Login",
    data() {
      return {
        form: {
          accountId: '',
          password: ''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          accountId: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
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
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {

            let dataa={
              "accountId":this.$refs.accountId.fieldValue,
              "password":this.$refs.password.fieldValue,

            }

        let data = formName;
      /*  console.log(dataa)
           newlogin(dataa).then((res) => {
              console.log(res.data);
            }).catch(()=>{
              console.log("getPredictionData fail")
            });*/
      //  axios.post('api/login',dataa)

            newlogin(dataa).then((res) => {
 console.log("aaa")
        console.log('res=>',res);
        if(res.status == 200){
         console.log('响应结果：'+ res.data.message);
         this.$router.push("/Dashboard");  
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
      onRegister(){
      this.$router.push("/Register");  
      }
    }
  }
</script>

<style lang="scss" scoped>
.login{
   display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("~@/assets/part1/background2.jpg");
  background-size: cover;
}
  .login-box {
    background: #ffffff;
    opacity:0.97;
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