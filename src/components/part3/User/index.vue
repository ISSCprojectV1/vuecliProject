<template>
    <div>
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
                    <p>性别:{{user.sex}}</p>
                    <p>邮箱:{{user.email}}</p>
                    <p>行业:{{user.industry}}</p>
                    <p>公司:{{user.company}}</p>
                    <p>简介:{{user.introduction}}</p>
                </div>
            </el-col>
            <el-col :span="18" style="text-align: left" v-else>
                <span>ID:{{user.id}}</span><el-link style="margin-left: 400px" type="primary" @click="modify=true">修改资料</el-link>
                <el-form :model="user" class="form" ref="user" status-icon >
                    <el-form-item label="昵称" prop="checkPass">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="checkPass">
                        <el-input v-model="user.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="checkPass">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item label="行业" prop="telephone">
                        <el-input v-model="user.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="公司" prop="email">
                        <el-input v-model="user.company"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="email">
                        <el-input v-model="user.introduction"></el-input>
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
            getuserinfo().then((res)=>{
                this.init(res.data.data);
                console.log("getuserinfo success!")
            }).catch(()=>{
                console.log("getuserinfo fail")
            });

        },
        methods:{
            init(data){
                this.user.id = data.id;
                this.user.name = data.name;
                this.user.score = data.score;
                this.user.email = data.email;

            },
            updateForm(user){
                let data={}
                data.name = user.name;
                data.email = user.email;
                data.id  = this.user.id;
                updateuserinfo(data).then((res)=>{
                    this.init(res.data.data);
                    this.modify=false;
                    console.log("updateuserinfo success!")
                }).catch(()=>{
                    console.log("updateuserinfo fail")
                })
            }

        },
        data(){
            return {
                logo:logo,
                user:{
                    id:1234,
                    score:88,
                    coin:99,
                    name:"",
                    email:"",
                    sex:"男",
                    industry:"",
                    company:"",
                    introduction:""
                },
                modify: false
            }
        }
    }
</script>

<style scoped lang="stylus">
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
