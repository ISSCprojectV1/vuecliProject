<template>
<el-row class="tac" style="height: 100%; width: 200px">
  <el-col style="height: 100%">

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" style="height: 800px">

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
          <el-menu-item index="/transactionProcess">搜索功能</el-menu-item>
          <el-menu-item index="/map">地图功能</el-menu-item>
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

        <el-submenu index="/Taskinput">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>模态与粒度</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/Taskinput">任务属性</el-menu-item>
        </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/Time_granularity">时间粒度</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
          <el-menu-item index="/taskQuery">监管任务</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/modalityQuery">模态任务</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/taskExecutionQueryByid">元任务查询（BY ID）</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/ExecutionQuery">元任务查询（列表）</el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <el-menu-item index="/granularityExecution">粒度调整执行</el-menu-item>
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
.el-menu-vertical-demo{
  padding:0px;
  margin:0px;
  border:0px;
}
</style>
