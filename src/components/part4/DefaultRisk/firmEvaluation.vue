<template>
  <div>
    <!--交易主体情况统计-->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>交易主体情况统计</span>
      </div>

      <el-row style="margin-left: 5rem; margin-right: 5rem">
        <el-col :span="8">
          <button class="transparent-button" @click="onClickRiskI">
            <el-progress type="circle" :percentage="l1Percentage" :stroke-width="10"
                         stroke-linecap="square"
                         :format="formatProgressNum" color="orange" :width="90" class="orange-progress"></el-progress>
            <p class="progress-text">风险评级I<br/>交易主体数</p>
          </button>
        </el-col>
        <el-col :span="8">
          <button class="transparent-button" @click="onClickRiskII">
            <el-progress type="circle" :percentage="l2Percentage" :stroke-width="10" stroke-linecap="square"
                         :format="formatProgressNum" color="gold" :width="90" class="gold-progress"></el-progress>
            <p class="progress-text">风险评级II<br/>交易主体数</p>
          </button>
        </el-col>
        <el-col :span="8">
          <button class="transparent-button" @click="onClickRiskIII">
            <el-progress type="circle" :percentage="l3Percentage" :stroke-width="10" stroke-linecap="square"
                         :format="formatProgressNum" color="lightgreen" :width="90"
                         class="green-progress"></el-progress>
            <p class="progress-text">风险评级III<br/>交易主体数</p>
          </button>
        </el-col>
      </el-row>
    </el-card>

    <!--交易主体查询-->
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="box-card-header">
        <span>交易主体查询</span>
      </div>

      <el-input v-model="QueriedEntityName" placeholder="请输入名称">
        <template slot="prepend">交易主体名称</template>
        <el-button slot="append" @click="onQueryEntity">查询</el-button>
      </el-input>
    </el-card>

    <!--交易主体信息表格-->
    <el-card v-if="noQuery" shadow="hover" class="box-card box-card-no-padding">
      <el-table
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}"
          :data="tableData">
        <el-table-column prop="id" label="交易主体ID" min-width="100"></el-table-column>
        <el-table-column prop="name" label="交易主体名称" min-width="100"></el-table-column>
        <el-table-column prop="riskLevel" label="风险评级" min-width="100"></el-table-column>
      </el-table>
    </el-card>

    <!--交易主体查询结果-->
    <el-card v-if="!noQuery" shadow="hover" class="box-card" style="height: 460px">
      <div slot="header" class="box-card-header">
        <span>交易主体评估信息</span>
      </div>

      <el-row :gutter="2">
        <el-col :span="5" style="padding-top: 1rem">
          <div style="margin-top: auto; margin-bottom: auto">
            <el-progress type="circle" :percentage="100" :stroke-width="10" color="lightgreen" stroke-linecap="square"
                         :format="formatScore" :width="150" class="green-score"></el-progress>
            <p class="progress-text">守约分</p>
          </div>
        </el-col>
        <el-col :span="12" style="padding-left: 3rem">
          <el-form label-position="right" label-width="auto" size="mini" class="firm-info-form">
            <el-form-item label="交易主体ID">
            {{ entityData.id }}
            </el-form-item>
            <el-form-item label="交易主体名称">
            {{ entityData.name }}
            </el-form-item>
            <el-form-item label="风险评级">
            {{ entityData.riskLevel }}
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="7">
          <div id="chart"></div>
          <p class="progress-text">违约风险级联关系图</p>
        </el-col>
      </el-row>

    </el-card>
  </div>
</template>

<script>
import G6 from '@antv/g6';
import {getEntitiesByLevel, getEntityByName, getEntityCountPerLevel} from '@/api/part4/DefaultRisk/firmEvaluation';

export default {
  name: "firmEvaluation.vue",
  data() {
    return {
      /* 交易主体情况统计数据 */
      countTotalEntity: 0,
      countsPerLevel: [],

      /* 查询相关 */
      noQuery: true,
      QueriedEntityName: '',

      score: 91,
      tableData: [],

      /* 交易主体评估信息 */
      entityData: [],
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
    getEntityCountPerLevel().then(res => {
      this.countsPerLevel = res.data;
      this.countTotalEntity = res.data.reduce((sum, num) => sum + num, 0);
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
      getEntitiesByLevel(1).then(res => {
        this.tableData = res.data;
      });
    },
    onClickRiskII() {
      this.noQuery = true;
      getEntitiesByLevel(2).then(res => {
        this.tableData = res.data;
      });
    },
    onClickRiskIII() {
      this.noQuery = true;
      getEntitiesByLevel(3).then(res => {
        this.tableData = res.data;
      });
    },
    // 查询交易主体信息
    onQueryEntity() {
      this.noQuery = false;
      getEntityByName(this.QueriedEntityName).then(res => {
        this.entityData = res.data;
      });
      // this.drawChart();
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
      return percentage * this.countTotalEntity / 100;
    },
    // 格式化交易主体信息得分文本
    formatScore() {
      return this.score;
    }
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
</style>
