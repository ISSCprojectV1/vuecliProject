<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose">
    <slot>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="网络属性" name="first">
          <table class="net_table" style="border:#121313 solid 2px">
              <tr>
                <el-tooltip class="item" effect="dark" content="反映舆情的热度" placement="left">
                  <td class="column_key">网络规模</td>
                </el-tooltip>
                <td class="column_value">{{NetFeatures.netsize}}</td>
              </tr>
            <tr>
              <el-tooltip class="item" effect="dark" content="反映网络中各节点彼此信息交流传播的紧密程度" placement="left">
                <td class="column_key">网络密度</td>
              </el-tooltip>
              <td class="column_value">{{NetFeatures.netdensity | numFilter}}</td>
            </tr>
            <tr>
                <td class="column_key">网络直径</td>
              <td class="column_value">{{NetFeatures.netdiameter}}</td>
            </tr>
            <tr>
              <el-tooltip class="item" effect="dark" content="反映网络中所有成员到达其他成员的平均最短距离，该值越大则说明网络的凝聚性越低" placement="left">
                <td class="column_key">网络平均距离</td>
              </el-tooltip>
              <td class="column_value">{{NetFeatures.netaveragedistance | numFilter}}</td>
            </tr>
            <tr>
              <el-tooltip class="item" effect="dark" content="反映网络集团化的程度，表征中心趋势" placement="left">
                <td class="column_key">网络聚类系数</td>
              </el-tooltip>
              <td class="column_value">{{NetFeatures.netclusteringcoefficient | numFilter}}</td>
            </tr>
          </table>
        </el-tab-pane>

        <el-tab-pane label="节点属性" name="second">
          <el-table :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                 style="width: 100%;border: #121313 solid 2px;"
                 border
                 highlight-current-row
                 :header-cell-style="{background:'#7a98b2',color:'black'}">
            <el-table-column table-column prop="nodeid" label="用户ID" ></el-table-column>
            <el-table-column table-column prop="nodename" label="节点名称" ></el-table-column>
            <el-table-column prop="nodedegree" label="度数中心性"  :render-header="renderTipsHeader"></el-table-column>
            <el-table-column prop="nodebetweenness" label="介数中心性"  :render-header="renderTipsHeader">
              <template slot-scope="scope">{{scope.row.nodebetweenness | numFilter}}</template>
            </el-table-column>
            <el-table-column prop="nodeproximity" label="接近中心性"  :render-header="renderTipsHeader">
              <template slot-scope="scope">{{scope.row.nodeproximity | numFilter}}</template>
            </el-table-column>
            <el-table-column prop="nodeclusteringcoefficient" label="聚类系数"   :render-header="renderTipsHeader">
              <template slot-scope="scope">{{scope.row.nodeclusteringcoefficient | numFilter}}</template>
            </el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="PageSize" layout="total, sizes, prev, pager, next"
              :total="dormitory.length">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </slot>
  </el-dialog>
</template>

<script>
import {getNetworkFeatures, getNodeFeatures} from "../../../api/part1/PublicOpinionsRisk";

export default {
  name: "FeaturesDetailDialog",
  props:{
    show:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default: '详情'
    }
  },
  data(){
    return{
      //dialog参数
      localShow:this.show,
      //tabs参数
      activeName:'first',
      //分页器参数
      currentPage:1,
      pageSizes:[5,10,15,20],
      PageSize:5,
      //网络属性
      NetFeatures:'',
      //节点属性
      dormitory:[],


    }
  },
  watch: {
    show (val) {
      this.localShow = val
    }
  },
  created() {
    this.getData_net();
    this.getData_node();
  },
  filters:{
    numFilter (value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(2)
    }
  },
  methods:{
    //*******************************************************************
    //dialog相关函数
    //*******************************************************************
    beforeClose () {
      this.close()
    },
    close () {
      this.$emit('close')
    },
    //*******************************************************************
    //悬浮提示框相关函数
    //*******************************************************************

    renderTipsHeader(h, {column}) {
      let content_label="测试";
      if(column.label==='度数中心性')
      {
        content_label='描述节点与其他节点直接交互的能力，衡量节点在网络中的重要性';
      }
      else if(column.label==='介数中心性')
      {
        content_label='描述节点对资源信息的控制程度，该值越大，在传播时更能决定信息的走向和流通。取值范围[0,1]';
      }
      else if(column.label==='接近中心性')
      {
        content_label='衡量节点不受其他节点控制的程度。取值范围[0,1]'
      }
      else if(column.label==='聚类系数')
      {
        content_label='描述网络中节点的邻居之间互为邻居的比例。取值范围[0,1]'
      }
      return (
          <el-tooltip
              class="item"
              effect="dark"
              content={content_label}
              placement="top"
          >
            <span>{column.label}</span>
          </el-tooltip>
      )
    },
    //*******************************************************************
    //分页器相关函数
    //*******************************************************************
    handleSizeChange(val)
    {
      this.PageSize=val;// 改变每页显示的条数
      this.currentPage=1;// 注意：在改变每页显示的条数时，要将页码显示到第一页
    },
    handleCurrentChange(val)
    {
      this.currentPage=val // 改变默认的页数
    },
    //*******************************************************************
    //网络属性表格数据相关函数
    //*******************************************************************
    getData_net()
    {
      getNetworkFeatures().then((res) => {
        console.log('获取网络属性!');
        this.NetFeatures=res.data;
      }).catch(() => {
        console.log("taskExecution fail netfeatures")
      })
    },
    //*******************************************************************
    //节点属性表格数据相关函数
    //*******************************************************************
    getData_node()
    {
      getNodeFeatures().then((res) => {
        console.log('获取节点属性!');
        this.dormitory=res.data;
      }).catch(() => {
        console.log("taskExecution fail nodefeatures")
      })
    },
  },

}
</script>

<style scoped>
.net_table{
  width: 100%;
  height: 100%;
  background: #ffffff;
  text-align: center;
}
.column_key{
  background: #7a98b2;
  color: #121313;
  font-size: 18px;
  font-weight: bolder;
  width: 40%;
  height: 50px;
}
.column_value{
  background: #ebeff5;
  color: #121313;
  font-size: 18px;
}
</style>