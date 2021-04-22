<template>
  <div>
    <h2>大宗商品价格波动风险演化</h2>

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
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
    <el-form :inline="true" v-if="divVisible" >
      <el-form-item label="" name="pingji" style="text-align: center;">
        <template>
          <span v-if="this.row === '高风险'" style="color: red;font-size:20px">{{"明日风险等级："+ this.row }}</span>
          <span v-else-if="this.row === '低风险'" style="color: green;font-size:20px">{{"明日风险等级："+ this.row }}</span>
          <span v-else-if="this.row === '中风险'" style="color: orange;font-size:20px">{{ "明日风险等级："+this.row}}</span>
        </template>
      </el-form-item>
    </el-form>

    <div id="chart-risk-prediction"
         style="width: 93%; height: 480px; margin-left: auto; margin-right: auto; float: left;display:inline-block;"></div>
    <!--  图例 begin  -->
    <div style="margin-left: auto; margin-right: auto; padding-top: 10px;width: 50px;display:inline-block;">
      <p style="text-align: center; width: 50px; float: left; font-size: 14px">高风险</p>
      <canvas id="legend" width="50" height="380" style="float: left; margin-left: auto; margin-right: auto;"></canvas>
      <p style="text-align: center; width: 50px; float: left; font-size: 14px">低风险</p>
    </div>

    <!--  图例 end  -->
    <el-button type="primary" @click="onClickQueryRelation" style="margin-top: 2rem">查询关联商品</el-button>

    <el-dialog :visible.sync="dialogFormVisible" width="30%" :title="value + '关联商品'" center>
      <el-table :data="formRelation"
                :default-sort="{prop: 'similarity', order: 'descending'}" stripe>
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
import {getcommodityRelationdetails2} from "@/api/part1/Multimodal-multigranularity";
import * as echarts5 from "echarts5";
import {getDataRiskChart} from "@/api/part1/riskPrediction";

export default {
  name: "riskPageNew",
  data() {
    return {
      value: '小麦',
      options: [],
      formRisk: [],
      formRelation: [],
      commodities: [], // 用于输入框补全建议
      dialogFormVisible: false,
      row:'暂无',
      divVisible:false
    }
  },
  created() {

  },
  mounted() {
    console.log(this.$route.query)
    if(this.$route.query&&this.$route.query.data)
    {
      this.divVisible=true
      this.row=this.$route.query.data.info
 //     this.dealwithData(this.$route.query.data.info)
//document.getElementsByName("pingji").innerText="明日风险等级："+this.$route.query.data.info
//console.log(document.getElementsByName("pingji").innerText)
    }else
      this.divVisible=false
    this.commodities = this.loadAll();

    let commodityFromStore = this.$store.state.commodityForMonitoring;
    if (commodityFromStore)
      this.value = commodityFromStore;
    getDataRiskChart(this.value).then(res => {
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
    dealWithColor(data)
    {
      console.log("aaa")
      console.log(this.$route.query.data.info)
      if(data=="高风险")
    {
      return{
        color:"#2f2f2f"
      }

    }
      if(data=="中风险")
      {
        return{
          color:"#2f2f2f"
        }

      }
      if(data=="低风险")
      {
        return{
          color:"#2f2f2f"
        }

      }


    },
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
    onClickQuery() {
      getDataRiskChart(this.value).then(res => {
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
    goBack() {
      history.back();
    },
    drawChartRiskPrediction() {
      let chart = echarts5.init(document.getElementById('chart-risk-prediction'))
      let pieces = []
      for (let i = 0; i < this.formRisk.length;) {
        let j = i + 1;
        if (this.formRisk[i].risk <= 0.333) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk <= 0.333)
              j++;
            else
              break;
          pieces.push({gte: i, lt: j, color: 'green'})
        } else if (this.formRisk[i].risk <= 0.666) {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk <= 0.666 && this.formRisk[j].risk > 0.333)
              j++;
            else
              break;
          pieces.push({gte: i, lt: j, color: 'yellow'})
        } else {
          while (j < this.formRisk.length)
            if (this.formRisk[j].risk > 0.666)
              j++;
            else
              break;
          pieces.push({gte: i, lt: j, color: 'red'})
        }
        i = j;
      }

      let options = {
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            type: 'slider',
            start: 95,
            minSpan: 1
          },
          {
            type: 'inside'
          }
        ],
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
    onClickRelatedCommodity(name) {
      this.value = name
      this.dialogFormVisible = false
      this.drawChartRiskPrediction()
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