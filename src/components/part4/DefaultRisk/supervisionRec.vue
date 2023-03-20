<template>
  <div>
    <!-- 参数设置 -->
    <el-card class="box-card">
      <div slot="header" class="box-card-header">
        <span>监管推荐参数设置</span>
      </div>
      <el-radio-group v-model="supervisionMode">
        <el-radio-button label="global">全品类监管</el-radio-button>
        <el-radio-button label="local">单品类监管</el-radio-button>
      </el-radio-group>

      <!-- 全品类监管参数 -->
      <el-form v-if="supervisionMode === 'global'">
        全品类
      </el-form>

      <!-- 单品类监管参数 -->
      <el-form v-if="supervisionMode === 'local'">
        单品类
      </el-form>

    </el-card>

    <el-card class="box-card">
      <div slot="header" class="box-card-header">
        <span>监管推荐详细信息</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "supervisionGRec",
  data() {
    return {
      supervisionMode: 'global',
    }
  },
}
</script>

<style scoped>
.box-card {
  width: 80%;
  margin: 2rem auto;
}

.box-card-header {
  text-align: left;
  font-weight: bold;
}

/deep/ .box-card-no-padding .el-card__body {
  padding: 0
}

/deep/ .el-radio-button__inner {
  font-weight: bold;
  font-size: initial;
}

/deep/ .el-radio-button .el-radio-button__inner {
  color: black;
}

/deep/ .el-radio-button.is-active .el-radio-button__inner {
  color: white;
}
</style>
