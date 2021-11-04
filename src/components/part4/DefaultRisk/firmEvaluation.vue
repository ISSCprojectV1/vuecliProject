<template>
  <div>
    <!--用户情况统计-->
    <el-card class="box-card">
      <div slot="header" class="box-card-header">
        <span>用户情况统计</span>
      </div>

      <el-row style="margin-left: 5rem; margin-right: 5rem">
        <el-col :span="8">
          <el-progress type="circle" :percentage="10" :stroke-width="10" stroke-linecap="square"
                       color="orange" :width="90"></el-progress>
          <p class="progress-text">风险评级I<br/>用户数</p>
        </el-col>
        <el-col :span="8">
          <el-progress type="circle" :percentage="15" :stroke-width="10" stroke-linecap="square"
                       color="gold" :width="90"></el-progress>
          <p class="progress-text">风险评级II<br/>用户数</p>
        </el-col>
        <el-col :span="8">
          <el-progress type="circle" :percentage="75" :stroke-width="10" stroke-linecap="square"
                       color="lightgreen" :width="90"></el-progress>
          <p class="progress-text">风险评级III<br/>用户数</p>
        </el-col>
      </el-row>
    </el-card>

    <!--用户查询-->
    <el-card class="box-card">
      <div slot="header" class="box-card-header">
        <span>用户查询</span>
      </div>

      <el-input placeholder="请输入用户UID" maxlength="50">
        <template slot="prepend">用户UID</template>
        <el-button slot="append">查询</el-button>
      </el-input>
    </el-card>

    <!--用户信息表格-->
    <el-card class="box-card box-card-no-padding">
      <el-table
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}">
        <el-table-column prop="company" label="用户UID" min-width="100"></el-table-column>
        <el-table-column prop="company" label="用户名称" min-width="100"></el-table-column>
        <el-table-column prop="company" label="风险评级" min-width="100"></el-table-column>
        <el-table-column prop="company" label="用户评分" min-width="100"></el-table-column>
        <el-table-column prop="company" label="主要问题" min-width="100"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "firmEvaluation.vue",
  methods: {
    getHeaderStylesheet() {
      return {
        'background-color': '#f8f8f8',
        'color': '#909399',
        'font-weight': 'bold',
        'padding-top': '20px',
        'padding-bottom': '20px',
      }
    },
  }
}
</script>

<style scoped>
.box-card {
  width: 80%;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
}

.box-card-header {
  text-align: left;
  font-weight: bold;
}

.progress-text {
  font-weight: bold;
}

/deep/.box-card-no-padding .el-card__body {
  padding: 0
}
</style>