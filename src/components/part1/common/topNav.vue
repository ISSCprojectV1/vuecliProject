<template>
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
 <el-menu-item index="headImg"><img :src="headImg" class="img">大宗商品交易平台</el-menu-item>
  <el-menu-item index="workSpace">工作台</el-menu-item>
  <el-submenu index="2">
    <template slot="title">激励机制</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" disabled>无权限查看</el-menu-item>
</el-menu>
</template>

<script>
import headImg from "@/assets/part3/seu.png"
  export default {
    data() {
      return {
        headImg:headImg
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped lang="stylus">
    .img{
        height 35px;
        width 40px;
    }

</style>