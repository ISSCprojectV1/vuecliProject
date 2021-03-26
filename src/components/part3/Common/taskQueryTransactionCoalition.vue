<template>
<div>
  <div>
    <el-button type="primary" @click="teamformation" style="margin-left:29px;margin-right:14px;">联盟形成</el-button>
  </div>
  <div>
    <el-button @click="drawechart1()" type="text" size="small">任务视图</el-button>
    <el-button @click="drawechart12()" type="text" size="small">操作员视图</el-button>
    <el-button @click="changeform12()" type="text" size="small">表格试图</el-button>
    <div id="echart1" style="width: 1000px; height: 800px"></div>

    <div id="form" style="display: none">
      <el-table
              ref="dormitoryTable"
              :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
              tooltip-effect="dark"
              stripe
              style="width: 100%"
              border>
        <el-table-column label="序号" prop="id" width="50"></el-table-column>
        <el-table-column label="监管任务名称" prop="name" width="105">
        </el-table-column>
        <!--
        <el-table-column label="任务优先级" prop="priority" width="60">
        </el-table-column>
        !-->
        <el-table-column label="监管商品" prop="commodityName" width="77">
        </el-table-column>
        <el-table-column label="监管平台" prop="content" width="180">
        </el-table-column>

        <el-table-column label="人模态分布" prop="humanUse" width="93">
        </el-table-column>
        <el-table-column label="机器模态分布数" prop="agentNum" width="120">
        </el-table-column>

        <el-table-column label="任务状态" prop="workStatus" width="105">
        </el-table-column>
<!-- 联盟部分 -->
        <el-table-column label="属于联盟" prop="team" width="77">
        <!-- 根据team查询联盟信息 -->
		<template slot-scope="scope">
		<el-button  type="text" @click="queryWarehouseHandle(scope.row.team)">{{scope.row.team}}</el-button>
		</template>
        </el-table-column>
        <el-table-column label="监管联盟" prop="workTeam" @cell-click="openDetails" width="200">
        </el-table-column>
        <el-table-column label="联盟演化">
            <el-link type="primary" @click="teamEvolution">异常事件分析</el-link>
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
  </div>
</div>
</template>

<script>
import echart from "echarts";
import {taskQuery,teamform,getTeamResult} from "@/api/part1/Multimodal-multigranularity";

export default {
  name: "taskQueryTransactionCoalition",
  inject:['reload'],
  data() {
    return {
      dormitory: [],
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:100,
      // 个数选择器（可修改）
      pageSizes:[5,10],
      // 默认每页显示的条数（可修改）
      PageSize:10,
    }
  },

  mounted() {

    },
  methods: {
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

    getData1(){
      // 获取表格数据
      console.log("获取表格数据")
      // var dataConvert = [];
      taskQuery().then((res) => {
        console.log(res)
        let URL = '/yu/createTeamByCost';
        getTeamResult(URL).then((resultTeam)=>{
        let result = res.data.data;
        for(let i=0;i<result.length;i++){
          let workTeamStr = '';
         /*
          for(let j = 0;j<resultTeam.data.data[i].length;j++){
            if(resultTeam.data.data[i][j] == 0){
              resultTeam.data.data[i][j] = "工商局"
              workTeamStr = workTeamStr +  resultTeam.data.data[i][j]+",";
            }
            else if(resultTeam.data.data[i][j] == 3){
              resultTeam.data.data[i][j] = "金融监管局"
              workTeamStr = workTeamStr +  resultTeam.data.data[i][j]+",";
            }
            else{
                workTeamStr = workTeamStr+"监管机构"+resultTeam.data.data[i][j]+",";
            }
          }*/
          for(let j = 0;j<resultTeam.data.data[i].length;j++){
            workTeamStr = workTeamStr+resultTeam.data.data[i][j]+" "
          }

          result[i].workTeam = workTeamStr;
        }
        this. dealwithData(result);
        }).catch(()=>{
        console.log("getTransactionData fail")
      });

        document.getElementById("form").style.display="block";
        document.getElementById("echart1").style.display="none";
      }).catch(()=>{
        console.log("getTransactionData fail")
      });
    } ,
    // 获取联盟形成结果
    teamformation(){
    //  console.log("点击")
    //  let URL = '/yu/createTeamByCost';
    //  let teamResult = [];
    //   getTeamResult(URL).then((res) => {
    //     console.log("获取联盟形成结果",res.data.data[1]);
    //     this.dealwithData(res);

    //     //this.dormitory
    //   }).catch(()=>{
    //     console.log("getTeamResult fail")
    //   });
    //   return teamResult;
     document.getElementById("echart1").style.display="none";
      document.getElementById("form").style.display="block";
      this.getData1()
    },
    // 跳转至异常事件分析页面
    teamEvolution(){
      console.log("/trade/exceptionAnalysis/page")
        this.$router.push(`/trade/exceptionAnalysis/page`);
    },
     queryWarehouseHandle(team) {
      this.$router.push(`/trade/teamTable/${team}`);
      console.log(`/trade/teamTable/${team}`)
      // this.$router.push(`/trade/transactionProject/map`);
      // console.log("/trade/transactionProject/map");
    },
    changeform12()
    {
      document.getElementById("echart1").style.display="none";
      document.getElementById("form").style.display="block";
      this.getData1()

    },
    drawechart1() {
      document.getElementById("form").style.display="none";
      document.getElementById("echart1").style.display="block";
      const handle = function handleData(data, index, color = '#00f6ff') {
        //index标识第几层
        return data.map((item, index2) => {
          //计算出颜色
          if (index === 1) {
            color = colors.find((item, eq) => eq === index2 % 10);
          }
          // 设置节点大小
          if (index === 0 || index === 1) {
            item.label = {
              position: "top",
            }
          }
          // 设置label大小
          switch (index) {
            case 0:
              item.symbolSize = 70
              break;
            case 1:
              item.symbolSize = 50
              item.symbol = symbols[3]
              break;
            default:
              item.symbolSize = 30
              break;
          }
          // 设置线条颜色
          item.lineStyle = {
            color: color
          }

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
      };
      const symbols = [
        'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
        'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z',
        'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z'
        , 'path://M108.714667 858.24c-27.170133 9.736533-44.714667 32.3072-44.714667 52.9152v23.970133c0 15.0784 11.588267 24.874667 36.0704 24.874667h822.792533c24.490667 0 36.087467-9.796267 36.087467-24.874667v-23.970133c0-21.12-18.039467-44.7232-42.496-53.4784L688.930133 769.245867c-2.833067-1.1008-7.253333-2.901333-12.782933-5.307734a393.6256 393.6256 0 0 1-27.272533-13.056c-15.6672-8.311467-28.6976-16.759467-39.466667-26.794666-0.9984-0.938667-0.9984-0.938667-2.013867-1.928534-33.3568-32.699733-33.194667-77.098667-16.955733-131.3024 4.650667-15.5392 11.281067-26.709333 29.969067-54.9888a3821.909333 3821.909333 0 0 1 9.1392-13.781333c3.8144-5.76 6.7584-10.222933 9.685333-14.702933a1063.253333 1063.253333 0 0 0 20.113067-31.880534c27.229867-45.090133 44.629333-84.036267 51.106133-118.203733 1.792-9.429333 2.679467-18.269867 2.679467-26.504533 0-148.5312-94.097067-264.285867-202.862934-264.285867-108.757333 0-202.845867 115.754667-202.845866 264.2944 0 12.270933 1.877333 26.112 5.649066 41.301333 7.867733 31.761067 23.3216 67.336533 44.817067 105.7024 15.4624 27.5968 56.2432 90.3936 58.2144 94.1568 23.304533 44.526933 21.179733 110.890667-9.4208 145.092267-14.037333 15.5136-31.650133 25.745067-55.432533 36.096-9.728 4.224-19.831467 8.106667-29.909334 11.630933-3.8656 1.348267-7.236267 2.474667-9.9584 3.362134l-202.6496 90.094933z m829.329066-60.817067c47.607467 17.0496 84.906667 63.197867 84.906667 113.732267v23.970133c0 55.133867-44.893867 88.874667-100.087467 88.874667H100.0704C44.885333 1024 0 990.2592 0 935.125333v-23.970133c0-50.517333 37.290667-95.300267 84.898133-112.3584l203.733334-90.581333s55.227733-16.930133 70.3488-33.834667c10.0608-11.246933 13.166933-48.375467 0.4096-72.738133-12.731733-24.362667-115.976533-158.404267-115.976534-270.839467 0-181.2992 119.466667-328.2944 266.837334-328.2944C657.646933 2.5088 777.130667 149.504 777.130667 330.794667c0 117.393067-115.8656 246.621867-125.3888 278.417066-9.5232 31.7952-10.299733 56.695467 0.4608 67.242667 16.7424 16.418133 59.844267 33.109333 59.844266 33.109333l226.005334 87.8592z'
      ];
      let echart1 = echart.init(document.querySelector("#echart1"));
      const colors = [
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
      ];
      const logo = "/assets/part3/seu.png";
      let renwu = []
      let renwhhetask = []
      for (let i = 0; i < this.dormitory.length; i++) {
    //    console.log(this.dormitory[i].operatorName)
        if (renwu.indexOf(this.dormitory[i].operatorName) === -1) {
          renwu.push(this.dormitory[i].operatorName)
          renwhhetask[this.dormitory[i].operatorName] = []
        }
        renwhhetask[this.dormitory[i].operatorName].push(this.dormitory[i].name)
      }
      for (let i = 0; i < this.dormitory.length; i++) {
   //     console.log(renwhhetask[i])
      }

  //    console.log(renwhhetask.keys())

      const getdata = function getData() {
        let data = {
          name: "TEAM1",
          value: 0,
          children: []
        };

        for (let i = 0; i < renwu.length; i++) {
          let obj = {
            name: renwu[i],
            value: i,
            children: [],
          };
          for (let j = 0; j < renwhhetask[renwu[i]].length; j++) {
            let obj2 = {
              name: renwhhetask[renwu[i]][j],
              value: 100
            };

            obj.children.push(obj2);
          }

          data.children.push(obj);
        }
        let arr = []
        arr.push(data)
        arr = handle(arr, 0)
    //    console.log(arr);
        return arr;
      };

      const option = {
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
    drawechart12() {
      document.getElementById("form").style.display="none";
      document.getElementById("echart1").style.display="block";
      const handle = function handleData(data, index, color = '#00f6ff') {
        //index标识第几层
        return data.map((item, index2) => {
          //计算出颜色
          if (index === 1) {
            color = colors.find((item, eq) => eq === index2 % 10);
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
              item.symbol = symbols[3]
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
      };
      const symbols = [
        'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
        'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z',
        'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z'
        , 'path://M108.714667 858.24c-27.170133 9.736533-44.714667 32.3072-44.714667 52.9152v23.970133c0 15.0784 11.588267 24.874667 36.0704 24.874667h822.792533c24.490667 0 36.087467-9.796267 36.087467-24.874667v-23.970133c0-21.12-18.039467-44.7232-42.496-53.4784L688.930133 769.245867c-2.833067-1.1008-7.253333-2.901333-12.782933-5.307734a393.6256 393.6256 0 0 1-27.272533-13.056c-15.6672-8.311467-28.6976-16.759467-39.466667-26.794666-0.9984-0.938667-0.9984-0.938667-2.013867-1.928534-33.3568-32.699733-33.194667-77.098667-16.955733-131.3024 4.650667-15.5392 11.281067-26.709333 29.969067-54.9888a3821.909333 3821.909333 0 0 1 9.1392-13.781333c3.8144-5.76 6.7584-10.222933 9.685333-14.702933a1063.253333 1063.253333 0 0 0 20.113067-31.880534c27.229867-45.090133 44.629333-84.036267 51.106133-118.203733 1.792-9.429333 2.679467-18.269867 2.679467-26.504533 0-148.5312-94.097067-264.285867-202.862934-264.285867-108.757333 0-202.845867 115.754667-202.845866 264.2944 0 12.270933 1.877333 26.112 5.649066 41.301333 7.867733 31.761067 23.3216 67.336533 44.817067 105.7024 15.4624 27.5968 56.2432 90.3936 58.2144 94.1568 23.304533 44.526933 21.179733 110.890667-9.4208 145.092267-14.037333 15.5136-31.650133 25.745067-55.432533 36.096-9.728 4.224-19.831467 8.106667-29.909334 11.630933-3.8656 1.348267-7.236267 2.474667-9.9584 3.362134l-202.6496 90.094933z m829.329066-60.817067c47.607467 17.0496 84.906667 63.197867 84.906667 113.732267v23.970133c0 55.133867-44.893867 88.874667-100.087467 88.874667H100.0704C44.885333 1024 0 990.2592 0 935.125333v-23.970133c0-50.517333 37.290667-95.300267 84.898133-112.3584l203.733334-90.581333s55.227733-16.930133 70.3488-33.834667c10.0608-11.246933 13.166933-48.375467 0.4096-72.738133-12.731733-24.362667-115.976533-158.404267-115.976534-270.839467 0-181.2992 119.466667-328.2944 266.837334-328.2944C657.646933 2.5088 777.130667 149.504 777.130667 330.794667c0 117.393067-115.8656 246.621867-125.3888 278.417066-9.5232 31.7952-10.299733 56.695467 0.4608 67.242667 16.7424 16.418133 59.844267 33.109333 59.844266 33.109333l226.005334 87.8592z'
      ];
      let echart1 = echart.init(document.querySelector("#echart1"));
      const colors = [
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
      ];
      const logo = "/assets/part3/seu.png";
      let renwhhetask = []
      for (let i = 0; i < this.dormitory.length; i++) {
        renwhhetask.push(this.dormitory[i])

      }
      for (let i = 0; i < this.dormitory.length; i++) {
     //   console.log(renwhhetask[i])
      }
      const getdata = function getData() {
        let data = {
          name: "TEAM1",
          value: 0,
          children: []
        };

        for (let i = 0; i < renwhhetask.length; i++) {
          let obj = {
            name: renwhhetask[i].name,
            value: i,
            children: [],
          };
          if (renwhhetask[i].operatorName) {
            let obj2 = {
              name: renwhhetask[i].operatorName,
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
      };

      const option = {
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

    dealwithData(res) {
console.log("dataconvert:"+res)
      let dataConvert = [];
      dataConvert = res;
      let result = [];

      this.totalCount = dataConvert.length
      for (let i = 0; i < dataConvert.length; i++) {
        let data = this.timestampToTime(dataConvert[i].gmtCreate);
        dataConvert[i].gmtCreate = data

        data = this.timestampToTime(dataConvert[i].gmtModified)
        dataConvert[i].gmtModified = data

        data = this.timestampToTime(dataConvert[i].startTime)
        dataConvert[i].startTime = data

        data = this.timestampToTime(dataConvert[i].endTime)
        dataConvert[i].endTime = data

        if(dataConvert[i].subtask){
        dataConvert[i].commodityName = dataConvert[i].commodityName + ","+dataConvert[i].subtask
        }
        if(dataConvert[i].resourceNeed){
        dataConvert[i].content = dataConvert[i].content + ","+dataConvert[i].resourceNeed
        }
        if (dataConvert[i].humanUse) // true
          dataConvert[i].humanUse = "是"
        else // false
          dataConvert[i].humanUse = "否"
        if (!dataConvert[i].timeadvise) // true
          dataConvert[i].timeadvise = "否"
        if (!dataConvert[i].commodityName) // true
          dataConvert[i].commodityName = "暂无"
        if (!dataConvert[i].content) // true
        {
          dataConvert[i].content = "无"
        }


        if (!dataConvert[i]) // true
        {
          dataConvert[i].workTeam = "暂时未分配"
        }

        if (dataConvert[i].workStatus == null) // true
          dataConvert[i].workStatus = "未分配"
        if (dataConvert[i].workStatus === 0) // true
          dataConvert[i].workStatus = "已分配"
        if (dataConvert[i].workStatus === 1) // true
          dataConvert[i].workStatus = "任务正常"
        if (dataConvert[i].workStatus === 2) // true
          dataConvert[i].workStatus = "任务出现异常"

          // 获取联盟分配结果
      }
      dataConvert.reverse()
      this.dormitory = dataConvert;
      console.log(    this.dormitory)
    },
    // 转换时间戳
    timestampToTime(cjsj) {
      const date = new Date(cjsj); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      const D = date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() + ':';
      const s = date.getSeconds();
      return Y + M + D + h + m + s
    },
    // @getDetails() 点击下拉，获得详细数据
    getDetails(){
      console.log("GET details______________")
    },
  },
  created() {
    this.getData1();
    //this.reload();

  }
}
</script>

<style scoped>

</style>