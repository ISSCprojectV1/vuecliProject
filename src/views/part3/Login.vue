<template>
    <div>
        <div class="login">
            <h2>大宗商品交易中心</h2>
            <el-form :model=user>
                <el-form-item label-width="100px">
                    <span slot="label">
                <span class="span-box">
                    <i class="el-icon-s-custom ico-pre"></i>
                  <span>用户名：</span>
                </span>
              </span>
                    <el-input v-model="user.username"></el-input>
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
                <el-form-item label="">
                    <el-radio-group v-model="user.type">
                        <el-radio label="管理员"></el-radio>
                        <el-radio label="普通用户"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(user)" >登录</el-button>
                    <el-button @click="registry">注册</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div>
            <Dashboard>
            </Dashboard>

        </div>
    </div>
</template>

<script>

   // import Dashboard from "../part1/Dashboard";
    export default {
        name: "Login",
     //   components: {Dashboard},
        data(){
            return {
                user:
                    {
                    username: "",
                    password: "",
                        type: "",
                    }
            }
        },
        created(){
            if(this.$store.state.token==='123456')
                this.$router.push("/userinfo")
            console.log(this.$store.state.token)
        },
        methods:{
            registry(){
                this.$router.push("/registry")
            },
            submitForm(user){
                this.$store.dispatch('loginIn',{accountId:user.username,password:user.password}).then(()=>{
                    this.$router.push("/userinfo");
                    console.log("success!")
                }).catch(()=>{
                    this.$router.push("/hantina");
                  //  console.log("fail")
                })
            }
        }
    }
</script>

<style scoped>
    .login{
        width: 400px;
        height: 300px;
        margin:0px auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        padding:20px 40px 40px 20px;
        opacity: 1;
    }
    .span-box{
        display:inline-block;
        position:relative;
    }
    .ico-pre{
        position:absolute;
        left:-21px;
        top:12px;
    }
</style>
