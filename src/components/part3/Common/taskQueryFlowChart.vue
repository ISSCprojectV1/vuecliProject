<template>
<div>
  <div>
    <el-button type="primary" @click="allocateTask" style="margin-left:15px;margin-right:14px">执行分配任务</el-button>
  </div>
  <div>

    * 1.将鼠标悬空在任务节点上方，可显示详细任务信息 2.可拖动节点方便查看
    <method1 ref="method1_child"></method1>
  </div>
</div>
</template>

<script>
import method1 from "@/components/part1/transactionProject/taskDictionary/method1";

export default {
  name: "taskQueryFlowChart",
  components: {
    method1
  },
  methods: {
    // 分配任务
    allocateTask(){
      this.$confirm('是否确认进行任务分配', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getAllocateDate();

        this.$message({
          type: 'success',
          message: '已执行分配!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
  }
}

</script>

<style scoped>

</style>