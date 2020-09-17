<template>
    <div class="dashboard-editor-container" id="diceng">
        <el-row class="row1">

            <el-col :span="24"><h1>个人资料 </h1></el-col>
        </el-row>
        <el-row class="row2">
            <el-col :span="6">
                <div class="grid-content">
                    <img :src="logo">
                </div>
            </el-col>
            <el-col :span="18" style="text-align: left" v-if="!modify">
                <div class="grid-content">
                    <span>ID:{{user.id}}</span><el-link style="margin-left: 400px" type="primary" @click="modify=true">修改资料</el-link>
                    <p>昵称:{{user.name}}</p>
                    <p>邮箱:{{user.email}}</p>
                    <p>积分:{{user.score}}</p>
                    <p>荣誉值:{{user.reputation}}</p>
                </div>
            </el-col>
            <el-col :span="18" style="text-align: left" v-else>
                <el-form :model="user" class="form" ref="user" status-icon >
                    <el-form-item label="ID">
                        <el-input v-model="user.id" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item label="积分">
                        <el-input v-model="user.score" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="荣誉值">
                        <el-input v-model="user.reputation" disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateForm(user)">修改</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import logo from "@/assets/part3/userprofile.jpg"
    import {getuserinfo,updateuserinfo} from "@/api/part3";
    export default {
        name: "index",
        created(){
            this.$emit("label","userinfo");
            getuserinfo().then((res)=>{
                this.init(res.data.data);
                console.log("getuserinfo success!")
            }).catch(()=>{
                console.log("getuserinfo fail")
            });

        },
      mounted() {
       let tiankong= document.getElementById("diceng");
        tiankong.style.height=window.innerHeight+"px"
      },
      methods:{
            init(data){
                this.user.id = data.id;
                this.user.name = data.name;
                this.user.score = data.score;
                this.user.email = data.email;
                this.user.reputation = data.reputation;


            },
            updateForm(user){
                let data={}
                data.name = user.name;
                data.email = user.email;
                data.id  = this.user.id;
                updateuserinfo(data).then((res)=>{
                    this.init(res.data.data);
                    this.modify=false;
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    });
                    console.log("updateuserinfo success!")
                }).catch(()=>{
                    this.$message({
                        showClose: true,
                        message: '修改失败',
                        type: 'error'
                    });
                    console.log("updateuserinfo fail")
                })
            }

        },
        data(){
            return {
                logo:logo,
                user:{
                    id:"",
                    name:"",
                    score:"",
                    reputation:"",
                    email:""
                },
                modify: false
            }
        }
    }
</script>

<style scoped lang="stylus">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;


}
    .row1
        border-bottom: 1px solid #e0e0e0
        line-height 20px
    .row2
        border-bottom: 1px solid #e0e0e0

    h1 {text-align: left}
    img
        height 100px
        weight 100px
        margin-top 20px
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    p
        height 20px

    .form
        width 200px

</style>
