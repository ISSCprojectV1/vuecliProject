<template>
  <div>
    * 1.将鼠标悬空在任务节点上方，可显示详细任务信息 2.可拖动节点方便查看
    <method1 ref="method1_child"></method1>
  </div>
</template>

<script>
import method1 from "@/components/part1/transactionProject/taskDictionary/method1";

export default {
  name: "taskQueryFlowChart",
  components: {
    method1
  }
}
</script>

<style scoped>

</style>