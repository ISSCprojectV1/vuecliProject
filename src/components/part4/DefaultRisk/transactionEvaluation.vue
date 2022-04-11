<template>
  <div>
    <!--交易情况统计-->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>交易情况统计</span>
      </div>

      <el-row style="margin-left: 5rem; margin-right: 5rem">
        <el-col :span="8">
          <button class="transparent-button" @click="onClickRiskI">
            <el-progress type="circle" :percentage="l1Percentage" :stroke-width="10" stroke-linecap="square"
                         :format="formatProgressNum" color="orange" :width="90" class="orange-progress"></el-progress>
            <p class="progress-text">风险评级I<br/>交易数</p>
          </button>
        </el-col>
        <el-col :span="8">
          <button class="transparent-button" @click="onClickRiskII">
            <el-progress type="circle" :percentage="l2Percentage" :stroke-width="10" stroke-linecap="square"
                         :format="formatProgressNum" color="gold" :width="90" class="gold-progress"></el-progress>
            <p class="progress-text">风险评级II<br/>交易数</p>
          </button>
        </el-col>
        <el-col :span="8">
          <button class="transparent-button" @click="onClickRiskIII">
            <el-progress type="circle" :percentage="l3Percentage" :stroke-width="10" stroke-linecap="square"
                         :format="formatProgressNum" color="lightgreen" :width="90"
                         class="green-progress"></el-progress>
            <p class="progress-text">风险评级III<br/>交易数</p>
          </button>
        </el-col>
      </el-row>
    </el-card>

    <!--交易查询-->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>交易查询</span>
      </div>

      <el-input placeholder="请输入内容" v-model="queriedId">
        <template slot="prepend">交易ID</template>
        <el-button slot="append" @click="onQueryTxn">查询</el-button>
      </el-input>
    </el-card>

    <!--交易信息表格-->
    <el-card v-if="noQuery" shadow="hover" class="box-card box-card-no-padding">
      <el-table
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}"
          :data="mainTableData">
        <el-table-column prop="id" label="交易ID" min-width="35">
          <template v-slot="scope">
            <el-link type="primary" @click="onClickTxnId(scope.row.id)">
              {{ scope.row.id }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="buyerName" label="卖方" min-width="110"></el-table-column>
        <el-table-column prop="sellerName" label="卖方" min-width="110"></el-table-column>
        <el-table-column prop="category" label="交易品类" min-width="50"></el-table-column>
        <el-table-column prop="unitPrice" label="交易单价" min-width="35"></el-table-column>
        <el-table-column prop="amount" label="交易量" min-width="30"></el-table-column>
        <el-table-column prop="score" label="守约评分" min-width="35">
          <template v-slot="scope">
            <span v-if="scope.row.riskLevel===1" style="color: orange; font-weight: bold">{{ scope.row.score }}</span>
            <span v-else-if="scope.row.riskLevel===2" style="color: gold; font-weight: bold">{{
                scope.row.score
              }}</span>
            <span v-else style="color: lightgreen; font-weight: bold">{{ scope.row.score }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--交易查询结果-->
    <el-card v-if="!noQuery" shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>交易评估信息</span>
      </div>

      <el-row type="flex" :gutter="20">

        <!--守约分-->
        <el-col :span="6">
          <div style="margin-top: auto; margin-bottom: auto">
            <el-progress type="circle" :percentage="100" :stroke-width="10"
                         :color="txnData.riskLevel===1?'orange':(txnData.riskLevel===2?'gold':'lightgreen')"
                         stroke-linecap="square"
                         :format="()=>txnData.score" :width="150"
                         :class="txnData.riskLevel===1?'orange-score':(txnData.riskLevel===2?'gold-score':'green-score')"></el-progress>
            <p class="progress-text">守约分</p>
          </div>
        </el-col>

        <el-col :span="8" style="margin: auto">
          <el-form label-position="right" label-width="auto" size="mini" class="firm-info-form">
            <el-form-item label="交易ID">
              {{ txnData.id }}
            </el-form-item>
            <el-form-item label="交易品类">
              {{ txnData.category }}
            </el-form-item>
            <el-form-item label="交易单价">
              {{ txnData.unitPrice }}
            </el-form-item>
            <el-form-item label="交易量">
              {{ txnData.amount }}
            </el-form-item>
            <el-form-item label="风险评级">
              <template>
                <span v-if="txnData.riskLevel===1" style="color: orange; font-weight: bold">
                  一级风险
                </span>
                <span v-else-if="txnData.riskLevel===2" style="color: gold; font-weight: bold">
                  二级风险
                </span>
                <span v-else style="color: lightgreen; font-weight: bold">
                  三级风险
                </span>
              </template>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="12">
          <el-form label-position="right" label-width="auto" size="mini" class="firm-info-form">
            <el-form-item label="卖方名称">
              {{ txnData.sellerName }}
            </el-form-item>
            <el-form-item label="卖方风险评级">
              <template>
                <span v-if="sellerRiskLevel===1" style="color: orange; font-weight: bold">
                  一级风险
                </span>
                <span v-else-if="sellerRiskLevel===2" style="color: gold; font-weight: bold">
                  二级风险
                </span>
                <span v-else style="color: lightgreen; font-weight: bold">
                  三级风险
                </span>
              </template>
            </el-form-item>
            <el-form-item label="买方名称">
              {{ txnData.buyerName }}
            </el-form-item>
            <el-form-item label="买方风险评级">
              <template>
                <span v-if="buyerRiskLevel===1" style="color: orange; font-weight: bold">
                  一级风险
                </span>
                <span v-else-if="buyerRiskLevel===2" style="color: gold; font-weight: bold">
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
    </el-card>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import {
  calcTxnOnlineRisk, getTxnOnlineById,
  getTxnOnlineByLevel,
  getTxnOnlineCountPerLevel
} from "@/api/part4/DefaultRisk/txnOnlineEvaluation";
import {getEntityByName} from "@/api/part4/DefaultRisk/entityEvaluation";

export default {
  name: "transactionEvaluation.vue",
  data() {
    return {
      /* 交易情况统计数据 */
      countTotalTxn: 0,
      countsPerLevel: [],
      mainTableData: [],

      /* 查询相关 */
      noQuery: true,
      queriedId: '',

      /* 交易评估信息 */
      txnData: [],
      sellerRiskLevel: 0,
      buyerRiskLevel: 0,
    }
  },
  computed: {
    l1Percentage: function () {
      return this.countsPerLevel[0] * 100 / this.countTotalTxn || 0;
    },
    l2Percentage: function () {
      return this.countsPerLevel[1] * 100 / this.countTotalTxn || 0;
    },
    l3Percentage: function () {
      return this.countsPerLevel[2] * 100 / this.countTotalTxn || 0;
    }
  },
  created() {
    calcTxnOnlineRisk().then(() => {
      getTxnOnlineCountPerLevel().then(res => {
        this.countsPerLevel = res.data;
        this.countTotalTxn = res.data.reduce((sum, num) => sum + num, 0);
      });
      this.onClickRiskI();
    });
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
      getTxnOnlineByLevel(1).then(res => {
        this.mainTableData = res.data;
      });
    },
    onClickRiskII() {
      this.noQuery = true;
      getTxnOnlineByLevel(2).then(res => {
        this.mainTableData = res.data;
      });
    },
    onClickRiskIII() {
      this.noQuery = true;
      getTxnOnlineByLevel(3).then(res => {
        this.mainTableData = res.data;
      });
    },
    // 查询交易信息
    onClickTxnId(id) {
      this.queriedId = id;
      this.onQueryTxn();
    },
    onQueryTxn() {
      this.noQuery = false;
      getTxnOnlineById(this.queriedId).then(res => {
        this.txnData = res.data;
        getEntityByName(this.txnData.sellerName).then(res => {
          this.sellerRiskLevel = res.data.riskLevel;
        })
        getEntityByName(this.txnData.buyerName).then(res => {
          this.buyerRiskLevel = res.data.riskLevel;
        })
      });
    },
    // 绘制G6关系图
    drawChart() {
      // 绘制前先清除
      if (document.getElementById("chart"))
        document.getElementById("chart").innerHTML = '';

      const data = {
        nodes: [
          {id: 'node1', size: 30},
          {id: 'node2', size: 30},
          {id: 'node3', size: 30},
          {id: 'node6', size: 15, isLeaf: true},
          {id: 'node7', size: 15, isLeaf: true},
          {id: 'node8', size: 15, isLeaf: true},
          {id: 'node9', size: 15, isLeaf: true},
          {id: 'node10', size: 15, isLeaf: true},
          {id: 'node11', size: 15, isLeaf: true},
          {id: 'node12', size: 15, isLeaf: true},
          {id: 'node13', size: 15, isLeaf: true},
          {id: 'node14', size: 15, isLeaf: true},
          {id: 'node15', size: 15, isLeaf: true},
          {id: 'node16', size: 15, isLeaf: true},
        ],
        edges: [
          {source: 'node1', target: 'node6'},
          {source: 'node1', target: 'node7'},
          {source: 'node2', target: 'node8'},
          {source: 'node2', target: 'node9'},
          {source: 'node2', target: 'node10'},
          {source: 'node2', target: 'node11'},
          {source: 'node2', target: 'node12'},
          {source: 'node2', target: 'node13'},
          {source: 'node3', target: 'node14'},
          {source: 'node3', target: 'node15'},
          {source: 'node3', target: 'node16'},
        ],
      };
      const nodes = data.nodes;

      const graph = new G6.Graph({
        container: 'chart',
        width: 300,
        height: 300,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'lasso-select'],
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: (d) => {
            if (d.source.id === 'node0') {
              return 300;
            }
            return 60;
          },
          nodeStrength: (d) => {
            if (d.isLeaf) {
              return -50;
            }
            return -10;
          },
          edgeStrength: (d) => {
            if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {
              return 0.7;
            }
            return 0.1;
          },
        },
      });

      graph.data({
        nodes,
        edges: data.edges.map(function (edge, i) {
          edge['id'] = 'edge' + i;
          return Object.assign({}, edge);
        }),
      });

      graph.render();

      // 添加轮廓
      let centerNodes = graph.getNodes().filter((node) => !node.getModel().isLeaf);

      graph.on('afterlayout', () => {
        const hull1 = graph.createHull({
          id: 'centerNode-hull',
          type: 'bubble',
          members: centerNodes,
          padding: 10,
        });

        const hull2 = graph.createHull({
          id: 'leafNode-hull1',
          members: ['node6', 'node7'],
          padding: 10,
          style: {
            fill: 'lightgreen',
            stroke: 'green',
          },
        });

        const hull3 = graph.createHull({
          id: 'leafNode-hull2',
          members: ['node8', 'node9', 'node10', 'node11', 'node12', 'node13'],
          padding: 10,
          style: {
            fill: 'lightgreen',
            stroke: 'green',
          },
        });

        graph.on('afterupdateitem', (e) => {
          hull1.updateData(hull1.members);
          hull2.updateData(hull2.members);
          hull3.updateData(hull3.members);
        });
      });
    },
    // 格式化情况统计圆环文本
    formatProgressNum(percentage) {
      return percentage * this.countTotalTxn / 100;
    },
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
