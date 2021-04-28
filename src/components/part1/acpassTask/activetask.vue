<template>
  <div>

    <div class="title">
      <div style="display: inline-block; margin-bottom:20px; font-size: 40px;">主被动模态详情</div>
    </div>

    <div>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="id" placeholder="请选择任务名称">
            <!--动态读取该品类对应的平台-->
            <el-option
                v-for="flat in taskInfo"
                :key="flat.id"
                :label="flat.id+'.'+flat.name"
                :value="flat.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="lookForAllTasks" class="button">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-tabs v-model="activeName">

      <el-tab-pane label="被动模态" name="passive"  v-if="passivemode">
        <el-table border style="width: 100%; margin-top: 1px"
                  :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                  :header-cell-style="headcell">
          <el-table-column prop="id" label="编号" width="50"></el-table-column>
          <el-table-column prop="buyerName" label="买方姓名" min-width="130"></el-table-column>
          <el-table-column prop="category" label="商品"></el-table-column>
          <el-table-column prop="amount" label="数量"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="sellerName" label="卖方姓名" min-width="130"></el-table-column>
          <el-table-column prop="belong" label="归属" min-width="100"></el-table-column>

        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="total1"
                       style="margin-top: 1rem">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="主动模态" name="table" v-if="activemode">
        <tab-active-modal></tab-active-modal>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import {
  activegraph,
} from "@/api/part1/acpassTask";
import {
  activetaskgraph,
  activetradeaction,
  getPassive,
  Louvainresult
} from "@/api/part1/acpassTask";
import echart from "echarts";
import tabActiveModal from "@/components/part1/acpassTask/tabActiveModal";
import {
  changetimeadvise,
  taskQuery,
  spaceResult,
  taskQueryById,
  getRolenameById
} from "@/api/part1/Multimodal-multigranularity";
/*          @current-change="pageChange1"
*           <el-table-column prop="tasksize" label="空间粒度"></el-table-column>
          <el-table-column prop="original" label="原生任务" v-if="activeOrPassive()"></el-table-column>
* */
export default {
  name: "activetask",
  components: {tabActiveModal},
  created() {
if(this.$route.query&&this.$route.query.data)
this.passive=true
    else this.passive=false


    taskQuery().then(res => {
      console.log("res")
      console.log(res)
      this.taskInfo = res.data.data
    }).catch(err => {
      console.log(err);
      console.log("出现错误")
    })
    const id = this.$router.currentRoute.params.id;

console.log(this.activeOrPassive())
    if (this.activeOrPassive()) {
      this.activeName = "table"
      //   activetradeaction(id).then(res => {
      //   this.dataTableActive = res.data.data
      //  this.handleData();
      //
      // }
 //   }
   // ).catch(err => {
    //    console.log(err);
    //    console.log("出现错误")
    //  })
    } else {
      this.activeName="passive"
      this.passivetradeactionList(id, 1, 5)
    }
  },
  data() {
    return {
      activeName: "table",
      total: 0,
      form: {},
      id: '',
      taskInfo: [],
      total1: 25,
      loading: false,
      show: false,
      Data: [],
      spanarray: [],
      currentPage: 1,
      // 条数选择器（可修改）
      pageSizes: [5, 10],
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      tableData: [],
      tableData3: [],
      total3: 0,
      // tab 1: active table
      dataTableActive: [],
      threshold: '',
      passive:false,
      activemode:true,
      passivemode:true,
      // tab gone: 交易事件图
      value_space_granularity: '',
      options: [{
        value: '省：',
        label: '省'
      }, {
        value: '市：',
        label: '市'
      }, {
        value: '平台：',
        label: '平台'
      }]
    }
  },
  mounted() {
    // const id = this.$router.currentRoute.params.id;
    // this.Activetaskgraph(id, 15);
    // document.getElementById("echart123").style.display = "none";
  },

  methods: {
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
    },
    headcell(){
      return {
        'background-color': '#dfdfdf',
        'color': 'rgb(96, 97, 98)',
        'font-weight':'bold',
        'font-size':'18px'
      }
    },
    passivetradeactionList(id, currentPage, pageSize) {
      getPassive(id, currentPage, pageSize).then(res => {
        console.log(res)
        this.tableData = res.data.data//.reslist
        let data = res.data.data//.reslist;
        this.total1 = res.data.data.length
        for (let i = 0; i < data.length; i++) {
          data[i].id = i + 1
        }
        this.tableData = data
        this.handleData();
      }).catch(err => {
        console.log(err);
        console.log("出现错误")
      })
    },
    handleData() {
      let cnt = 0;
      this.Data = [];
      this.spanarray = [];
      for (let i = 0; i < this.tableData.length; i++) {
        this.spanarray.push({
          row: cnt,
          num: this.tableData[i].length
        });
        for (let j = 0; j < this.tableData[i].length; j++) {
          cnt++;
          this.tableData[i][j]['group'] = i + 1;
          this.Data.push(this.tableData[i][j])
        }
      }
    },
    Activetaskgraph(id, limit) {
      Louvainresult(id, limit).then(res => {
        this.drawechart(res.data.data)
      }).catch(err => {
        console.log(err)
      })
      activetaskgraph(id, limit).then(res => {
        this.drawechart2(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    pageChange1(page) {
      const id = this.$router.currentRoute.params.id;
      this.currentPage = page;
      this.passivetradeactionList(id, page, 5)
    },
    onSubmit(limit) {
      const id = this.$router.currentRoute.params.id;
      const query_str = this.value_space_granularity + this.form.limit
      this.Activetaskgraph(id, query_str);
    },
    activeOrPassive() {
      console.log("passive"+this.passive)
      if(this.passive)
      {
        this.passivemode=true
        this.activemode=false
      }
      else
      {
        this.passivemode=false
        this.activemode=true
      }
 return !this.passive
    //  return this.$router.currentRoute.path.startsWith('/trade/acpassTask/activetradeaction')
    },
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      if (column.label === '编号' || column.label === '交易模式') {
        const condition = (element) => element['row'] === rowIndex;
        let index = this.spanarray.findIndex(condition)
        if (index !== -1) {
          return {
            rowspan: this.spanarray[index]['num'],
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    lookForAllTasks() {
      console.log(this.id)
    },
    gotoDetail(company) {
      document.getElementById("echart123").style.display = "block";
      document.getElementById("table23").style.display = "none";

      activegraph(company).then(res => {
        let myChart = echart.init(document.querySelector("#echart123"));

        let nodes = res.data[0].map(item => {
          if (item.id !== 0)
            return {
              id: item.id.toString(),
              name: item.name,
              company: item.company,
              category: 1
            }
          else
            return {
              id: item.id.toString(),
              name: item.name,
              company: item.company,
              category: 0
            }
        })

        let links = res.data[1].map(item => {
          return {
            source: item.source.toString(),
            target: item.target.toString(),
            lineStyle: {
              width: parseFloat(item.weight / 500) * 1.5 + 0.5
            }
          }
        })

        let categories = [{name: '异常节点'}, {name: '相关节点'}]
        let option = {
          color: ['#ef4f4f', '#5470c6'],
          legend: {
            tooltip: {
              show: true
            }
          },
          tooltip: {
            show: true,
            formatter: function (x) {
              if (x.data.source)
                return ''
              else
                return x.data.company
            }
          },
          series: [
            {
              type: 'graph',
              layout: 'force',
              label: {
                show: true
              },
              roam: true,
              data: nodes,
              links: links,
              zoom: 6,
              categories: categories,
              focusNodeAdjacency: true,
              lineStyle: {
                opacity: 0.9,
              }
            }
          ]
        }

        myChart.setOption(option)
      })
    },
    // 绘图
    drawechart2(data) {
      //  console.log(data)
      let echart1 = echart.init(document.querySelector("#echart12"));
      let option = {
        //backgroundColor: '#000F1F',
        tooltip: {//
        },
        color: ['red',
          'green',
          'pink',
          'blue'],
        legend: { //=========小图标，圖表控件
          show: true,
          orient: 'vertical',
          right: '1px',
          data: [{
            name: '原生用户',
            icon: 'circle' //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            //icon:'image://./images/icon1.png'  //如果用图片img，格式为'image://+icon文件地址'，其中image::后的//不能省略
          },
            {
              name: '原生交易',
              icon: 'circle'
            },
            {
              name: '非原生用户',
              icon: 'circle'
            },
            {
              name: '非原生交易',
              icon: 'circle'
            }

          ]
        },
        series: [{//图片配置
          type: 'graph', //关系图
          layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
          legendHoverLink: true,//是否启用图例 hover(悬停) 时的联动高亮。
          hoverAnimation: true,//是否开启鼠标悬停节点的显示动画
          coordinateSystem: null,//坐标系可选
          xAxisIndex: 0, //x轴坐标 有多种坐标系轴坐标选项
          yAxisIndex: 0, //y轴坐标
          force: {
            repulsion: 70,//相距距离
            edgeLength: [70, 150],
            layoutAnimation: true
          },
          roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          nodeScaleRatio: 0.9,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
          draggable: true,//节点是否可拖拽，只在使用力引导布局的时候有用。
          focusNodeAdjacency: true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
          edgeSymbol: ['none', 'arrow'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
          symbolSize: 20,//图形大小
          edgeSymbolSize: 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
          itemStyle: {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
            normal: { //默认样式
              label: {
                show: true
              },
            },
            emphasis: {//高亮状态
            }
          },
          lineStyle: { //==========关系边的公用线条样式。
            normal: {
              color: '#31354B',
              width: '1',
              type: 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
              curveness: 0, //线条的曲线程度，从0到1
              opacity: 1
              // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
            },
            emphasis: {//高亮状态

            }
          },
          label: { //=============图形上的文本标签
            normal: {
              show: true,//是否显示标签。
              position: 'bottom',//标签的位置。['50%', '50%'] [x,y]   'inside'
              textStyle: { //标签的字体样式
                color: '#2D2F3B', //字体颜色
                fontStyle: 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                fontWeight: 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                fontFamily: 'sans-serif', //文字的字体系列
                fontSize: 12, //字体大小
              }
            },
            emphasis: {//高亮状态

            }
          },
          edgeLabel: {//==============线条的边缘标签
            normal: {
              show: false
            },
            emphasis: {//高亮状态

            }
          },
          data: data[0],

          links: data[1],
          categories: [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
            {
              name: '原生用户',
              icon: 'circle' //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              //icon:'image://./images/icon1.png'  //如果用图片img，格式为'image://+icon文件地址'，其中image::后的//不能省略
            },
            {
              name: '原生交易',
              icon: 'circle'
            },
            {
              name: '非原生用户',
              symbol: 'circle'
            },
            {
              name: '非原生交易',
              symbol: 'circle'
            }
          ]
        }]
      };
      echart1.setOption(option);
    },
    drawechart(data) {
      let linkss = data[2]
      let nodees = data[1]
      //  console.log(linkss)
      let echart1 = echart.init(document.querySelector("#echart1"));
      let option = {
        backgroundColor: echart.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          offset: 0,
          color: '#f7f8fa'
        }, {
          offset: 1,
          color: '#cdd0d5'
        }]),
        title: {
          //   text: "空间粒度",
          // subtext: "各学院专业关系-Acring",
          top: "top",
          left: "center"
        },
        tooltip: {},
        legend: [{
          formatter: function (name) {
            return echart.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
          },
          tooltip: {
            show: true
          },
          orient: 'vertical',
          right: '1px',
          selectedMode: 'false',
          top: 40,
          /*   data: [
                 '3',
                 '2',
                 '0',
                 '1',
                 '4']*/
        }],
        toolbox: {
          show: false,
          feature: {
            dataView: {show: true, readOnly: true},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          //   name: '广州大学',
          type: 'graph',
          layout: 'force',
          zoom: 2.5,
          force: {
            repulsion: 50
          },
          data: nodees,
          links: linkss,
          categories: [{
            'name': '1'
          }, {
            'name': '2'
          }, {
            'name': '3'
          }, {
            'name': '4'
          }, {
            'name': '0'
          }],
          focusNodeAdjacency: true,
          roam: true,
          label: {
            normal: {

              show: true,
              position: 'top',

            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0,
              type: "solid"
            }
          }
        }]
      };

      echart1.setOption(option);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
