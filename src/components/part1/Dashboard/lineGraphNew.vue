<template>
  <div style="width: 100%; height: 550px">
    <el-form :inline="true">
      <el-form-item>
        <el-autocomplete
            v-model="value"
            :fetch-suggestions="querySearch"
            placeholder="请输入查询商品"
            @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickQuery">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickQueryRelation">查询关联商品</el-button>
      </el-form-item>
    </el-form>
    <div id="chart-risk-prediction"
         style="width: 93%; height: 480px; margin-left: auto; margin-right: auto; float: left"></div>
    <!--  图例 begin  -->
    <div style="margin-left: auto; margin-right: auto; padding-top: 10px">
      <p style="text-align: center; width: 50px; float: left; font-size: 14px">高风险</p>
      <canvas id="legend" width="50" height="380" style="float: left; margin-left: auto; margin-right: auto;"></canvas>
      <p style="text-align: center; width: 50px; float: left; font-size: 14px">低风险</p>
    </div>
    <!--  图例 end  -->

    <el-dialog :visible.sync="dialogFormVisible" width="30%" :title="value + '关联商品'" center>
      <el-table :data="formRelation"
                :default-sort="{prop: 'similarity', order: 'descending'}"
                height="400px" stripe>
        <el-table-column
            prop="name"
            label="关联商品">
          <template slot-scope="scope">
            <a @click="onClickRelatedCommodity(scope.row.name)" style="color: blue; cursor: pointer">{{
                scope.row.name
              }}</a>
          </template>
        </el-table-column>
        <el-table-column
            prop="similarity"
            label="相关度" sortable>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import echarts from 'echarts'
import {riskAlarmService} from "@/api/part1/acpassTask";

import {getcommodityRelationdetails2} from "@/api/part1/Multimodal-multigranularity";

export default {
  name: "lineGraphNew",
  data() {
    return {
      options: [],
      formRisk: [],
      value: '',
      options2: [],
      formRisk2: [],
      formRelation: [],
      commodities: [], // 用于输入框补全建议
      dialogFormVisible: false
    }
  },
  mounted() {
    this.commodities = this.loadAll();
    riskAlarmService().then(res => {
      this.formRisk = res.data.map(item => {
        return {
          id: item.id,
          day: item.day.split('T')[0],
          code: item.code,
          closeprice: item.closeprice,
          risk: item.risk
        }
      })
      this.drawChartRiskPrediction()
      this.drawLegend()
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 画图
    drawChartRiskPrediction() {
      let chart = echarts.init(document.getElementById('chart-risk-prediction'))
      let pieces = []
      for (let i = 0; i < this.formRisk.length;) {
        let j = i + 1;
        if (this.formRisk[i].risk <= 0.333) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk <= 0.333)
              j++
            else
              break;
          pieces.push({gte: i, lt: j, color: 'green'})
        } else if (this.formRisk[i].risk <= 0.666) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk <= 0.666 && this.formRisk[j].risk > 0.333)
              j++
            else
              break;
          pieces.push({gte: i, lt: j, color: 'yellow'})
        } else {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk > 0.666)
              j++
            else
              break;
          pieces.push({gte: i, lt: j, color: 'red'})
        }
        i = j
      }

      let options = {
        title: {
          text: '小麦价格波动风险演化图',
          left: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        grid: {
          // y: '5%',
          // y2: '12%'
        },
        dataZoom: [{
          startValue: '2018-02-01',
          minSpan: 1,
          bottom: 0
        }, {
          type: 'inside'
        }],
        visualMap: {
          dimension: 0,
          pieces: pieces,
          outOfRange: {
            color: 'grey'
          },
          show: false
        },
        xAxis: {
          data: this.formRisk.map(item => {
            return item.day
          })
        },
        yAxis: {
          scale: true
        },
        series: [
          {
            type: 'line',
            symbol: 'circle',
            smooth: true,
            data: this.formRisk.map(item => {
              return item.closeprice
            })
          }
        ]
      };

      chart.setOption(options);
    },
    // 输入框自动建议
    querySearch(queryString, cb) {
      let commodities = this.commodities;
      let results = queryString ? commodities.filter(this.createFilter(queryString)) : commodities;
      cb(results); // 调用callback返回建议列表的数据
    },
    createFilter(queryString) {
      return (commodity) => {
        return (commodity.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      }
    },
    handleSelect() {
      this.onClickQuery()
    },
    // 点击查询按钮
    onClickQuery() {
      riskAlarmService().then(res => {
        this.formRisk = res.data.map(item => {
          return {
            id: item.id,
            day: item.day.split('T')[0],
            code: item.code,
            closeprice: item.closeprice,
            risk: item.risk
          }
        })
        this.drawChartRiskPrediction()
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击查询关联商品按钮
    onClickQueryRelation() {
      let URL = "/getcommodityRelationdetails/" + this.value;
      getcommodityRelationdetails2(URL).then(res => {
        this.formRelation = res.data.map(item => {
          return {
            name: item.name2,
            similarity: item.similarity
          }
        })
        this.dialogFormVisible = true;
      }).catch(err => {
        console.log(err)
      })
    },
    // 点击查询结果表项
    onClickRelatedCommodity(name) {
      this.value = name
      this.dialogFormVisible = false
      this.drawChartRiskPrediction()
    },
    // 绘制图例渐变矩形
    drawLegend() {
      let legend = document.getElementById("legend");
      let context = legend.getContext("2d");
      // 创建渐变对象：线性渐变
      let grd = context.createLinearGradient(0, 0, 0, 400);
      // 设置渐变颜色及方式
      grd.addColorStop(0, "red");
      grd.addColorStop(0.3, "orange");
      grd.addColorStop(0.6, "yellow");
      grd.addColorStop(1, "green");
      // 将填充样式设置为渐变对象
      context.fillStyle = grd;
      context.fillRect(5, 0, 40, 400);
    },
    loadAll() {
      return [{"value": '锡'},
        {"value": '锌'},
        {"value": '铜'},
        {"value": '铅'},
        {"value": '镍'},
        {"value": '铝'},
        {"value": '白银99.99'},
        {"value": '黄金99.99'},
        {"value": '螺纹钢'},
        {"value": '原油（中）'},
        {"value": '聚乙烯'},
        {"value": '天然橡胶（TSR20）'},
        {"value": '尿素硝酸铵'},
        {"value": '甲醇'},
        {"value": '天然气'},
        {"value": '动力煤'},
        {"value": '焦煤'},
        {"value": '铁矿石'},
        {"value": '焦炭'},
        {"value": '可可'},
        {"value": '鸡蛋'},
        {"value": '活猪'},
        {"value": '豆粕'},
        {"value": '豆油'},
        {"value": '早籼稻'},
        {"value": '油菜籽'},
        {"value": '棉花一号'},
        {"value": '菜籽油'},
        {"value": '菜籽粕'},
        {"value": '白糖'},
        {"value": '大豆'},
        {"value": '玉米'},
        {"value": '小麦'},
        {"value": '强筋小麦'}]
    }
  }
}
</script>

<style scoped>

</style>