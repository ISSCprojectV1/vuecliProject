<template>
    <div>
        <el-row>
            <el-col :span="3">
                <el-menu
                        default-active="/view_1_1"
                        class="el-menu-vertical-demo"
                        router
                        >

                    <el-menu-item index="/view_1_1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">第一模块</span>
                    </el-menu-item>
                    <el-menu-item index="/view_2_1">
                        <i class="el-icon-setting"></i>
                        <span slot="title">第二模块</span>
                    </el-menu-item>
                    <el-menu-item index="/test">
                        <i class="el-icon-document"></i>
                        <span slot="title">第三模块</span>
                    </el-menu-item>
                    <el-menu-item index="4" disabled>
                        <i class="el-icon-menu"></i>
                        <span slot="title">第四模块</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21">
                <div class="title">
                    <span>时光家教后台管理系统</span>
                    <el-button class="logout">登出</el-button>
                </div>
                <router-view></router-view>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .title {
        height: 80px;
        background: #fff;
        font-size: 32px;
        color: #333;
        line-height: 80px;
        border-bottom: 1px solid #333;
    }

    .logout {
        margin: 20px;
        float: right;
    }
</style>
