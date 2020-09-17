<template>
    <div class="dashboard-editor-container"   id ="diceng">
        <el-form :model=user style="width: 500px">
            <el-form-item label-width="100px">
                    <span slot="label">
                <span class="span-box">
                    <i class="el-icon-s-custom ico-pre"></i>
                  <span>用户名：</span>
                </span>
              </span>
                <el-input v-model="user.username" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label-width="100px">
                    <span slot="label">
                <span class="span-box">
                    <i class="el-icon-lock ico-pre"></i>
                  <span>密码：</span>
                </span>
                    </span>
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(user)" >修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {changePassword, getuserinfo} from "@/api/part3";

    export default {
        name: "changePassword",
        created(){
            getuserinfo().then((res)=>{
                this.user.username = res.data.data.accountId
                this.user.id = res.data.data.id
            }).catch(()=>{
                console.log("getuserinfo fail")
            });

        },
      mounted() {
        let tiankong= document.getElementById("diceng");
        tiankong.style.height=window.innerHeight+"px"
          },
      data(){
            return {
                user:{
                    id:"",
                    username:"",
                    password:""
                }
            }
        },
        methods:{
            submitForm(userForm){
                changePassword({
                    id:userForm.id,
                    password:userForm.password
                }).then(()=>{
                    this.$message({
                        showClose: true,
                        message: '修改密码成功',
                        type: 'success'
                    });
                }).catch(()=>{
                    this.$message({
                        showClose: true,
                        message: '修改密码失败',
                        type: 'error'
                    });
                });
            }
        }
    }
</script>

<style scoped>
.dashboard-editor-container {
  padding: 32px;

  position: relative;


}
</style>
