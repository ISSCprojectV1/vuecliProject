<template>
  <div>
    <!-- 参数设置 -->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>监管推荐参数设置</span>
      </div>

      <el-form :model="form" label-width="auto" label-position="top" :inline="true">

        <el-form-item label="监管模式">
          <el-radio-group v-model="form.supervisionMode">
            <el-radio-button label="global">全品类监管</el-radio-button>
            <el-radio-button label="local">单品类监管</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="目标交易品类" v-show="form.supervisionMode==='local'">
          <el-select v-model="form.targetCategory" placehoder="请选择">
            <el-option v-for="category in categories" :key="category" :label="category" :value="category"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易主体数量">
          <el-input-number v-model="form.k" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="操作">
          <el-button type="primary">查询监管推荐</el-button>

        </el-form-item>

      </el-form>

    </el-card>

    <el-card shadow="hover" class="box-card">
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
      form: {
        supervisionMode: 'global',
        targetCategory: '苯乙烯',
        k: 1,
      },
      categories: ['苯乙烯', '焦煤', '焦炭', '聚丙烯', '聚氯乙烯', '聚乙烯', '铁矿石', '液化石油气', '乙二醇'],
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

/*/deep/ .el-radio-button__inner {*/
/*  font-weight: bold;*/
/*  font-size: initial;*/
/*}*/

/*/deep/ .el-radio-button .el-radio-button__inner {*/
/*  color: black;*/
/*}*/

/*/deep/ .el-radio-button.is-active .el-radio-button__inner {*/
/*  color: white;*/
/*}*/
</style>
