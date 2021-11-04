<template>
  <div>
    <h2>空间粒度详情</h2>
<!--    <div style="display: inline-block; font-size: 24px;">空间粒度详情</div>-->

    <div>
      <el-button size="small" @click="goBack">返回</el-button>
    </div>

    <tab-space-granularity></tab-space-granularity>
  </div>
</template>

<script>
import tabSpaceGranularity from "@/components/part1/acpassTask/tabSpaceGranularity";

export default {
  name: "viewSpaceGranularity",
  components: {tabSpaceGranularity},
  data() {
    return {}
  },
  methods: {
    goBack() {
      history.go(-1)
    }
  }
}
</script>

<style scoped>

</style>