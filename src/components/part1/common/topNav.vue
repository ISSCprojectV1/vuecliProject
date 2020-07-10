<template>
<div>
<el-row>
<el-col :span="22">
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  router
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
 <el-menu-item index="/Dashboard"><img :src="headImg" class="img">大宗商品交易平台</el-menu-item>
  <el-menu-item index="/Dashboard">工作台</el-menu-item>
  <el-submenu index="2" class = "memu-part-two">
    <template slot="title">激励机制</template>
    <el-menu-item index="/userinfo">用户主页</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu >
  <el-menu-item index="3" disabled>无权限查看</el-menu-item>
</el-menu>
</el-col>

<el-col :span = "2">
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  router
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"
  >
  <el-submenu index="4" class = "memu-part-four">
    <template slot="title">{{userName}} <img :src="userimg" class="img userprofile"></template>
     <el-menu-item index="/user/userInfo">个人主页</el-menu-item>
    <el-menu-item divided index="2-2">退出登录</el-menu-item>
  </el-submenu>
</el-menu>
</el-col>
</el-row>
</div>
</template>

<script>
import headImg from "@/assets/part3/seu.png"
import userImg from "@/assets/part1/userImg.jpg"
  export default {
    data() {
      return {
        headImg:headImg,
        userimg:userImg,
        userName:"admin"
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
    .userAccount{
      float: right;
      color:#fff;
    }

</style>