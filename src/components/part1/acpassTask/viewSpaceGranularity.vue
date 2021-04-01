<template>
  <div>
    <div style="display: inline-block; font-size: 40px;">空间粒度详情</div>

    <div>
      <el-button size="small" style="margin: 0.5rem 0" @click="goBack">返回</el-button>
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