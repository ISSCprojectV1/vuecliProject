<template>
    <div class="dormitory" id="diceng">
        <!--        <div class="title">-->
        <!--      <div style="display: inline-block; margin-bottom:20px; font-size:40px" >监管任务查询列表</div>-->
        <!--        </div>-->





        <h2>监管任务查询列表</h2>

        <div class="searchWord" style="margin-bottom:20px">

            <el-autocomplete
                    class="inline-input"
                    v-model="state1"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    style="width:600px"
            ></el-autocomplete>

            <el-button type="primary" @click="searchTask_btn" style="margin-left:29px;margin-right:14px;">搜索</el-button>

            <el-dialog title="搜索结果"
                       :visible.sync="searchTableVisible" center :append-to-body='true'
                       :lock-scroll="false" width="60%"
                       :close-on-click-modal="false"
            >
                <taskSearch ref="taskSearch" :searchData = this.state1></taskSearch>
            </el-dialog>
            <el-button type="primary" @click="teamformation" style="margin-left:29px;margin-right:14px;">联盟形成</el-button>
            <el-button type="primary" @click="addNewTask" style="margin-left:15px;margin-right:14px">添加新任务</el-button>
            <el-dialog title="添加新任务"
                       :visible.sync="dialogTableVisible" center :append-to-body='true'
                       :lock-scroll="false" width="30%"
                       :close-on-click-modal="false">
                <taskInput :taskin="taskin"></taskInput>
            </el-dialog>
            <el-button type="primary" @click="allocateTask" style="margin-left:15px;margin-right:14px">执行分配任务</el-button>
            <el-link type="primary" icon="el-icon-question" @click="userHelp">首次使用，查看用户使用说明</el-link>
            <el-dialog title="用户使用说明"
                       :visible.sync="userHelpVisible" center :append-to-body='true'
                       :lock-scroll="false" width="60%"
                       :close-on-click-modal="false">
                <userQuery></userQuery>
            </el-dialog>

            <el-tabs v-model="activeName" @tab-click="handleClick">

                <el-tab-pane label="用户使用帮助手册" name="third" lazy>
                    <userQuery></userQuery >
                </el-tab-pane>
                <el-tab-pane label="表格视图" name="first" lazy>
                    <div class="dormitoryData" v-loading="loading" element-loading-text="加载中">
                        <el-table
                                ref="dormitoryTable"
                                :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                                tooltip-effect="dark"
                                stripe
                                style="width: 100%"
                                border :cell-style="columnStyle">

                            <el-table-column type="selection" width="45"></el-table-column>
                            <el-table-column label="序号"  prop="id" width = "60" class="labelcol"></el-table-column>
                            <el-table-column label="监管任务名称" prop="name">
                            </el-table-column>

                            <el-table-column label="任务优先级" prop="priority" width = "60">
                            </el-table-column>
                            <el-table-column label="任务执行时间" prop="workingTime" width = "60">
                            </el-table-column>
                            <el-table-column label="属于联盟" prop="team" width = "60">
                            </el-table-column>

                            <el-table-column label="人模态分布" prop="humanUse" width = "80">
                            </el-table-column>
                            <el-table-column label="机器模态分布数" prop="agentNum" width = "80" >
                            </el-table-column>
                            <el-table-column label="时间粒度（天）" prop="timeadvise" width = "80" >
                                <template slot-scope="scope">
                                    <el-link  :disabled="setgoto(scope)" >
                                        <div @click="goToprice()">
                                            {{scope.row.timeadvise}}
                                        </div>
                                    </el-link>
                                </template>
                            </el-table-column>
                            <el-table-column label="主被动模态空间粒度" prop="content"  >
                                <template slot-scope="scope">
                                    <el-link :disabled="setdis(scope)"  type="primary" >
                                        <div @click="gotoDetail(scope.row.id)">
                                            {{scope.row.content}}
                                        </div>
                                    </el-link>
                                </template>
                            </el-table-column>
                            <el-table-column label="商品名称" prop="commodityName">
                            </el-table-column>
                            <el-table-column label="任务状态" prop="workStatus">
                            </el-table-column>
                            <el-table-column
                                    label="模态粒度补充"
                                    fixed="right"
                                    min-width="180">
                                <template slot-scope="scope">
                                    <el-button @click="changetask(scope)" type="text" size="small">属性修改</el-button>
                                    <el-button @click="changetime(scope)" type="text" size="small">时间粒度补全</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                        <el-pagination @size-change="handleSizeChange"
                                       @current-change="handleCurrentChange"
                                       :current-page="currentPage"
                                       :page-sizes="pageSizes"
                                       :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                                       :total="totalCount">
                        </el-pagination>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="流程图视图" name="second" lazy>
                    * 1.将鼠标悬空在任务节点上方，可显示详细任务信息 2.可拖动节点方便查看
                    <method1 ref="method1_child"></method1>
                </el-tab-pane>
                <el-tab-pane label="交易联盟图" name="flow">
                    <el-button @click="drawechart1()" type="text" size="small">任务视图</el-button>
                    <el-button @click="drawechart12()" type="text" size="small">操作员视图</el-button>
                    <div id="echart1" style="width: 1000px;height: 800px"></div>
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
//
    //  <el-button @click="gotoDetail(scope.row.id)" type="text" size="small">空间粒度</el-button>
    //import {getTansactionData} from "@/api/part1/transactionProject";        <el-button @click="goToprice()" type="text" size="small">商品价格查看</el-button>
import Header2 from "@/components/part3/Common/header2";
    import {taskQuery,taskAllocation,searchTask,changetimeadvise,teamform} from "@/api/part1/Multimodal-multigranularity";
    import taskInput from "@/components/part1/Multimodal-multigranularity/taskInput";
    import userQuery from "@/components/part1/Multimodal-multigranularity/useFunction/taskQueryUse";
    import method1 from "@/components/part1/transactionProject/taskDictionary/method1";
    import taskSearch from "@/components/part1/Multimodal-multigranularity/taskSearch";
    import echart from "echarts";
import stepBar  from "@/components/part1/Multimodal-multigranularity/stepBar";
import  logoimg from "@/assets/part3/seu.png"
    /*
      <el-table-column label="创建时间" prop="gmtCreate" >
            </el-table-column>
            <el-table-column label="修改时间" prop="gmtModified" >
            </el-table-column>
                    <el-table-column label="开始时间" prop="startTime">
            </el-table-column>
            <el-table-column label="结束时间" prop="endTime">
            </el-table-column>
     */

    // import $ from 'jQuery'
    export default {
        inject:['reload'],
        components: {
            taskInput,method1,userQuery,taskSearch
        },

        data () {
            return {
                //    setdis:true,
                //  setund:false,
                echartsdata:[],
                content: '',
                dormitory: [],
                taskLists:[],
                state1:'',
                searchData :'',
                dialogTableVisible: false,
                searchTableVisible: false,
                userHelpVisible:false,
                activeName:'first',
                // 默认显示第几页
                currentPage:1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount:100,
                // 个数选择器（可修改）
                pageSizes:[5,10],
                // 默认每页显示的条数（可修改）
                PageSize:10,
                taskin:{
                    changeflag:
                    Number.NEGATIVE_INFINITY
                },
            }
        },
        //在这里调用ajax请求方法
        created(){
            this.getData();
            //  this.taskin.changeflag=Number.POSITIVE_INFINITY
            //  console.log( this.taskin.changeflag)

        },
        watch(){

        },
        methods: {

            drawechart1(){
                var symbols = [
                    'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
                    'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z',
                    'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z'
,'path://M108.714667 858.24c-27.170133 9.736533-44.714667 32.3072-44.714667 52.9152v23.970133c0 15.0784 11.588267 24.874667 36.0704 24.874667h822.792533c24.490667 0 36.087467-9.796267 36.087467-24.874667v-23.970133c0-21.12-18.039467-44.7232-42.496-53.4784L688.930133 769.245867c-2.833067-1.1008-7.253333-2.901333-12.782933-5.307734a393.6256 393.6256 0 0 1-27.272533-13.056c-15.6672-8.311467-28.6976-16.759467-39.466667-26.794666-0.9984-0.938667-0.9984-0.938667-2.013867-1.928534-33.3568-32.699733-33.194667-77.098667-16.955733-131.3024 4.650667-15.5392 11.281067-26.709333 29.969067-54.9888a3821.909333 3821.909333 0 0 1 9.1392-13.781333c3.8144-5.76 6.7584-10.222933 9.685333-14.702933a1063.253333 1063.253333 0 0 0 20.113067-31.880534c27.229867-45.090133 44.629333-84.036267 51.106133-118.203733 1.792-9.429333 2.679467-18.269867 2.679467-26.504533 0-148.5312-94.097067-264.285867-202.862934-264.285867-108.757333 0-202.845867 115.754667-202.845866 264.2944 0 12.270933 1.877333 26.112 5.649066 41.301333 7.867733 31.761067 23.3216 67.336533 44.817067 105.7024 15.4624 27.5968 56.2432 90.3936 58.2144 94.1568 23.304533 44.526933 21.179733 110.890667-9.4208 145.092267-14.037333 15.5136-31.650133 25.745067-55.432533 36.096-9.728 4.224-19.831467 8.106667-29.909334 11.630933-3.8656 1.348267-7.236267 2.474667-9.9584 3.362134l-202.6496 90.094933z m829.329066-60.817067c47.607467 17.0496 84.906667 63.197867 84.906667 113.732267v23.970133c0 55.133867-44.893867 88.874667-100.087467 88.874667H100.0704C44.885333 1024 0 990.2592 0 935.125333v-23.970133c0-50.517333 37.290667-95.300267 84.898133-112.3584l203.733334-90.581333s55.227733-16.930133 70.3488-33.834667c10.0608-11.246933 13.166933-48.375467 0.4096-72.738133-12.731733-24.362667-115.976533-158.404267-115.976534-270.839467 0-181.2992 119.466667-328.2944 266.837334-328.2944C657.646933 2.5088 777.130667 149.504 777.130667 330.794667c0 117.393067-115.8656 246.621867-125.3888 278.417066-9.5232 31.7952-10.299733 56.695467 0.4608 67.242667 16.7424 16.418133 59.844267 33.109333 59.844266 33.109333l226.005334 87.8592z'
                ];
                let echart1 = echart.init(document.querySelector("#echart1"));
                var colors = [
                    "#002AFF",
                    "#B62AFF",
                    "#95F300",
                    "#FFA12F",

                    "#604BFF",
                    "#6E35FF",

                    "#20C0F4",
                    "#95F300",
                    "#04FDB8",
                    "#AF5AFF"
                ]
              //  console.log("jinlaile")
var logo="/assets/part3/seu.png"
               let renwu=[]
                let renwhhetask=[]
                for(let i=0;i<this.dormitory.length;i++)
               {//console.log(this.dormitory[i].operatorName)
                if(renwu.indexOf(this.dormitory[i].operatorName)==-1)
                {
                    renwu.push(this.dormitory[i].operatorName)
                    renwhhetask[this.dormitory[i].operatorName]=[]

                }

                   renwhhetask[this.dormitory[i].operatorName].push(this.dormitory[i].name)
                 //  renwhhetask[this.dormitory[i].operatorName].push(this.dormitory[i].name)
               }
       /*         for(let i=0;i<this.dormitory.length;i++){
                    console.log(renwhhetask[i])
                }*/
              /*  for(let i=0;i<this.dormitory.length;i++)
                {
                    if(renwhhetask.indexOf(this.dormitory[i].operatorName)!=-1)
                        console.log(this.dormitory[i].name)
                }*/
           //     console.log(renwhhetask.keys())

                var getdata = function getData() {
                    let data = {
                        name: "TEAM1",
                        value: 0,
                        children: []
                    };

                    for (let i = 0; i < renwu.length; i++) {
                        let obj = {
                            name: renwu[i] ,
                            value: i,
                            children: [],
                        };
                        for (let j = 0; j < renwhhetask[renwu[i]].length; j++) {
                            let obj2 = {
                                name:  renwhhetask[renwu[i]][j],
                                value: 100
                            };

                            obj.children.push(obj2);
                        }

                        data.children.push(obj);
                    }
                    let arr = []
                    arr.push(data)
                    //
                    arr = handle(arr, 0)
                //    console.log(arr);
                    return arr;
                }
                var handle = function handleData(data, index, color = '#00f6ff') {
                    //index标识第几层
                    return data.map((item, index2) => {
                        //计算出颜色
                        if (index == 1) {
                            color = colors.find((item, eq) => eq == index2 % 10);
                        }
                        // 设置节点大小
                        if (index === 0 || index === 1) {
                            item.label = {
                                position: "top",
                                //   rotate: 0,
                                //   borderRadius: "50%",
                            }
                        }
                        // 设置label大小
                        switch (index) {
                            case 0:
                                item.symbolSize = 70
                                break;
                            case 1:
                                item.symbolSize = 50
                                item.symbol=symbols[3]
                                break;
                            default:
                                item.symbolSize = 30
                                break;
                        }
                        // 设置线条颜色
                        item.lineStyle = {
                            color: color
                        }
             //           item.itemStyle.symbol=logoimg

                        if (item.children) { //存在子节点
                            item.itemStyle = {
                                borderColor: color,
                                color: color
                            };
                            item.children = handle(item.children, index + 1, color)
                        } else { //不存在
                            item.itemStyle = {
                                color: 'transparent',
                                borderColor: color
                            };
                        }
                        return item
                    })
                }

                var option = {
                    type: "tree",
                    backgroundColor: "rgba(0,0,0,0)",
                    toolbox: { //工具栏
                        show: true,
                        iconStyle: {
                            borderColor: "#03ceda"
                        },
                        feature: {
                            restore: {}
                        }
                    },
                    tooltip: { //提示框
                        trigger: "item",
                        triggerOn: "mousemove",
                        backgroundColor: "rgba(1,70,86,1)",
                        borderColor: "rgba(0,246,255,1)",
                        borderWidth: 0.5,
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    series: [{
                        type: "tree",
                        hoverAnimation: true, //hover样式
                        data: getdata(),
                        top: 100,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        layout: "radial",
                        symbol: "circle",
                        symbolSize: 10,
                        nodePadding: 20,
                        animationDurationUpdate: 750,
                        expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                        initialTreeDepth: 2,
                        roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                        focusNodeAdjacency: true,
                        itemStyle: {
                            borderWidth: 1,
                        },
                        label: { //标签样式
                            color: "#000",
                            fontSize: 10,
                            fontFamily: "SourceHanSansCN",
                            position: "top",
                            rotate: 0,
                        },
                        lineStyle: {
                            width: 1,
                            curveness: 0.5,
                        }
                    }]
                };
                echart1.setOption(option);
            },

            drawechart12(){
                var symbols = [
                    'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
                    'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z',
                    'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z'
                    ,'path://M108.714667 858.24c-27.170133 9.736533-44.714667 32.3072-44.714667 52.9152v23.970133c0 15.0784 11.588267 24.874667 36.0704 24.874667h822.792533c24.490667 0 36.087467-9.796267 36.087467-24.874667v-23.970133c0-21.12-18.039467-44.7232-42.496-53.4784L688.930133 769.245867c-2.833067-1.1008-7.253333-2.901333-12.782933-5.307734a393.6256 393.6256 0 0 1-27.272533-13.056c-15.6672-8.311467-28.6976-16.759467-39.466667-26.794666-0.9984-0.938667-0.9984-0.938667-2.013867-1.928534-33.3568-32.699733-33.194667-77.098667-16.955733-131.3024 4.650667-15.5392 11.281067-26.709333 29.969067-54.9888a3821.909333 3821.909333 0 0 1 9.1392-13.781333c3.8144-5.76 6.7584-10.222933 9.685333-14.702933a1063.253333 1063.253333 0 0 0 20.113067-31.880534c27.229867-45.090133 44.629333-84.036267 51.106133-118.203733 1.792-9.429333 2.679467-18.269867 2.679467-26.504533 0-148.5312-94.097067-264.285867-202.862934-264.285867-108.757333 0-202.845867 115.754667-202.845866 264.2944 0 12.270933 1.877333 26.112 5.649066 41.301333 7.867733 31.761067 23.3216 67.336533 44.817067 105.7024 15.4624 27.5968 56.2432 90.3936 58.2144 94.1568 23.304533 44.526933 21.179733 110.890667-9.4208 145.092267-14.037333 15.5136-31.650133 25.745067-55.432533 36.096-9.728 4.224-19.831467 8.106667-29.909334 11.630933-3.8656 1.348267-7.236267 2.474667-9.9584 3.362134l-202.6496 90.094933z m829.329066-60.817067c47.607467 17.0496 84.906667 63.197867 84.906667 113.732267v23.970133c0 55.133867-44.893867 88.874667-100.087467 88.874667H100.0704C44.885333 1024 0 990.2592 0 935.125333v-23.970133c0-50.517333 37.290667-95.300267 84.898133-112.3584l203.733334-90.581333s55.227733-16.930133 70.3488-33.834667c10.0608-11.246933 13.166933-48.375467 0.4096-72.738133-12.731733-24.362667-115.976533-158.404267-115.976534-270.839467 0-181.2992 119.466667-328.2944 266.837334-328.2944C657.646933 2.5088 777.130667 149.504 777.130667 330.794667c0 117.393067-115.8656 246.621867-125.3888 278.417066-9.5232 31.7952-10.299733 56.695467 0.4608 67.242667 16.7424 16.418133 59.844267 33.109333 59.844266 33.109333l226.005334 87.8592z'
                ];
                let echart1 = echart.init(document.querySelector("#echart1"));
                var colors = [
                    "#002AFF",
                    "#B62AFF",
                    "#95F300",
                    "#FFA12F",
                    "#604BFF",
                    "#6E35FF",
                    "#20C0F4",
                    "#95F300",
                    "#04FDB8",
                    "#AF5AFF"
                ]
          //      console.log("jinlaile")
                var logo="/assets/part3/seu.png"
               // let renwu=[]
                let renwhhetask=[]
            for(let i=0;i<this.dormitory.length;i++)
            {renwhhetask.push(this.dormitory[i])

                }
             /*   for(let i=0;i<this.dormitory.length;i++){
                    console.log(renwhhetask[i])
                }*/
                /*  for(let i=0;i<this.dormitory.length;i++)
                  {
                      if(renwhhetask.indexOf(this.dormitory[i].operatorName)!=-1)
                          console.log(this.dormitory[i].name)
                  }
                console.log(renwhhetask.keys())
*/
                var getdata = function getData() {
                    let data = {
                        name: "TEAM1",
                        value: 0,
                        children: []
                    };

                    for (let i = 0; i < renwhhetask.length; i++) {
                    //    console.log(this.dormitory[i].name)
                      //  console.log(this.dormitory[i].operatorName)
                        let obj = {
                            name: renwhhetask[i].name,
                            value: i,
                            children: [],
                        };
if( renwhhetask[i].operatorName)
{
    let obj2 = {
        name:  renwhhetask[i].operatorName,
        value: 100
    };
    obj.children.push(obj2);
}




                        data.children.push(obj);
                    }
                    let arr = []
                    arr.push(data)
                    //
                    arr = handle(arr, 0)
                //    console.log(arr);
                    return arr;
                }
                var handle = function handleData(data, index, color = '#00f6ff') {
                    //index标识第几层
                    return data.map((item, index2) => {
                        //计算出颜色
                        if (index == 1) {
                            color = colors.find((item, eq) => eq == index2 % 10);
                        }
                        // 设置节点大小
                        if (index === 0 || index === 1) {
                            item.label = {
                                position: "top",
                                //   rotate: 0,
                                //   borderRadius: "50%",
                            }
                        }
                        // 设置label大小
                        switch (index) {
                            case 0:
                                item.symbolSize = 70
                                break;
                            case 1:
                                item.symbolSize = 50

                                break;
                            default:
                                item.symbolSize = 30
                             item.symbol=symbols[3]
                                break;
                        }
                        // 设置线条颜色
                        item.lineStyle = {
                            color: color
                        }
                        //           item.itemStyle.symbol=logoimg

                        if (item.children) { //存在子节点
                            item.itemStyle = {
                                borderColor: color,
                                color: color
                            };
                            item.children = handle(item.children, index + 1, color)
                        } else { //不存在
                            item.itemStyle = {
                                color: 'transparent',
                                borderColor: color
                            };
                        }
                        return item
                    })
                }

                var option = {
                    type: "tree",
                    backgroundColor: "rgba(0,0,0,0)",
                    toolbox: { //工具栏
                        show: true,
                        iconStyle: {
                            borderColor: "#03ceda"
                        },
                        feature: {
                            restore: {}
                        }
                    },
                    tooltip: { //提示框
                        trigger: "item",
                        triggerOn: "mousemove",
                        backgroundColor: "rgba(1,70,86,1)",
                        borderColor: "rgba(0,246,255,1)",
                        borderWidth: 0.5,
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    series: [{
                        type: "tree",
                        hoverAnimation: true, //hover样式
                        data: getdata(),
                        top: 100,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        layout: "radial",
                        symbol: "circle",
                        symbolSize: 10,
                        nodePadding: 20,
                        animationDurationUpdate: 750,
                        expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                        initialTreeDepth: 2,
                        roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                        focusNodeAdjacency: true,
                        itemStyle: {
                            borderWidth: 1,
                        },
                        label: { //标签样式
                            color: "#000",
                            fontSize: 10,
                            fontFamily: "SourceHanSansCN",
                            position: "top",
                            rotate: 0,
                        },
                        lineStyle: {
                            width: 1,
                            curveness: 0.5,
                        }
                    }]
                };
                echart1.setOption(option);
            },
           /* drawechart(){
                console.log("aaa")


                let echart1 = echart.init(document.querySelector("#echart1"));
                // let laber = ["增长", '减少'];

                let colors=[
                    "#00ADD0",
                    "#FFA12F",
                    "#B62AFF",
                    "#604BFF",
                    "#6E35FF",
                    "#002AFF",
                    "#20C0F4",
                    "#95F300",
                    "#04FDB8",
                    "#AF5AFF"
                ]
                let getdataa=function getDataa() {
                    let data = {
                        name: "TEAM1",
                        value: 0,
                        children: []
                    };
                    for (let i = 1; i <= this.dormitory.size(); i++) {
                        let obj = {
                            name: this.dormitory[i].name,
                            value: i,
                            children: [],
                        };
                        for (let j = 1; j <= 5; j++) {
                            let obj2 = {
                                name: "操作员",
                                value: 10,
                            };
                            /*
                             if(j%2==1){
                                 obj2.children=[]
                                 for (let k = 1; k <= 3; k++) {
                                     let obj3 = {
                                         name: `节点1-${i}-${j}-${k}`,
                                         value: 1 + "-" + i + "-" + j+'-'+k,
                                     };
                                     obj2.children.push(obj3);
                                 }
                             }


                            obj.children.push(obj2);
                        }

                        data.children.push(obj);
                    }
                    let arr=[]
                    arr.push(data)
                    //
                    arr=handle(arr,0)
                    console.log(arr);
                    return arr;
                }
                let handle=function handleDataa(data,index,color='#00f6ff'){
                    //index标识第几层
                    return data.map((item,index2)=>{
                        //计算出颜色
                        if(index==1){
                            color = colors.find((item, eq) => eq == index2 % 10);
                        }
                        // 设置节点大小
                        if(index===0 || index===1){
                            item.label= {
                                position: "inside",
                                //   rotate: 0,
                                //   borderRadius: "50%",
                            }
                        }
                        // 设置label大小
                        switch(index){
                            case 0:
                                item.symbolSize=70
                                break;
                            case 1:
                                item.symbolSize=50
                                break;
                            default:
                                item.symbolSize=10
                                break;
                        }
                        // 设置线条颜色
                        item.lineStyle= { color: color }

                        if (item.children) {//存在子节点
                            item.itemStyle = {
                                borderColor: color,
                                color:color
                            };
                            item.children=handle(item.children,index+1,color)
                        } else {//不存在
                            item.itemStyle = {
                                color:'transparent',
                                borderColor: color
                            };
                        }
                        return item
                    })
                }

                let option = {
                    type: "tree",
                    backgroundColor: "#000",
                    toolbox: { //工具栏
                        show: true,
                        iconStyle: {
                            borderColor: "#03ceda"
                        },
                        feature: {
                            restore: {}
                        }
                    },
                    tooltip: {//提示框
                        trigger: "item",
                        triggerOn: "mousemove",
                        backgroundColor: "rgba(1,70,86,1)",
                        borderColor: "rgba(0,246,255,1)",
                        borderWidth: 0.5,
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    series: [
                        {
                            type: "tree",
                            hoverAnimation: true, //hover样式
                            data:getdataa(),
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            layout: "radial",
                            symbol: "circle",
                            symbolSize: 10,
                            nodePadding: 20,
                            animationDurationUpdate: 750,
                            expandAndCollapse: true, //子树折叠和展开的交互，默认打开
                            initialTreeDepth: 2,
                            roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
                            focusNodeAdjacency: true,
                            itemStyle: {
                                borderWidth: 1,
                            },
                            label: { //标签样式
                                color: "#fff",
                                fontSize: 10,
                                fontFamily: "SourceHanSansCN",
                                position: "inside",
                                rotate: 0,
                            },
                            lineStyle: {
                                width: 1,
                                curveness:0.5,
                            }
                        }
                    ]
                };
                echart1.setOption(option);
            },*/

            teamformation(){
                teamform().then((res) => {
                    this.dealwithData(res)
                    //  console.log(res)

                }).catch(()=>{
                    console.log("taskQuery fail")
                });

            },
            setgoto(scope){
                if(scope.row.commodityName=="小麦")
                    return false
                return true
            },
            sethref(scope){
                let content="http://localhost:8000/trade/acpassTask/activetask"
                return content
            },
            setdis(scope){
                //   console.log(scope)
                if(scope.row.content=="暂时未分配")
                    return  true
                return false
            },
            goToprice() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/priceshow');
            },
            gotoDetail(id){
                this.$router.push(`/trade/acpassTask/activetask/${id}`);
                //  this.$router.push(`/trade/acpassTask/activetaskDetail/${id}`);
                console.log(`/trade/acpassTask/activetask/${id}`)
            },
            changetime(data){
                changetimeadvise().then((res) => {

                    this.dealwithData(res)
                }).catch(()=>{
                    console.log("taskQuery fail")
                });

            },
            changetask(scope) {
                this.taskin=scope.row
                this.taskin.changeflag=this.taskin.id;
                this.addNewTask1()
            },
            loadAll() {
                // 获取表格数据
                console.log("获取表格数据")
                var dataConvert = [];
                var taskNames = [];
                taskQuery().then((res) => {
                    dataConvert = res.data.data;
                    let caozuoyua=[]
                    /* for(let i=0;i<dataConvert.length;i++)
                     {
                         if(!caozuoyua.indexOf(dataConvert[i].operatorName))
                             caozuoyua.push(dataConvert[i].operatorName)

                     }
                     console.log(caozuoyua)
                /*     for(let i=0;i<caozuoyua.length;i++)
                     {
                        caozuoyua[i].children=[]

                     }
                     for(let i=0;i<dataConvert.length;i++)
                     {
                    if(caozuoyua.indexof(dataConvert[i].operatorName))
                        caozuoyua[caozuoyua.indexof(dataConvert[i].operatorName)].push(dataConvert[i])

                     }
                 console.log(caozuoyua))*/
                //    console.log(dataConvert)
                    for(var i = 0;i<dataConvert.length;i++){
                        var taskName = {};
                        taskName = {"value":dataConvert[i].name};
                        taskNames.push(taskName);
                    }
                }).catch(()=>{
                    console.log("taskQuery fail")
                });

                return taskNames;

            },
            // 搜索 从服务器获得数据
            querySearch(queryString, cb) {
                var taskLists = this.taskLists;
                var results = queryString ? taskLists.filter(this.createFilter(queryString)) : taskLists;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (taskName) => {
                    return (taskName.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                // console.log(item);
            },
            // 搜索按钮
            searchTask_btn(){
                this.searchData = this.state1;
                console.log("state1:" + this.state1 + "searchData:" + this.searchData)
                this.searchTableVisible = true;
                this.$refs.taskSearch.getSearchData(this.state1);
            },
            // 用户手册 弹窗
            userHelp(){
                this.userHelpVisible = true;
            },

            dealwithData(res)
            {  var dataConvert = [];

                dataConvert = res.data.data;
                this.totalCount=dataConvert.length
                for(var i = 0;i<dataConvert.length;i++){
                    var data = this.timestampToTime(dataConvert[i].gmtCreate)
                    dataConvert[i].gmtCreate = data

                    data = this.timestampToTime(dataConvert[i].gmtModified)
                    dataConvert[i].gmtModified = data

                    data = this.timestampToTime(dataConvert[i].startTime)
                    dataConvert[i].startTime = data

                    data = this.timestampToTime(dataConvert[i].endTime)
                    dataConvert[i].endTime = data

                    if(dataConvert[i].humanUse) // true
                        dataConvert[i].humanUse = "是"
                    else // false
                        dataConvert[i].humanUse = "否"
                    if(!dataConvert[i].timeadvise) // true
                        dataConvert[i].timeadvise="否"
                    if(!dataConvert[i].commodityName) // true
                        dataConvert[i].commodityName="暂无"
                    //     console.log(   dataConvert[i].content)
                    if(!dataConvert[i].content) // true
                    {
                        dataConvert[i].content="暂时未分配"
                        //  console.log(   dataConvert[i].content)
                        //  this.setdis= true
                        //   this.setund=false
                    }

                    if(!dataConvert[i].team) // true
                    {
                        dataConvert[i].team="暂时未分配"
                        //  console.log(   dataConvert[i].content)
                        //  this.setdis= true
                        //   this.setund=false
                    }

                    if(dataConvert[i].workStatus==null) // true
                        dataConvert[i].workStatus="未分配"
                    if(dataConvert[i].workStatus==0) // true
                        dataConvert[i].workStatus="已分配"
                    if(dataConvert[i].workStatus==1) // true
                        dataConvert[i].workStatus="任务已经执行"
                    if(dataConvert[i].workStatus==2) // true
                        dataConvert[i].workStatus="任务出现异常"
                }
                dataConvert.reverse()
                this.dormitory = dataConvert;
                this.drawechart12()
              //  this.drawechart12()
                //      console.log(this.dormitory)
            },
            getData(){
                // 获取表格数据
                console.log("获取表格数据")
                // var dataConvert = [];
                taskQuery().then((res) => {
                    this. dealwithData(res)
                }).catch(()=>{
                    console.log("getTransactionData fail")
                });
            } ,
            // 转换时间戳
            timestampToTime (cjsj) {
                var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
                var D = date.getDate() + ' '
                var h = date.getHours() + ':'
                var m = date.getMinutes() + ':'
                var s = date.getSeconds()
                return Y+M+D+h+m+s
            },

            // 新增监控任务
            addNewTask(){
                this.taskin={};
                //this.taskin.id=-1
                //     this.taskin.changeflag=Number.POSITIVE_INFINITY
                this.taskin.changeflag=Number.POSITIVE_INFINITY
                //  this.taskin.changeflag=-1
                //  console.log(this.taskin.changeflag)
                //  this.taskin.changeflag=false;
                this.dialogTableVisible=true;
            },
            addNewTask1(){
                this.dialogTableVisible=true;
                //  console.log(this.taskInput)
                //     console.log(taskInput)
                //this.taskInput.input=this.taskin.name;
                //   this.taskInput.priority=this.taskin.priority;
            },
            // 获得任务流程图展示
            getTaskMap(){
                this.taskMapVisible = true;
            },

            // 分配任务
            allocateTask(){
                this.$confirm('是否确认进行任务分配', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.getAllocateDate();

                    this.$message({
                        type: 'success',
                        message: '已执行分配!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            // 发送get请求--getAllocateTask
            getAllocateDate(){

                taskAllocation().then((res) => {
                    console.log("传入数据allocateTask")
                    if(res.data.data.length === 0){
                        this.$message({
                            type: 'warning',
                            message: '当前无需要分配的任务!'
                        });
                    }
                    else{
                        this.$message({
                            type: 'success',
                            message: '任务分配已完成!'
                        });
                    }
                }).catch(()=>{
                    console.log("taskAllocation fail")
                });
            },
// 分页
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage=1
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage=val
            },
            // 关闭弹窗
            closeDialog(){
                console.log*("成功调用")
                this.dialogTableVisible = false;
            },
            // 分页激活调用
            handleClick(tab, event) {
                console.log(tab, event);
                if(this.activeName == 'second'){
                    //this.$refs.method1_child.getData();
                }
            },
            // 刷新当前页面
            reloadPage(){
                this.reload();
            }

        },
        mounted() {
            this.taskLists = this.loadAll();
            let tiankong= document.getElementById("diceng");
            tiankong.style.height=window.innerHeight+"px"

            //     console.log(tiankong.style.height)
            let announcement=document.getElementById("announcement");
            //  console.log(tiankong)
        },
    }/*
                let team={
                        zlevel: 20,
                        type: 'scatter',
                        symbol: 'circle',
                        symbolSize: 100,
                        label: {
                            normal: {
                                show: true,
                                formatter: function(param) {
                                    return param.data[2];
                                },
                                color: '#00E4FF',
                                fontSize: 25
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#123E65',
                                // fontSize:20
                            },
                        },
                        data: [
                            [-1, 0, 'Team1', '#278DFB', 19]
                        ],
                    }
                    let agent={
                        zlevel: 20,
                        name: '下降',
                        type: 'effectScatter',
                        symbol: 'circle',
                        symbolSize: function(param, a) {
                            return param[4];
                        },
                        itemStyle: {
                            normal: {
                                // color: function(param) {
                                //     return param.data[3];
                                // },
                                color: '#FF7D7B'
                            },
                        },
                        hoverAnimation: true,
                        label: {
                            color: '#000',
                            normal: {
                                textStyle: {
                                    fontSize: 18,
                                },
                                position: 'bottom',
                                show: true,
                                formatter: function(param) {
                                    return param.data[2];
                                },
                            },
                        },

                        "data": [
                            [-31, 3, "任务1", "#BF54Fb", 10],
                            [1, 34, "任务2", "#FF7D7B", 10],
                            [11, -7, "任务3", "#FF7D7B", 10],
                            [-2, -34, "任务4", "#FF7D7B", 10],
                            [32, 34, "任务5", "#FF7D7B", 10],
                            [8, 9, "任务6", "#BF54Fb", 10],
                        ],
                        "markLine": {}
                    }
                    let task={
                        "name": "上升",
                        "zlevel": 20,
                        "type": "effectScatter",
                        "symbol": "triangle",
                        itemStyle: {
                            normal: {
                                // color: function(param) {
                                //     return param.data[3];
                                // },
                                color: '#000000'
                            },
                        },
                        hoverAnimation: true,
                        label: {
                            color: "#000",
                            normal: {
                                textStyle: {
                                    fontSize: 18
                                },
                                position: 'bottom',
                                show: true,
                                formatter: function(param) {
                                    return param.data[2];
                                },
                            }
                        },
                        data: [
                            [19, -23, "操作员1", "#FF7D7B", 10],
                            [23, 33, "操作员2", "#FF7D7B", 15],
                            [-3, 44, "操作员3", "#FF7D7B", 10],
                            [-12, 12, "操作员4", "#FF7D7B", 15],
                            [0, -23, "操作员5", "#FF7D7B", 10],
                        ],

                    }
                    let rich = {
                    top: {
                        color: '#00E4FF',
                        fontSize: 20,
                        padding:[20,0,0,80]
                    },
                    bottom: {
                        color: '#00E4FF',
                        fontSize: 20,
                        padding:[30,0,0,80]
                    }
                }
                let pie1={
                        "type": "pie",
                        "radius": ["0%", "5%"],
                        "center": ["50%", "50%"],
                        "avoidLabelOverlap": false,
                        "label": {
                            "normal": {
                                "show": false,
                                "position": "center"
                            },
                            "emphasis": {
                                "show": false,
                                "textStyle": {
                                    "fontWeight": "bold"
                                }
                            }
                        },
                        "itemStyle": {
                            "normal": {
                                "color":"red" /*{
                                    "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.05,
                                        "color": "rgba(18,62,101, 0.1)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(18,62,101, 0.2)"
                                    }, {
                                        "offset": 0.95,
                                        "color": "rgba(18,62,101, 0.1)"
                                    }]
                                }
                            }
                        },
                        "labelLine": {
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{
                            "value": 300
                        }]
                    }
                    let pie2={
                        "color":"red",
                        "type": "pie",
                        "radius": ["0%", "90%"],
                        "center": ["50%", "50%"],
                        "avoidLabelOverlap": false,
                        "label": {
                            "normal": {
                                "show": false,
                                "position": "center"
                            },
                            "emphasis": {
                                "show": false,
                                "textStyle": {
                                    "fontWeight": "bold"
                                }
                            }
                        },
                     //   "itemStyle": {

                          //  "normal": {
                         //       "color": "red"//{
                                  /* "type": "linear",
                                    "x": 0,
                                    "y": 0,
                                    "x2": 0,
                                    "y2": 1,
                                    "colorStops": [{
                                        "offset": 0.05,
                                        "color": "rgba(18,62,101, 0.1)"
                                    }, {
                                        "offset": 0.5,
                                        "color": "rgba(18,62,101, 0.2)"
                                    }, {
                                        "offset": 0.95,
                                        "color": "rgba(18,62,101, 0.1)"
                                    }]
                               // }
                       //     }
                   //     },
                        "labelLine": {
                            "normal": {
                                "show": false
                            }
                        },
                        "data": [{

                            "value": 300
                        }]
                    }*/

/* let    option = {
     backgroundColor: 'rgba(0,0,0,0)',
     "xAxis": [{
         zlevel: 20,
         type: 'value',
         min: -50,
         max: 50,
         interval: 16.7,
         axisLabel: {
             //margin: -450,
             formatter: function(value, index) {
                 //  if(laber[index]=="增长"){
                 //    return "{top|增长}"  + "\n{bottom|减少}"
                 //   }
             },
             lineStyle: {
                 color: '#278dfb'
             },
             rich: rich
             // textStyle: {
             //     color: '#00E4FF',
             //     fontSize: 20
             // }
         },
         splitLine: {
             show: false,
         },
         splitArea: {
             show: false,
         },
         axisTick: {
             show: false
         },
         axisLine: {
             lineStyle: {
                 color: 'rgba(16,50,78,.5)',
                 width: 0
             }
         },
     }],
     "yAxis": [{
         "min": -50,
         "max": 50,
         "show": false,
         "splitLine": {
             "show": false
         },
         "splitArea": {
             "show": false
         }
     }],
     "legend": {
         "show": false,
         "data": []
     },
     "tooltip": {
         "showContent": false,
         show: true
     },
     "sendDataSetting": {
         "selectParams": false,
         "selectCell": false
     },
     "visualMap": [{
         "show": false,
         "dimension": 2,
         "min": 1,
         "max": 3,
         "precision": 0.01,
         // "inRange": {
         //     "symbolSize": [10, 50]
         // }
     }],
     "series": [   ],


 };
 option.series.push(team)
 option.series.push(task)
 option.series.push(agent)

// option.series.push(pie1)
 option.series.push(pie2)*/
</script>
<style>
    .dormitory{
        width: 100%;
        height: 800px;
    }
    .dormitoryData{
        width: 100%;
        height: 600px;
    }
    .searchWord span{
        float: left;
        text-align:center;
    }
    .el-table thead{
        color: black;
    }

</style>
