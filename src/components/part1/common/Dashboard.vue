<template>
  <div class="dashboard-editor-container" id="diceng">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-graph-new />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <bar-chart />
    </el-row>
  </div>
</template>

<script>
  import PanelGroup from '@/components/part1/Dashboard/panelGroup'
  import lineGraph from '@/components/part1/Dashboard/lineGraph'
  import lineGraphNew from "@/components/part1/Dashboard/lineGraphNew";
  import barChart from '@/components/part1/Dashboard/barChart'
  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  export default {
    name: 'Index',
    components: {
      PanelGroup,
      // lineGraph,
      lineGraphNew,
      barChart
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis
      }
    },
    mounted() {
      let tiankong= document.getElementById("diceng");
      console.log(window.innerHeight)
      console.log(document.body.scrollHeight)
      tiankong.style.height=(window.innerHeight>document.body.scrollHeight?window.innerHeight:document.body.scrollHeight)+"px"
      console.log(tiankong.style.height)
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
