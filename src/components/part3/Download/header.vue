<template>
    <div>
    <el-menu mode="horizontal" router>
        <el-menu-item index="/download">
            下载首页
        </el-menu-item>
        <el-menu-item index="/mydownload/upload">
            我的资源
        </el-menu-item>
        <el-menu-item index="/mydownload/favs">
            我的收藏
        </el-menu-item>
        <el-menu-item index="/mydownload/download">
            已下载
        </el-menu-item>
        <el-menu-item index="/console/uploadResources" style="color: red">
            <i class="el-icon-upload2" style="color: red"></i>上传资源赚积分,得勋章
        </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>
