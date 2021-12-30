np<template>
  <div class="panel">
    <!--舆情事件详情-->
    <div class="panel_table">
      <div style="margin:10px 10px 0 10px;width: calc(100% - 20px);height:calc(100% - 100px);border:#121313 solid 2px;" >
        <table class="myTable">
          <tr >
            <td class="column_key">总结点数</td>
            <td class="column_value">{{SourceNodesNum}}</td>
          </tr>
          <tr >
            <td class="column_key">源头节点</td>
            <td class="column_value">{{SourceNodes}}</td>
          </tr>
          <tr >
            <td class="column_key">重要传播节点</td>
            <td class="column_value">{{ImportantNodes}}</td>
          </tr>
          <tr >
            <td class="column_key">恶意倾向节点</td>
            <td class="column_value">{{MaliciousTendencyNodes}}</td>
          </tr>
          <tr >
            <td class="column_key">信息最早发布时间</td>
            <td class="column_value">{{OldestOpinionsTime}}</td>
          </tr>
          <tr >
            <td class="column_key">信息最早发布节点</td>
            <td class="column_value">{{OldestOpinionsNode}}</td>
          </tr>
          <tr >
            <td class="column_key">信息最新发布时间</td>
            <td class="column_value">{{NewestOpinionsTime}}</td>
          </tr>
          <tr >
            <td class="column_key">信息最新发布节点</td>
            <td class="column_value">{{NewestOpinionsNode}}</td>
          </tr>
          <tr>
            <td class="column_key">风险等级</td>
            <td class="column_value">
              <template>
                <el-button @click="handleClick_Risk()" type="text">{{RiskInfo}}</el-button>
              </template>
            </td>
          </tr>
          <tr>
            <td class="column_key">属性分析</td>
            <td class="column_value">
              <template>
                <el-button @click="handleClick_features()" type="text">点击查看</el-button>
              </template>
            </td>
          </tr>
        </table>
      </div>
      <div style="margin-top: 10px">
        <label style="font-size: 20px;color: #121313">舆情网络详情</label>
      </div>
      <!--风险等级详情表格-->
      <div class="panel_risk_detail">
        <RiskDetailDialog :show="detailShow" title="风险等级评估详情" @close="closeRiskDetailDialog"></RiskDetailDialog>
      </div>

      <!--属性分析表格-->
      <div class="panel_features_detail">
        <FeaturesDetailDialog :show="featuresShow" title="属性分析详情" @close="closeFeaturesDetailDialog"></FeaturesDetailDialog>
      </div>
    </div>

    <!--节点关系网状图-->
    <div class="panel_network">
      <div style="margin:10px 10px 0 10px;width: calc(100% - 20px);height:calc(100% - 100px);border:#121313 solid 2px;" >
        <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" />
      </div>
      <div class="point_classify">
        <div style="margin-top: 10px">
          <el-radio-group v-model="check_level" size="mini" @change="doFilter">
            <el-radio-button label="">所有节点</el-radio-button>
            <el-radio-button label="源头节点"></el-radio-button>
            <el-radio-button label="非源头节点"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RiskDetailDialog from './RiskDetailDialog';
import SeeksRelationGraph from 'relation-graph';
import FeaturesDetailDialog from "./FeaturesDetailDialog";
import {
  getOpinionsForwardImportantNodes,
  getOpinionsRiskLevelInformation,
  getWbForwardInformation
} from "../../../api/part1/PublicOpinionsRisk";
import moment from "moment";

export default {
  name:'opinions_network',
  components: {RiskDetailDialog, SeeksRelationGraph,FeaturesDetailDialog},
  data(){
    return{

      //接收的转发数据
      sourceNodeInformation:[],

      //表格值
      SourceNodesNum:'',
      SourceNodes:'',
      ImportantNodes:'',
      MaliciousTendencyNodes:'',
      OldestOpinionsTime:'',
      OldestOpinionsNode:'',
      NewestOpinionsTime:'',
      NewestOpinionsNode:'',
      RiskInfo:'',

      //风险等级dialog
      detailShow:false,

      //网络属性dialog
      featuresShow:false,

      //网状图选项设置
      g_loading:true,
      check_level:'',
      demoname: '---',
      graphOptions:{
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'rgba(238, 178, 94, 1)',
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineShape: 1,
        defaultNodeShape:0,

        'layouts': [
          {
            'label': '自动布局',
            'layoutName': 'force',
            'layoutClassName': 'seeks-layout-force'
          }
        ],
        defaultJunctionPoint: 'border'
      },

    }
  },
  created() {
    //获取从传递过来的源头节点信息
    this.sourceNodeInformation=this.$route.query.sourceNodeInformation.searchresult;
    console.log("转发节点数据："+this.sourceNodeInformation.length);

  },
  mounted() {


//获取总结点数
    this.getSourceNodesNum();
//获取源头节点
    this.getSourceNodes();
//获取信息最早发布时间和节点
    this.getOldestOpinions();
//获取信息最新发布时间和节点
    this.getNewestOpinions();
//获取重要传播节点（意见领袖节点）
    this.getImportantNodes();
//获取恶意倾向节点

//获取事件风险等级
    this.getRiskLevel();

//设置网状图
    this.demoname = this.$route.params.demoname;
    this.setGraphData();

  },
  methods:{
//*******************************************************************
//表格值相关函数
//*******************************************************************
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//获取总结点数
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    getSourceNodesNum()
    {
      let nodes=[];
      let index=0;
      for(let i=0;i<this.sourceNodeInformation.length;i++)
      {
        if(!this.compareUID(this.sourceNodeInformation[i].userid,nodes))
        {
          nodes[index]=this.sourceNodeInformation[i].userid;
          index++;
        }
      }
      this.SourceNodesNum=nodes.length;
    },
//判断是否有uid相同的节点
    compareUID(userid,data)
    {
      let flag=false;
      for(let i=0;i<data.length;i++)
      {
        if(data[i]===userid)
        {
          flag=true;
          break;
        }
      }
      return flag;
    },
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//获取源头节点
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    getSourceNodes()
    {
      var index=0;
      var sourcenode=[];
      for(let i=0;i<this.sourceNodeInformation.length;i++)
      {
        if(this.sourceNodeInformation[i].level==='0')
        {
          if(this.compareName(this.sourceNodeInformation[i].name,sourcenode)===0)
          {
            var obj={};
            obj.name=this.sourceNodeInformation[i].name;
            sourcenode[index] = obj;
            index++;
          }
        }
      }
      for(let i=0;i<sourcenode.length;i++)
      {
        if(this.SourceNodes==='')
        {
          this.SourceNodes=this.SourceNodes+sourcenode[i].name;
        }
        else
        {
          this.SourceNodes=this.SourceNodes+"、"+sourcenode[i].name;
        }
      }
    },
//判断是否有name相同的节点
    compareName(name,data)
    {
      var num=0;
      for(let i=0;i<data.length;i++)
      {
        if(data[i].name===name)
        {
          num++;
        }
      }
      return num;
    },
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//获取信息最早发布时间和节点
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    getOldestOpinions()
    {
      //获取信息最早发布时间
      var temp_date=this.sourceNodeInformation[0].releasetime;
      for(let i=1;i<this.sourceNodeInformation.length;i++)
      {
        if(this.getDaysBetween(this.sourceNodeInformation[i].releasetime,temp_date)<0)
        {
          temp_date=this.sourceNodeInformation[i].releasetime;
        }
      }
      this.OldestOpinionsTime=this.setDate(temp_date);
      //获取信息最早发布节点
      var index=0;
      var node=[];
      for(let i=0;i<this.sourceNodeInformation.length;i++)
      {
        if(this.getDaysBetween(this.sourceNodeInformation[i].releasetime,temp_date)===0)
        {
          if(this.compareName(this.sourceNodeInformation[i].name,node)===0)
          {
            var obj=new Object();
            obj.name=this.sourceNodeInformation[i].name;
            node[index]=obj;
            index++;
          }
        }
      }
      for(let i=0;i<node.length;i++)
      {
        if(this.OldestOpinionsNode==='')
        {
          this.OldestOpinionsNode=this.OldestOpinionsNode+node[i].name;
        }
        else
        {
          this.OldestOpinionsNode=this.OldestOpinionsNode+"、"+node[i].name;
        }
      }
    },
//判断两个日期之间相差天数
    getDaysBetween(date1,date2)
    {
      let startDate = Date.parse(date1);
      let endDate = Date.parse(date2);
      return (startDate - endDate ) / (1 * 24 * 60 * 60 * 1000);
    },
//转换时间格式
    setDate(val)
    {
      if(val===undefined){return ''}
      return moment(val).format("YYYY-MM-DD HH:mm");
    },
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//获取信息最早发布时间和节点
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    getNewestOpinions()
    {
      //获取信息最新发布时间
      var temp_date=this.sourceNodeInformation[0].releasetime;
      for(let i=1;i<this.sourceNodeInformation.length;i++)
      {
        if(this.getDaysBetween(this.sourceNodeInformation[i].releasetime,temp_date)>0)
        {
          temp_date=this.sourceNodeInformation[i].releasetime;
        }
      }
      this.NewestOpinionsTime=this.setDate(temp_date);
      //获取信息最新发布节点
      var index=0;
      var node=[];
      for(let i=0;i<this.sourceNodeInformation.length;i++)
      {
        if(this.getDaysBetween(this.sourceNodeInformation[i].releasetime,temp_date)===0)
        {
          if(this.compareName(this.sourceNodeInformation[i].name,node)===0)
          {
            var obj=new Object();
            obj.name=this.sourceNodeInformation[i].name;
            node[index]=obj;
            index++;
          }
        }
      }
      for(let i=0;i<node.length;i++)
      {
        if(this.NewestOpinionsNode==='')
        {
          this.NewestOpinionsNode=this.NewestOpinionsNode+node[i].name;
        }
        else
        {
          this.NewestOpinionsNode=this.NewestOpinionsNode+"、"+node[i].name;
        }
      }
    },
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//获取重要传播节点
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    getImportantNodes()
    {
      getOpinionsForwardImportantNodes().then((res) => {
        console.log('获取重要传播节点!'+JSON.stringify(res.data));
        var temp=res.data;
        for(let i=0;i<temp.length;i++)
        {
          if(this.ImportantNodes==='')
          {
            this.ImportantNodes=this.ImportantNodes+temp[i].name;
          }
          else
          {
            this.ImportantNodes=this.ImportantNodes+"、"+temp[i].name;
          }
        }
      }).catch(() => {
        console.log("taskExecution fail ImportantNodes")
      })
    },
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//获取事件风险等级
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    getRiskLevel()
    {
      getOpinionsRiskLevelInformation().then((res) => {
        console.log('获取风险等级!');
        this.RiskInfo=res.data.risklevel;
      }).catch(() => {
        console.log("taskExecution fail risklevel")
      })
    },
//*******************************************************************
//风险等级dialog相关函数
//*******************************************************************
    handleClick_Risk(){
      this.detailShow=true;
    },
    closeRiskDetailDialog(){
      this.detailShow=false;
    },
//*******************************************************************
//网络/节点属性dialog相关函数
//*******************************************************************
    handleClick_features(){
      this.featuresShow=true;
    },
    closeFeaturesDetailDialog(){
      this.featuresShow=false;
    },
//*******************************************************************
//绘制网络图相关函数
//*******************************************************************
//设置图节点和边
    setGraphData()
    {
      var rootids=this.getRootID(this.sourceNodeInformation);
      var nodes=this.getNodesInformation(this.sourceNodeInformation,rootids);
      var links=this.getNodeLinks(this.sourceNodeInformation);
      var __graph_json_data={
        'rootid':rootids[0],
        'nodes':nodes,
        'links':links,
      };
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
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
    getNodesInformation(val,rootids)
    {
      var nodes=[];
      let index=0;
      for(let i=0;i<val.length;i++)
      {
        let obj={};
        let obj2 = {};
        obj.id=val[i].userid;
        obj.text=val[i].name;
        if(val[i].fromnodeuserid==='-1')
        {
          obj.color='#b70f2b';
          obj2.levelType='源头节点';
          obj.data=obj2;
          obj.innerHTML='<div class="c-my-node" style="background:#ffffff; border:#121313 solid 3px;"> <div class="c-node-name" style="color:#ff875e">'+obj.text+'</div></div>' ;
          nodes[index]=obj;
          index++;
        }
        else if(!this.checkRootNode(val[i].userid,rootids) && !this.checkNodeExist(val[i].userid,nodes))
        {
          obj2.levelType='非源头节点';
          obj.data=obj2;
          obj.innerHTML='<div class="c-my-node" style="background:#ffffff; border:#121313 solid 3px;"> <div class="c-node-name" style="color:#ff875e">'+obj.text+'</div></div>' ;
          nodes[index]=obj;
          index++;
        }
      }
      return nodes;
    },

    checkRootNode(val,rootids)
    {
      let flag=false;
      for(let i=0;i<rootids.length;i++)
      {
        if(val===rootids[i])
        {
          flag=true;
          break;
        }
      }
      return flag;
    } ,
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

    //过滤源头节点和非源头节点
    doFilter() {
      var _all_nodes = this.$refs.seeksRelationGraph.getNodes();
      _all_nodes.forEach(thisNode => {
        var _isHideThisLine = false
        if (this.check_level !== '') {
          if (thisNode.data['levelType'] !== this.check_level) {
            _isHideThisLine = true
          }
        }
        thisNode.opacity = _isHideThisLine ? 0.1 : 1
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.panel{
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05); //阴影
  border-color: rgba(0, 0, 0, .05); //四个边框颜色

  .panel_table{
    width: 50%;
    height: 900px;
    float:left;
    background: #ffffff;
    margin-top: 10px;
  }

  .panel_network{
    width: 50%;
    height: 900px;
    float:right;
    background: #ffffff;
    margin-top: 10px;

    .c-my-node{
      background-position: center center;
      background-size: 100%;
      border:#ff8c00 solid 2px;
      height:80px;
      width:80px;
      border-radius: 40px;
    }
    .c-node-name{
      width:160px;
      margin-left:-40px;
      text-align:center;
      margin-top:85px;
    }
  }

  .myTable {
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: center;

    .column_key{
      background: #7a98b2;
      font-size: 20px;
      font-weight: bolder;//加粗
      color: #121313;
      width: 40%;
      height: 10%;
    }
    .column_value{
      background: #ebeff5;
      font-size: 18px;
      color: #121313;
      height: 10%;
    }
  }


}
</style>