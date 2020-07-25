<template>
    <div>
        <el-row>
            <el-col :span="16">
                <el-menu :router="true" class="el-menu" mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
                    <el-menu-item index="/trade/Dashboard"><img :src="logoimg" class="img">大宗商品交易平台</el-menu-item>
                    <el-menu-item index="/trade/Dashboard">工作台</el-menu-item>
                    <el-menu-item index="/console/index">个人中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">数据中心</template>
                        <el-menu-item index="/download">下载数据</el-menu-item>
                        <el-menu-item index="/console/uploadResources">上传数据</el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-col>
            <el-col :span="8" >
            <el-menu :router="true" class="el-menu" mode="horizontal" background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
                <el-menu-item >
                    <el-row class="demo-autocomplete">
                        <el-col :span="40">
                            <el-autocomplete
                                    class="inline-input"
                                    placeholder="请输入内容"
                            >
                                <i class="el-icon-search el-input__icon" slot="suffix"></i>
                            </el-autocomplete>
                        </el-col>
                    </el-row>
                                </el-menu-item>

                <el-submenu index="">
                    <template slot="title"><i class="el-icon-bell"></i><el-badge class="mark" is-dot /></template>
                    <el-menu-item index="2-1">
                        选项1<el-badge class="mark" :value="1" />
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        选项2<el-badge class="mark" :value="12" :max="10" />
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        选项3<el-badge class="mark" :value="1" />
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="/console/index"><img :src="userimg" class="img userprofile"></el-menu-item>
                <el-menu-item index="/console/index">
                    <el-button @click="logOut" >登出</el-button>
                </el-menu-item>

            </el-menu>
            </el-col>
        </el-row>



    </div>
</template>

<script>
    import logoimg from "@/assets/part3/seu.png"
    import userprofile from "@/assets/part3/userprofile.jpg"
    import {removeToken} from "@/utils/auth"

    export default {
        name: "Header",
        data() {
            return {
                logoimg: logoimg,
                userimg: userprofile
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logOut(){
                removeToken();
                this.$router.push("/login")
            }
        }
    }
</script>

<style scoped lang="stylus">
    .img{
        height 40px;
        width 40px;
    }
    .userprofile{
        border-radius:50%;
        height 20px;
        width 20px;
    }


</style>
