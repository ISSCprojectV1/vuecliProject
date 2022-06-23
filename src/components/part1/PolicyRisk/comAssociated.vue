<template>
  <div>
    <div style="display: inline-block; margin-bottom:30px; font-size:40px">行业品种系统性风险传播</div>
    <div>
      <el-form :inline="true">
        <el-form-item label="事件影响的大小：">
          <el-select v-model="type" placeholder="请选择事件影响的大小" @change="$forceUpdate()">
            <el-option label="不定突发短期事件" value="不定突发短期事件"></el-option>
            <el-option label="重大冲击中期事件" value="重大冲击中期事件"></el-option>
            <el-option label="基本影响长期事件" value="基本影响长期事件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事件影响的品种：">
          <el-select v-model="commodity" placeholder="请选择品种源" @change="$forceUpdate()">
            <el-option v-for="(flat, index) in commodityList" :key="index" :label="flat.commodity"
              :value="flat.commodity">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onClickQuery()">确定</el-button>
        <el-button type="primary" @click="goback">返回</el-button>
      </el-form>
    </div>
    <el-container style="height: 800px; border: 10px solid #eee">
      <el-aside width="40%" style="border: 10px solid #eee">
        <div style="margin-left:20px;margin-right:20px">
          <el-table :data="dataBreed" highlight-current-row :header-cell-style="getHeaderStylesheet">
            <el-table-column label="序号" fixed="left" prop="id" min-width="30" align='center'></el-table-column>
            <el-table-column label="品种ID" prop="commodityInnerID" min-width="45" align='center'></el-table-column>
            <el-table-column label="品种名称" prop="productName" min-width="45" align='center'></el-table-column>
            <el-table-column label="系统性风险溢出等级" prop="riskLevel" min-width="70" align='center'>
              <template slot="header">
                <span>风险溢出等级 <el-button class="buttonclick" type="info" icon="iconfont icon-icon-test" size="mini"
                    circle @click="dialogVisible = true"></el-button></span>
              </template>
              <template slot-scope="scope">
                <span v-if="scope.row.riskLevel === '高'" style="color: red">{{ scope.row.riskLevel }}</span>
                <span v-else-if="scope.row.riskLevel === '中'" style="color: orange">{{ scope.row.riskLevel }}</span>
                <span v-else-if="scope.row.riskLevel === '低'" style="color: #00DB00">{{ scope.row.riskLevel }}</span>
              </template>
            </el-table-column>
            <el-table-column label="历史数据详情" min-width="60" align='center'>
              <template slot-scope="scope">
                <el-button type="text" @click="gotoHist(scope.row.commodityInnerId)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog title="风险等级说明" :visible.sync="dialogVisible" width="35%">
          <div style="color: red; font-size: 20px">高: 品种源对行业品种的传递熵大于0.7</div>
          <div style="color: orange; font-size: 20px">中: 品种源对行业品种的传递熵大于0.5小于0.7</div>
          <div style="color: #00DB00; font-size: 20px">低: 品种源对行业品种的传递熵小于0.5</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-aside>
      <el-aside width="60%" style="border: 10px solid #eee">
        <div style="margin-left:20px;margin-right:20px">
          <div id="chartHistory" style="
          width: 93%;
          height: 480px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 40px;
        "></div>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import * as echarts5 from "echarts5";
import { getCommodityList,getMessByName,getCommAss } from "@/api/part1/policyRisk";
export default {
  data() {
    return {
      options: [],
      type:'',
      commodity:'',
      dialogVisible: false,
      commodityList: [],
      commHis:[],
      dataBreed: []
    }
  },
  mounted() {
    getCommodityList().then((res) => {
      this.commodityList = res.data.data
    })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    goback() {
      this.$router.go(-1)
    },
    onClickQuery() {
      let type = this.type;
      let commodity = this.commodity;
      getCommAss(type,commodity).then((res) => {
          console.log("请求列表api成功");
          console.log(res);
          this.dataBreed = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          console.log("请求列表api失败");
        });
    },
    drawChartHistory() {
      let chart = echarts5.init(
        document.getElementById("chartHistory")
      );
      let option = {
        title: {
          text: '历史数据详情'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['价格', '交易量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.commHis.map((item) => {
            return item.tradedate;
          }),
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '价格',
            type: 'line',
            stack: 'Total',
            data: this.commHis.map((item) => {
            return item.averageprice;
          }),
          },
          {
            name: '交易量',
            type: 'line',
            stack: 'Total',
            data: this.commHis.map((item) => {
            return item.totalamount;
          }),
          },
        ]
      };
      chart.setOption(option);
    },
    gotoHist(commodityInnerId){
      getMessByName(commodityInnerId).then((res) => {
        this.commHis = res.data.data.map((item) => {
          return {
            tradedate: item.tradedate.split("T")[0],
            averageprice: item.averageprice,
            totalamount:item.totalamount
          };
        });
        this.drawChartHistory();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  watch:{
    show (type,commodity) {
          this.type = type;
          this.commodity = commodity;
    }
  }
}
</script>