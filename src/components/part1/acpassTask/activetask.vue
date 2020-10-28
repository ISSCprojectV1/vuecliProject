<template>
    <div>

      <div class="title">
        <div style="display: inline-block; margin-bottom:20px;font-size: 40px;" >  主被动模态与空间粒度</div>
      </div>

        <el-tabs v-model="activeName">
            <el-tab-pane label="主动模态" name="table">
                <el-table
                        :data="tableData1"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="编号"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="user1"
                            label="主要交易卖方"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="user2"
                            label="主要交易买方"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="tradetotal"
                            label="总交易数"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="suspicioustrasaction"
                            label="可疑交易数"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            prop="tasksize"
                            label="空间粒度"
                            min-width="180">
                    </el-table-column>
                    <el-table-column
                            label="详细信息"
                            fixed="right"
                            min-width="180">
                        <template slot-scope="scope">
                            <el-button @click="gotoDetail(scope.row.id)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        ref="pagination"
                        style="text-align: center"
                        background
                        layout="prev, pager, next"
                        @current-change = "pageChange"
                        :total="total"
                >
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="交易事件图" name="flow">

                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="筛选条件">
                        <el-input v-model="form.limit"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(form.limit)">筛选</el-button>
                    </el-form-item>
                </el-form>
                <div id="echart1" style="width: 1000px;height: 800px"></div>
            </el-tab-pane>
          <el-tab-pane label="被动模态" name="passive" >
            <el-table
                :data="Data"

                border
                style="width: 100%; margin-top: 1px">
              <el-table-column
                  prop="group"
                  label="编号"
                  width="50">
              </el-table-column>
<!--              <el-table-column label="交易行为" align="center">-->

                <el-table-column
                    prop="buyername"
                    label="买方姓名">
                </el-table-column>
                <el-table-column
                    prop="category"
                    label="商品">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格">
                </el-table-column>

                <el-table-column
                    prop="sellername"
                    label="卖方姓名">
                </el-table-column>

                <el-table-column
                    prop="belong"
                    label="归属">
                </el-table-column>
                <el-table-column
                    prop="tasksize"
                    label="空间粒度">
                </el-table-column>
                <el-table-column
                    prop="original"
                    label="原生任务"
                    v-if="activeOrpassive()"
                >
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop=""-->
                <!--                        label="交易模式">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-button @click="look(scope.row)" type="button" size="small">查看</el-button>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
<!--              </el-table-column>-->
            </el-table>
            <el-pagination
                ref="pagination"
                style="text-align: center"
                background
                layout="prev, pager, next"
                page-size="5"
                @current-change = "pageChange1"
                :total="total1"
            >
            </el-pagination>


          </el-tab-pane>

        </el-tabs>
        <el-button type="success" @click="goback">返回</el-button>
    </div>
</template>

<script>
import tradeaction from "@/components/part1/acpassTask/tradeaction";
import {activetaskgraph, activetradeaction, activetradegroup, passivetradeaction} from "@/api/part1/acpassTask";
    import echart from "echarts";
    export default {
        name: "activetask",

        created(){

            const id = this.$router.currentRoute.params.id;

            this.Activetradegroup(id,1,10);

          if (this.activeOrpassive()){
            activetradeaction(id).then(res=>{
              this.tableData1 = res.data.data
              this.handleData();
            }).catch(err=>{
              console.log(err);
              console.log("出现错误")

            })
          }
          else{
            this.passivetradeactionList(id,1,5)
          }
        },
        data(){
            return{
                activeName:"table",
                total:0,
                tableData1:[],
                form:{},
              total1:0,
              loading:false,
              show:false,
              Data:[],
              spanarray:[],
              tableData: [
              ],

            }
        },
        mounted(){
            const id = this.$router.currentRoute.params.id;
            this.Activetaskgraph(id,15);
        },
        methods:{
            goback(){
                this.$router.back(-1)
            },
          passivetradeactionList(id,currentPage,pageSize){
            passivetradeaction(id,currentPage,pageSize).then(res=>{
console.log(res)
              this.tableData = res.data.data.reslist
              let data = res.data.data.reslist;
              this.total1 = res.data.data.total
              console.log(this.total1)
              for (let i = 0; i < data.length; i++) {
                data[i].id=i+1
              }
              this.tableData = data
              this.handleData();
            }).catch(err=>{
              console.log(err);
              console.log("出现错误")
            })
          }, handleData(){
            let cnt=0;
            this.Data=[];
            this.spanarray=[];
            console.log(this.tableData.length)
            for(let i=0;i<this.tableData.length;i++){
              this.spanarray.push({
                row:cnt,
                num:this.tableData[i].length
              });
              for(let j=0;j<this.tableData[i].length;j++){
                cnt++;
                this.tableData[i][j]['group']=i+1;
                this.Data.push(this.tableData[i][j])
              }
            }
          },
            Activetaskgraph(id,limit){
                activetaskgraph(id,limit).then(res=>{
                    this.drawechart(res.data.data)
                }).catch(err=>{
                    console.log(err)
                })
            },
            pageChange(page){
                const id = this.$router.currentRoute.params.id;
                this.currentPage=page;
                this.Activetradegroup(id,page,10);
            },
          pageChange1(page){
            const id = this.$router.currentRoute.params.id;
            this.currentPage=page;
            this.passivetradeactionList(id,page,5)
          },
            Activetradegroup(id,currentPage,pageSize){
                activetradegroup(id,currentPage,pageSize).then(res=>{
                    let data = res.data.data.reslist;
                    this.total = res.data.data.total;
                    for (let i = 0; i < data.length; i++) {
                        data[i].id=i+1
                    }
                    this.tableData1 = data
                }).catch(err=>{
                    console.log("请求失败")
                    console.log(err)
                })
            },
            onSubmit(limit){
                const id = this.$router.currentRoute.params.id;
                this.Activetaskgraph(id,limit);
            },
          activeOrpassive(){
            console.log(this.$router.currentRoute.path.startsWith('/trade/acpassTask/activetradeaction'))
            return this.$router.currentRoute.path.startsWith('/trade/acpassTask/activetradeaction')
          },
          objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (column.label === '编号' || column.label=== '交易模式') {
              const condition = (element) => element['row'] === rowIndex;
              let index = this.spanarray.findIndex(condition)
              if (index !==-1){
                return {
                  rowspan: this.spanarray[index]['num'],
                  colspan: 1
                }
              }
              else {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
            }
          },
            gotoDetail(id){
                this.$router.push(`/trade/acpassTask/activetaskDetail/${id}`);
                console.log(id)
            },
            drawechart(data){
                let echart1 = echart.init(document.querySelector("#echart1"));
                let option = {
                    //backgroundColor: '#000F1F',
                    tooltip: {//
                    },
                    color:['red',
                        'green',
                        'pink',
                        'blue'],
                    legend: { //=========小图标，圖表控件
                        show:true,
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
                    series : [ {//图片配置
                        type : 'graph', //关系图
                        layout : 'force', //图的布局，类型为力导图，'circular' 采用环形布局，见示例 Les Miserables
                        legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
                        hoverAnimation : true,//是否开启鼠标悬停节点的显示动画
                        coordinateSystem : null,//坐标系可选
                        xAxisIndex : 0, //x轴坐标 有多种坐标系轴坐标选项
                        yAxisIndex : 0, //y轴坐标
                        force: {
                            repulsion: 70,//相距距离
                            edgeLength: [70, 150],
                            layoutAnimation: true
                        },
                        roam : true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                        nodeScaleRatio : 0.9,//鼠标漫游缩放时节点的相应缩放比例，当设为0时节点不随着鼠标的缩放而缩放
                        draggable : true,//节点是否可拖拽，只在使用力引导布局的时候有用。
                        focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                        edgeSymbol : [ 'none', 'arrow' ],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。默认不显示标记，常见的可以设置为箭头，如下：edgeSymbol: ['circle', 'arrow']
                        symbolSize: 20,//图形大小
                        edgeSymbolSize : 10,//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
                        itemStyle : {//===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                            normal : { //默认样式
                                label : {
                                    show : true
                                },
                            },
                            emphasis : {//高亮状态
                            }
                        },
                        lineStyle : { //==========关系边的公用线条样式。
                            normal : {
                                color : '#31354B',
                                width : '1',
                                type : 'solid', //线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                                curveness : 0, //线条的曲线程度，从0到1
                                opacity : 1
                                // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                            },
                            emphasis : {//高亮状态

                            }
                        },
                        label : { //=============图形上的文本标签
                            normal : {
                                show : true,//是否显示标签。
                                position : 'bottom',//标签的位置。['50%', '50%'] [x,y]   'inside'
                                textStyle : { //标签的字体样式
                                    color : '#2D2F3B', //字体颜色
                                    fontStyle : 'normal',//文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                                    fontWeight : 'bolder',//'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                                    fontFamily : 'sans-serif', //文字的字体系列
                                    fontSize : 12, //字体大小
                                }
                            },
                            emphasis : {//高亮状态

                            }
                        },
                        edgeLabel : {//==============线条的边缘标签
                            normal : {
                                show : false
                            },
                            emphasis : {//高亮状态

                            }
                        },
                        data : data[0],

                        links : data[1],
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
                    } ]
                };
                echart1.setOption(option);
            }
        }

    }
</script>

<style scoped>

</style>
