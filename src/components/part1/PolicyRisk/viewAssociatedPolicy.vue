<template>
  <div>
    <div style="display: inline-block; font-size: 40px;">关联政策</div>

    <div>
      <el-button size="small" style="margin: 0.5rem 0" @click="goBack">返回</el-button>
    </div>

    <tab-associated-policy></tab-associated-policy>
  </div>
</template>

<script>
import tabAssociatedPolicy from "@/components/part1/PolicyRisk/tabAssociatedPolicy";

export default {
  name: "viewAssociatedPolicy",
  components: {tabAssociatedPolicy},
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