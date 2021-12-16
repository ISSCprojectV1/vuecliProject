<template>
  <div>
    <div style="display: inline-block; font-size: 40px;">关联性系统风险</div>

    <div>
      <el-button size="small" style="margin: 0.5rem 0" @click="goBack">返回</el-button>
    </div>

    <tab-associated></tab-associated>
  </div>
</template>

<script>
import tabAssociated from "@/components/part1/PolicyRisk/tabAssociated";

export default {
  name: "viewAssociated",
  components: {tabAssociated},
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