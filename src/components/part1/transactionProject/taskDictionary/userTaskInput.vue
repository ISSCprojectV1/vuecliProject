<template>
    <div style="width: 100%;height: 800px">
        <h2 class="red"> 监管与服务任务-- </h2>
        <div class="block" style="height:80px;text-align:left">
  <el-form ref="form" :model="form" label-width="130px">
   <el-form-item label="监管与服务地区">
    <el-select v-model="priority" placeholder="请选择监管省份">
      <el-option label="山东" value="1"></el-option>
      <el-option label="上海" value="2"></el-option>
      <el-option label="广西" value="3"></el-option>
    </el-select>
    <el-select v-model="priority" placeholder="请选择监管市级地区">
      <el-option label="全省范围" value="1"></el-option>
      <el-option label="上海" value="2"></el-option>
      <el-option label="广西" value="3"></el-option>
    </el-select>
  </el-form-item>

   <el-form-item label="监管种类">
    <el-select v-model="targetId" placeholder="请选择监管种类">
      <el-option label="钢铁" value="1"></el-option>
      <el-option label="棉花" value="2"></el-option>
      <el-option label="石油" value="3"></el-option>
     <el-option label="重金属" value="4"></el-option>
    </el-select>
    监管周期
      <el-date-picker type="date" placeholder="选择开始日期" v-model="dateStart" style="width: 200px;" ></el-date-picker>
      <el-date-picker type="date" placeholder="选择结束日期" v-model="dateEnd" style="width: 200px;" value-format="yyyy-MM-dd"></el-date-picker>
  </el-form-item>

<el-form-item label="监管任务类型">
    <el-select v-model="priority" placeholder="请选择任务类型">
      <el-option label="制定执行任务" value="1"></el-option>
      <el-option label="信贷监管" value="2"></el-option>
      <el-option label="交易监管" value="3"></el-option>
      <el-option label="市场监管" value="4"></el-option>
    </el-select>
  </el-form-item>

<el-button type="success" @click="postAddress">立即创建</el-button>
<el-button type="info" @click="abortForm">取消创建</el-button>
</el-form>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="任务集" name="taskTree">
        <taskDictionary></taskDictionary>
    </el-tab-pane>
    <el-tab-pane label="监管联盟图" name="graph">
      <echarts></echarts>
    </el-tab-pane>
    <el-tab-pane label="监管任务图" name="others">
       <policy :url="activeName" v-if="isUpdatastrategy" />
      <method1></method1>
    </el-tab-pane>
  </el-tabs>
        </div>
    </div>
</template>

<script>
    import echarts from "@/components/part1/transactionProject/echarts";
    import method1 from "@/components/part1/transactionProject/taskDictionary/method1";
    import taskDictionary from "@/components/part1/transactionProject/taskDictionary/taskDictionary";
    export default {
        name: "Time_granularity",
        
        components: {
            taskDictionary,echarts,method1
            
        },
        mounted() {
            this.drawLine();
        },

         data() {
      return {
        activeName: 'taskTree',
        isUpdatastrategy:false
      };
    },

        methods: {
     handleClick(tab, event) {
        console.log(tab, event);
        if(this.activeName == 'others'){
        this.isUpdatastrategy = true;
    }
      }
        },

    }
</script>

<style scoped>
</style>
