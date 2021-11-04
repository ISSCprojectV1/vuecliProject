<template>
  <div>
    <div style="display: inline-block; font-size: 40px;">业内政策</div>

    <div>
      <el-button size="small" style="margin: 0.5rem 0" @click="goBack">返回</el-button>
    </div>

    <tab-industry-policy></tab-industry-policy>
  </div>
</template>

<script>
import tabIndustryPolicy from "@/components/part1/PolicyRisk/tabIndustryPolicy";

export default {
  name: "viewIndustryPolicy",
  components: {tabIndustryPolicy},
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