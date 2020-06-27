<template>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 10px">
        <el-breadcrumb-item v-for="urlPath in currentUrl" :key="urlPath">{{urlPath}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "header",
        data(){
            return {
                dict:{
                    "":"",
                    "admin":"系统管理",
                    "user":"用户管理",
                    "role":"角色管理",
                    "menu":"菜单管理"
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
    }
</script>

<style scoped>

</style>
