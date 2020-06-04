<template>
<el-row class="tac" style="height: 100%">
  <el-col :span="12" style="height: 100%">

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >

      <el-menu-item index="/Dashboard">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="/transactionProject">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>网络图</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/transactionProject/echarts">网络图</el-menu-item>
          <el-menu-item index="/transactionProject/processQuery">搜索功能</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/riskPrediction">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>风险评估</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/riskPrediction/riskPrediction">风险预测图</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>>

<script>
  export default {
    data() {
      return {

      };
    },
       mounted(){
            console.log(11)
            this.defaultActive = this.$router.currentRoute.path
        },
        created(){
            console.log(22)
            console.log(this.$router.currentRoute);
            //this.defaultActive = this.$router.currentRoute.path
        },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>
