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
            <el-option v-for="category in categories" :value="category" :label="category" :key="category"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易主体数量">
          <el-input-number v-model="form.k" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="操作">
          <el-button type="primary" @click="onclick">查询监管推荐</el-button>

        </el-form-item>

      </el-form>

    </el-card>

    <el-card shadow="hover" class="box-card box-card-no-padding">
      <div slot="header" class="box-card-header">
        <span>监管推荐详细信息</span>
      </div>

      <div v-show="noQuery" style="text-align: center; margin: 20px 0; color: #909399; font-size: 14px;">请先进行查询
      </div>
      <div id="chart" style="width: 1040px; height: 800px;" v-show="!noQuery"></div>

      <el-table
          highlight-current-row
          :header-cell-style="getHeaderStylesheet"
          :row-style="{height: '40px'}"
          :cell-style="{padding:'0px'}"
          :data="tableData">

        <el-table-column prop="id" label="交易主体ID" min-width="100">
          <template v-slot="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column prop="score" label="履约评估分" min-width="100">
          <template v-slot="scope">
            <span v-if="scope.row.score<=60" style="color: orange; font-weight: bold">
              {{ scope.row.score }}
            </span>
            <span v-else-if="scope.row.score<=80" style="color: gold; font-weight: bold">
              {{ scope.row.score }}
            </span>
            <span v-else style="color: lightgreen; font-weight: bold">
              {{ scope.row.score }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts5';

export default {
  name: 'supervisionGRec',
  data() {
    return {
      form: {
        supervisionMode: 'global',
        targetCategory: '苯乙烯',
        k: 1,
      },
      categories: ['苯乙烯', '焦煤', '焦炭', '聚丙烯', '聚氯乙烯', '聚乙烯', '铁矿石', '液化石油气', '乙二醇'],
      noQuery: true,
      tableData: [],
    }
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
    onclick() {
      this.noQuery = false;
      this.draw();
    },
    draw() {
      let chart = echarts.init(document.getElementById('chart'));
      let data = {
        nodes: [
          {id: 30, name: 30, category: 2},
          {id: 37, name: 37, category: 2},
          {id: 49, name: 49},
          {id: 51, name: 51, category: 2},
          {id: 52, name: 52, category: 1},
          {id: 56, name: 56, category: 2},
          {id: 62, name: 62, category: 1},
          {id: 66, name: 66, category: 1},
          {id: 95, name: 95},
          {id: 103, name: 103, category: 1},
          {id: 104, name: 104},
          {id: 105, name: 105},
          {id: 109, name: 109, category: 2},
          {id: 117, name: 117, category: 1},
          {id: 118, name: 118},
          {id: 120, name: 120},
          {id: 122, name: 122, category: 1},
          {id: 125, name: 125, category: 1},
          {id: 129, name: 129, category: 1},
          {id: 134, name: 134},
          {id: 160, name: 160, category: 1},
          {id: 170, name: 170, category: 1},
          {id: 189, name: 189, category: 1},
          {id: 190, name: 190, category: 1},
          {id: 207, name: 207},
          {id: 245, name: 245, category: 1},
        ],
        links: [
          {source: '30', target: '51', weight: 13590},
          {source: '30', target: '129', weight: 13590},
          {source: '30', target: '245', weight: 54360},
          {source: '37', target: '62', weight: 716100},
          {source: '37', target: '125', weight: 11935},
          {source: '37', target: '160', weight: 656425},
          {source: '37', target: '189', weight: 214830},
          {source: '37', target: '190', weight: 787710},
          {source: '49', target: '95', weight: 67950},
          {source: '49', target: '109', weight: 27180},
          {source: '51', target: '37', weight: 179025},
          {source: '51', target: '62', weight: 3341800},
          {source: '51', target: '66', weight: 990605},
          {source: '51', target: '103', weight: 620620},
          {source: '51', target: '109', weight: 40770},
          {source: '51', target: '125', weight: 3640175},
          {source: '51', target: '189', weight: 1587355},
          {source: '56', target: '117', weight: 40770},
          {source: '56', target: '122', weight: 27180},
          {source: '109', target: '52', weight: 67950},
          {source: '109', target: '170', weight: 40770},
          {source: '118', target: '104', weight: 503600},
          {source: '118', target: '109', weight: 371405},
          {source: '118', target: '125', weight: 440650},
          {source: '120', target: '109', weight: 6295},
          {source: '134', target: '105', weight: 27180},
          {source: '207', target: '51', weight: 6564250},
          {source: '207', target: '125', weight: 119350},
        ],
        categories: [
          {name: '影响范围外节点'},
          {name: '影响范围内节点'},
          {name: '种子节点'},
        ],
      };
      let option = {
        // title: {
        //   text: '交易网络图',
        // },
        tooltip: {},
        legend: [
          {
            data: data.categories.map((a) => a.name),
            orient: 'vertical',
            right: 10,
          },
        ],

        series: [
          {
            type: 'graph',
            layout: 'force',
            draggable: true, // 节点可拖拽
            symbolSize: 30, // 节点大小
            emphasis: {
              focus: 'adjacency', // focus时高亮邻接关系
            },
            label: {
              show: true,
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSize: [4, 10],
            edgeLabel: {
              // 设置边label
              show: true,
              formatter(x) {
                return x.data.weight;
              },
            },
            data: data.nodes,
            links: data.links,
            categories: data.categories,
            force: {
              repulsion: 300,
              edgeLength: 150,
            },
            lineStyle: {
              curveness: 0.1,
            },
          },
        ],
      };
      chart.setOption(option);
      this.tableData = [
        {id: 30, score: 65},
        {id: 37, score: 49},
        {id: 51, score: 43},
        {id: 56, score: 52},
        {id: 109, score: 38},
      ];
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

/deep/ .box-card-no-padding .el-card__body {
  padding: 0
}
</style>
