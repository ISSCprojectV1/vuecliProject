<template>
  <div>
    <!--交易主体情况统计-->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>交易主体情况统计</span>
      </div>

      <div style="display: flex; justify-content: space-around; align-content: center">
        <button class="transparent-button" @click="onClickRiskI">
          <el-progress type="circle" :percentage="l1Percentage" :stroke-width="10"
                       stroke-linecap="square"
                       :format="formatProgressNum" color="orange" :width="90" class="orange-progress"></el-progress>
          <p class="progress-text">风险评级I 交易主体数<br/>（履约评估分 &lt; 60）</p>
        </button>
        <button class="transparent-button" @click="onClickRiskII">
          <el-progress type="circle" :percentage="l2Percentage" :stroke-width="10" stroke-linecap="square"
                       :format="formatProgressNum" color="gold" :width="90" class="gold-progress"></el-progress>
          <p class="progress-text">风险评级II 交易主体数<br/>（60 &le; 履约评估分 &lt; 80）</p>
        </button>
        <button class="transparent-button" @click="onClickRiskIII">
          <el-progress type="circle" :percentage="l3Percentage" :stroke-width="10" stroke-linecap="square"
                       :format="formatProgressNum" color="lightgreen" :width="90"
                       class="green-progress"></el-progress>
          <p class="progress-text">风险评级III 交易主体数<br/>（履约评估分 &ge; 80）</p>
        </button>
      </div>

    </el-card>

    <!--交易主体查询-->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>交易主体查询</span>
      </div>

      <el-input v-model="queriedEntityName" placeholder="请输入ID">
        <template slot="prepend">交易主体ID</template>
        <el-button slot="append" @click="onQueryEntity">查询</el-button>
      </el-input>
    </el-card>

    <!--交易主体信息表格-->
    <el-card v-if="noQuery" shadow="hover" class="box-card box-card-no-padding" key="mainTable">
      <div slot="header" class="box-card-header">
        <span>交易主体详情&nbsp;风险评级{{ currentLevel === 1 ? 'I' : (currentLevel === 2 ? 'II' : 'III') }}</span>
      </div>
      <el-table
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}"
          :data="mainTableData">

        <el-table-column prop="id" label="交易主体ID" min-width="100">
          <template v-slot="scope">
            <el-link type="primary" @click="onClickEntityName(scope.row.id)">
              {{ scope.row.id }}
            </el-link>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="name" label="交易主体名称" min-width="100">-->
        <!--          <template v-slot="scope">-->
        <!--            <el-link type="primary" @click="onClickEntityName(scope.row.name)">-->
        <!--              {{ scope.row.name }}-->
        <!--            </el-link>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column prop="score" label="履约评估分" min-width="100">
          <template v-slot="scope">
            <span v-if="scope.row.riskLevel===1" style="color: orange; font-weight: bold">{{ scope.row.score }}</span>
            <span v-else-if="scope.row.riskLevel===2" style="color: gold; font-weight: bold">{{
                scope.row.score
              }}</span>
            <span v-else-if="scope.row.riskLevel===3" style="color: lightgreen; font-weight: bold">{{
                scope.row.score
              }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--交易主体查询结果-->
    <el-card v-if="!noQuery" shadow="hover" class="box-card" style="height: auto">
      <div slot="header" class="box-card-header">
        <span>交易主体评估信息</span>
      </div>

      <el-row type="flex" :gutter="2">

        <!--履约评估分-->
        <el-col :span="5">
          <div
              style="margin-top: auto; margin-bottom: auto; display: flex; flex-direction: column; justify-content: center; align-content: center">
            <el-progress type="circle" :percentage="100" :stroke-width="10"
                         stroke-linecap="square"
                         :color="entityData.riskLevel===1?'orange':(entityData.riskLevel===2?'gold':'lightgreen')"
                         :format="()=>entityData.score" :width="150"
                         :class="entityData.riskLevel===1?'orange-score':(entityData.riskLevel===2?'gold-score':'green-score')"
                         style="margin-left:auto; margin-right: auto"></el-progress>
            <p class="progress-text">履约评估分</p>
          </div>
        </el-col>

        <!--交易主体信息表单-->
        <el-col :span="12" style="margin: auto">
          <el-form label-position="right" label-width="auto" size="mini" class="firm-info-form">
            <el-form-item label="交易主体ID">
              {{ entityData.id }}
            </el-form-item>
            <!--            <el-form-item label="交易主体名称">-->
            <!--              {{ entityData.name }}-->
            <!--            </el-form-item>-->
            <el-form-item label="风险评级">
              <template>
                <span v-if="entityData.riskLevel===1" style="color: orange; font-weight: bold">
                  一级风险
                </span>
                <span v-else-if="entityData.riskLevel===2" style="color: gold; font-weight: bold">
                  二级风险
                </span>
                <span v-else style="color: lightgreen; font-weight: bold">
                  三级风险
                </span>
              </template>
            </el-form-item>
          </el-form>
        </el-col>

      </el-row>

      <el-divider></el-divider>

      <div class="detail-subheader">采购情况表</div>

      <el-table
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}"
          :data="purchaseTableData"
          key="purchaseTable">
        <el-table-column prop="id" label="交易ID"></el-table-column>
        <!--        <el-table-column prop="sellerName" label="卖方名称" min-width="120"></el-table-column>-->
        <el-table-column prop="sellerId" label="卖方ID"></el-table-column>
        <el-table-column prop="category" label="采购品类"></el-table-column>
        <el-table-column prop="unitPrice" label="采购单价"></el-table-column>
        <el-table-column prop="amount" label="采购量"></el-table-column>
      </el-table>

      <div class="detail-subheader">销售情况表</div>

      <el-table
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}"
          :data="salesTableData"
          key="salesTable">
        <el-table-column prop="id" label="交易ID"></el-table-column>
        <!--        <el-table-column prop="buyerName" label="买方名称" min-width="120"></el-table-column>-->
        <el-table-column prop="buyerId" label="买方ID"></el-table-column>
        <el-table-column prop="category" label="销售品类"></el-table-column>
        <el-table-column prop="unitPrice" label="销售单价"></el-table-column>
        <el-table-column prop="amount" label="销售量"></el-table-column>
      </el-table>

      <!--关系图-->
      <!--      <div id="chart"></div>-->
      <!--      <div class="detail-subheader">交易关系图</div>-->

    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts5';
import {
  calcEntityRisk,
  getEntitiesByLevel,
  getEntityByName,
  getEntityCountPerLevel
} from '@/api/part4/DefaultRisk/entityEvaluation';
import {getAllPurchasesById, getAllSalesById} from '@/api/part4/DefaultRisk/txnOnlineEvaluation';

export default {
  name: "entityEvaluation.vue",
  data() {
    return {
      /* 交易主体情况统计数据 */
      countTotalEntity: 0,
      currentLevel: 0,
      countsPerLevel: [],
      mainTableData: [],

      /* 查询相关 */
      noQuery: true,
      queriedEntityName: '',

      /* 交易主体评估信息 */
      entityData: [],
      purchaseTableData: [],
      salesTableData: [],
    }
  },
  computed: {
    l1Percentage: function () {
      return this.countsPerLevel[0] * 100 / this.countTotalEntity || 0;
    },
    l2Percentage: function () {
      return this.countsPerLevel[1] * 100 / this.countTotalEntity || 0;
    },
    l3Percentage: function () {
      return this.countsPerLevel[2] * 100 / this.countTotalEntity || 0;
    },
  },
  created() {
    calcEntityRisk().then(() => {
      getEntityCountPerLevel().then(res => {
        this.countsPerLevel = res.data;
        this.countTotalEntity = res.data.reduce((sum, num) => sum + num, 0);
      });
    });
    this.onClickRiskI();
  },
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
    // 情况统计圆环点击事件
    onClickRiskI() {
      this.noQuery = true;
      this.currentLevel = 1;
      getEntitiesByLevel(1).then(res => {
        this.mainTableData = res.data;
      });
    },
    onClickRiskII() {
      this.noQuery = true;
      this.currentLevel = 2;
      getEntitiesByLevel(2).then(res => {
        this.mainTableData = res.data;
      });
    },
    onClickRiskIII() {
      this.noQuery = true;
      this.currentLevel = 3;
      getEntitiesByLevel(3).then(res => {
        this.mainTableData = res.data;
      });
    },
    // 表格中名字列点击事件
    onClickEntityName(name) {
      this.queriedEntityName = name;
      this.onQueryEntity();
    },
    // 查询交易主体信息
    onQueryEntity() {
      this.noQuery = false;
      this.queriedEntityName = this.queriedEntityName.trim();
      getEntityByName(this.queriedEntityName).then(res => {
        this.entityData = res.data;
        getAllPurchasesById(this.entityData.id).then(res => {
          this.purchaseTableData = res.data;
        });
        getAllSalesById(this.entityData.id).then(res => {
          this.salesTableData = res.data;
          console.log(this.salesTableData);
          // this.drawChart();
        });
      });
    },
    drawChart() {
      // 绘制前先清除
      let chartDom = document.getElementById('chart');
      // if (chartDom)
      //   chartDom.innerHTML = '';

      let chart = echarts.init(chartDom);

      // 构造data和links
      let data = [{
        name: this.entityData.name,
        category: 0,
      }];
      let links = [];
      let nodeSet = new Set();
      for (let purchase of this.purchaseTableData) {
        if (!nodeSet.has(purchase.sellerName)) {
          nodeSet.add(purchase.sellerName);
          data.push({
            name: purchase.sellerName,
            category: 1,
          });
        }
        links.push({
          source: data[0].name,
          target: purchase.sellerName,
        })
      }
      for (let sale of this.salesTableData) {
        if (!nodeSet.has(sale.buyerName)) {
          nodeSet.add(sale.buyerName);
          data.push({
            name: sale.buyerName,
            category: 1,
          });
        }
        links.push({
          source: sale.buyerName,
          target: data[0].name,
        })
      }

      let option = {
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 30,
            tooltip: {},
            edgeSymbol: ['none', 'arrow'],
            force: {
              repulsion: 600,
            },
            data: data,
            links: links,
            legend: ['交易主体', '交易对手'],
            categories: [0, 1],
          }
        ]
      };

      option && chart.setOption(option);
    },
    // 格式化情况统计圆环文本
    formatProgressNum(percentage) {
      return percentage * this.countTotalEntity / 100;
    },
    // 格式化交易主体信息得分文本
    formatScore() {
      return this.entityData.score;
    }
  }
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

.progress-text {
  font-weight: bold;
  text-align: center;
}

/deep/ .box-card-no-padding .el-card__body {
  padding: 0
}

/* 透明按钮，用于圆环 */
button.transparent-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

/* 交易主体情况统计圆环内部样式 */
/deep/ .orange-progress .el-progress__text {
  font-weight: bold;
  font-size: x-large !important;
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", Arial, sans-serif;
  color: orange;
}

/deep/ .gold-progress .el-progress__text {
  font-weight: bold;
  font-size: x-large !important;
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", Arial, sans-serif;
  color: gold;
}

/deep/ .green-progress .el-progress__text {
  font-weight: bold;
  font-size: x-large !important;
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", Arial, sans-serif;
  color: lightgreen;
}

/* 交易主体评估信息圆环内部样式 */
/deep/ .orange-score .el-progress__text {
  font-weight: bold;
  font-size: xxx-large !important;
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", Arial, sans-serif;
  color: orange;
}

/deep/ .gold-score .el-progress__text {
  font-weight: bold;
  font-size: xxx-large !important;
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", Arial, sans-serif;
  color: gold;
}

/deep/ .green-score .el-progress__text {
  font-weight: bold;
  font-size: xxx-large !important;
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", Arial, sans-serif;
  color: lightgreen;
}

/* 交易主体信息表单样式 */
.firm-info-form .el-form-item {
  text-align: left;
}

.detail-subheader {
  font-weight: bold;
  margin: 1rem 0;
}

#chart {
  width: 100%;
  height: 400px;
}
</style>
