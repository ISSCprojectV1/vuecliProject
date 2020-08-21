<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px">
        <el-breadcrumb-item v-for="urlPath in currentUrl" :key="urlPath">{{urlPath}}</el-breadcrumb-item>
        <el-button @click="logOut" >登出</el-button>
    </el-breadcrumb>
    </div>
</template>

<script>
    import {removeToken} from "@/utils/auth";

    export default {
        name: "header",
        data(){
            return {
                dict:{
                    "":"",
                    "admin":"系统管理",
                    "user":"用户管理",
                    "role":"角色管理",
                    "menu":"菜单管理",
                    "auction":"拍卖管理"
                }
            }
        },
        computed:
            {
            currentUrl(){
                let urls = this.$route.path.split("/");
                for(let i=0;i<urls.length;i++)
                {
                    const path = urls[i]
                    urls[i] = this.dict[path]
                }
                return urls
            }
        },
        methods:{
            logOut(){
                removeToken();
                this.$router.push("/login")
            }
        }
    }
</script>

<style scoped>

</style>
