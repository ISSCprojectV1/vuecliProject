<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" class="AvgDistanceDialogClass">
    <slot>
      <!--刷新按钮-->
      <div class="panel_network_avgdistance" style="width: 100%;height: 650px;border:#121313 solid 2px;background: #7a98b2">
        <div style="width: 100%;height:30px;margin-bottom: 10px ;" >
          <el-button type="primary" icon="el-icon-refresh" @click="handleClick_refreshGraph()" style="float: right;background: none;color: #121313;border: none;"></el-button>
        </div>
        <!--表格-->
        <div style="height:36%;width:100% ;">
          <el-table ref="Table_AvgDistance"
                    :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                    style="width: calc(100% - 14px);height:calc(90% - 14px);border: #121313 solid 2px;margin: 5px 5px 5px 5px"
                    border
                    highlight-current-row
                    @current-change="handleCurrentChange_table"
                    :header-cell-style="{color:'black'}">
            <el-table-column table-column prop="sourceNode1" label="起(终)点" ></el-table-column>
            <el-table-column table-column prop="sourceNode2" label="终(起)点" ></el-table-column>
            <el-table-column table-column prop="pathLength" label="传播链长度" ></el-table-column>
          </el-table>
          <!--分页器-->
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :pager-count="5"
              :current-page="currentPage"
              :page-size="PageSize" layout="total, prev, pager, next,jumper"
              :total="dormitory.length">
          </el-pagination>
        </div>
        <!--网络图-->
        <div style="width:100% ;height:57%;">
          <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" style="width:calc(100% - 14px);height:calc(100% - 14px); margin: 5px 5px 5px 5px;border:#121313 solid 2px;"/>
        </div>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import SeeksRelationGraph from "relation-graph";
import {getNetworkAllPath, getWbForwardInformation} from "../../../api/part1/PublicOpinionsRisk";

export default {
  name: "AvgDistanceDialog",
  components:{SeeksRelationGraph},
  props:{
    show:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default: '传播路径展示',
    },
  },
  data()
  {
    return{
      //dialog参数
      localShow:this.show,

      //网状图选项设置
      g_loading:true,
      demoname: '---',
      graphOptions:{
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'rgba(238, 178, 94, 1)',
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineShape: 1,
        defaultNodeShape:0,
        allowShowMiniToolBar:false,

        'layouts': [
          {
            'label': '自动布局',
            'layoutName': 'force',
            'layoutClassName': 'seeks-layout-force'
          }
        ],
        defaultJunctionPoint: 'border'
      },

      //转发数据
      forwardData:[],
      //最长路径
      distanceData:[],

      //表格参数
      currentPage:1,
      PageSize:3,
      dormitory: [],
    }
  },
  watch:
      {
        show (val) {
          this.localShow = val
        }
      },
  created()
  {
    this.getForwardData();
    this.getDistanceData();
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
    //网络路径相关函数
    //*******************************************************************
    getForwardData()
    {
      getWbForwardInformation().then((res)=>{
        if(res.data.searchresult!=null)
        {
          console.log("网络路径：getWbForwardInformation！");
          this.forwardData=res.data.searchresult;
        }
        else {
          console.log("网络路径：获取Forward数据为null!");
        }
      }).catch(()=>{
        console.log("AvgDistance:getWbForwardInformation fail");
      });
    },

    getDistanceData()
    {
      getNetworkAllPath().then((res)=>{
        if(res.data!=null)
        {
          console.log("网络平均距离：getNetworkAllPath！");
          this.distanceData=res.data;
        }else {
          console.log("网络平均距离：获取AvgDistance数据为null!");
        }
      }).catch(()=>{
        console.log("AvgDistance:getNetworkAllPath fail");
      });
    },

    //获取表格数据（起始/终止端点,路径长度）
    getTableData(val)
    {
      console.log("AvgDistance:获取表格数据！");
      let dormitory=[];
      for(let i=0;i<val.length;i++)
      {
        let sourceNode1=this.getNameByUid_first(val[i].path);
        let sourceNode2=this.getNameByUid_last(val[i].path);
        let last=val[i].path.length-1;
        dormitory[i]={sourceNode1:sourceNode1,sourceNode2:sourceNode2,pathLength:last,sourceNode1_Uid:val[i].path[0],sourceNode2_Uid:val[i].path[last]}
      }
      return dormitory;
    },
    getNameByUid_first(val)
    {
      let uid=val[0];
      let name='';
      for(let i=0;i<this.forwardData.length;i++)
      {
        if(uid===this.forwardData[i].userid)
        {
          name=this.forwardData[i].name;
          break;
        }
      }
      return name;
    },

    getNameByUid_last(val)
    {
      let length=val.length;
      let uid=val[length-1];
      let name='';
      for(let i=0;i<this.forwardData.length;i++)
      {
        if(uid===this.forwardData[i].userid)
        {
          name=this.forwardData[i].name;
          break;
        }
      }
      return name;
    },

    //绘制网状图和路径
    drawGraph(val)
    {
      this.rootids=this.getRootID(val);
      this.nodes=this.getNodesInformation(val,this.rootids);
      this.links=this.getNodeLinks(val);
      let graph_json_data={
        'rootid':this.rootids[0],
        'nodes':this.nodes,
        'links':this.links,
      };
      this.$refs.seeksRelationGraph.setJsonData(graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        let _all_lines=this.$refs.seeksRelationGraph.getLines();
        _all_lines.forEach(thisLine => {
          var _isHideThisLine = true;
          thisLine.relations.forEach(thisLink => {
            if (thisLink.data['trueEdge'] !== 1) {
              thisLink.isHide = true;
            } else {
              _isHideThisLine = false;
              thisLink.isHide = false;
              thisLink.color = '#121313';
              thisLink.lineWidth = 1;
            }
          })
        })
      });
    },

    //获取根节点
    getRootID(val)
    {
      let rootid = [];
      let index=0;
      for(let i=0;i<val.length;i++)
      {
        if(val[i].fromnodeuserid==='-1')
        {
          rootid[index]=val[i].userid;
          index++;
        }
      }
      return rootid;
    },

    //设置网络图中节点信息
    getNodesInformation(val)
    {
      let nodes=[];
      let index=0;
      for(let i=0;i<val.length;i++)
      {
        let obj={};
        obj.id=val[i].userid;
        obj.text=val[i].name;
        if(!this.checkNodeExist(val[i].userid,nodes))
        {
          obj.innerHTML='<div class="c-my-node" style="background:#ffffff; border:#121313 solid 3px;"> <div class="c-node-name" style="color:#ff875e">'+obj.text+'</div></div>' ;
          nodes[index]=obj;
          index++;
        }
      }
      return nodes;
    },
    //检查节点是否已经存在（uid）
    checkNodeExist(val,nodes)
    {
      let flag=false;
      for (let i=0;i<nodes.length;i++)
      {
        let obj=nodes[i];
        var value=null;
        for(var key in obj)
        {
          if(key==='id')
          {
            value=obj[key];
            break;
          }
        }
        if(value!==null && val===value)
        {
          flag=true;
          break;
        }
      }
      return flag;
    } ,

    //设置网络图中边信息
    getNodeLinks(val)
    {
      let links=[];
      let index=0;

      for(let i=0;i<val.length;i++)
      {
        for(let j=i+1;j<val.length;j++)
        {
          if(val[i].userid!==val[j].userid)
          {
            let obj={};
            obj.from=val[i].userid;
            obj.to=val[j].userid;
            obj.color='#121313';
            obj.isHideArrow=true;//是否隐藏箭头
            obj.data={'trueEdge':0,'theoryEdge':1};
            if(!this.checkLinkExist(obj,links))
            {
              if(this.checkTrueEdge(obj,val))
              {
                obj.color='#911115';
                obj.lineWidth=3;
                obj.data={'trueEdge':1,'theoryEdge':1};
              }
              links[index]=obj;
              index++;
            }
          }
        }
      }

      return links;
    },

    checkLinkExist(obj,data)
    {
      let flag=false;
      for(let i=0;i<data.length;i++)
      {
        if((obj.from===data[i].from && obj.to===data[i].to)||(obj.from===data[i].to && obj.to===data[i].from))
        {
          flag=true;
          break;
        }
      }
      return flag;
    },

    checkTrueEdge(obj,val)
    {
      let flag=false;
      for(let i=0;i<val.length;i++)
      {
        if((obj.from===val[i].fromnodeuserid && obj.to===val[i].userid)|| (obj.from===val[i].userid && obj.to===val[i].fromnodeuserid))
        {
          flag=true;
          break;
        }
      }
      return flag;
    },

    //加载网状图
    handleClick_refreshGraph()
    {
      this.dormitory=this.getTableData(this.distanceData);
      this.$refs.Table_AvgDistance.setCurrentRow(this.dormitory[0]);//初始选中第一行
      this.drawGraph(this.forwardData);
      this.handleCurrentChange_table(this.dormitory[0]);//加载第一行对应的路径
    },

    //处理路径显示
    handleCurrentChange_table(val)
    {
      if(val!=null)
      {
        let vnodes=[];
        for(let i=0;i<this.distanceData.length;i++)
        {
          let uid1=val.sourceNode1_Uid;
          let uid2=val.sourceNode2_Uid;
          let last=this.distanceData[i].path.length-1;
          if((this.distanceData[i].path[0]===uid1) && (this.distanceData[i].path[last]===uid2))
          {
            vnodes=this.distanceData[i].path;
            break;
          }
        }
        //设置对应节点颜色
        let _all_nodes=this.$refs.seeksRelationGraph.getNodes();
        _all_nodes.forEach(thisNode => {
          thisNode.color='#edb15e';
        })
        for(let i=0;i<vnodes.length;i++)
        {
          _all_nodes.forEach(thisNode => {
            if(thisNode.id===vnodes[i])
            {
              thisNode.color='#911115';
            }
          })
        }
        //设置对应边的颜色
        let _all_lines=this.$refs.seeksRelationGraph.getLines();
        _all_lines.forEach(thisLine => {
          thisLine.relations[0].lineWidth=1;
          thisLine.relations[0].color='#121313';
        })
        for(let i=0;i<vnodes.length-1;i++)
        {
          _all_lines.forEach(thisLine => {
            if((thisLine.fromNode.id===vnodes[i] && thisLine.toNode.id===vnodes[i+1]) || (thisLine.toNode.id===vnodes[i] && thisLine.fromNode.id===vnodes[i+1]))
            {
              thisLine.relations[0].lineWidth=3;
              thisLine.relations[0].color='#911115';
            }
          })
        }
      }
    },
  },
}
</script>

<style lang="scss">
.AvgDistanceDialogClass .el-dialog__body{
  height:650px
}

</style>