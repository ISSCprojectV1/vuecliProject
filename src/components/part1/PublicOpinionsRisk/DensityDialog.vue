<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" class="DensityDialogClass">
    <slot>
      <div class="panel_network_density" style="width: calc(100% - 4px);height: 590px;border:#121313 solid 2px;background: #7a98b2">
        <div style="width: 100%;height: 30px;margin-bottom: 10px ;" >
          <el-button type="primary" icon="el-icon-refresh" @click="handleClick_refreshGraph()" style="float: right;background: none;color: #121313;border: none;"></el-button>
        </div>
        <div style="width:calc(100% - 24px);height: calc(500px - 4px);margin: 5px 10px 5px 10px;border:#121313 solid 2px;">
          <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" />
        </div>
        <div class="edge_classify" style="margin-top: 10px">
          <el-radio-group v-model="check_edge" size="mini" @change="doFilter">
            <el-radio-button label="理论可能的边"></el-radio-button>
            <el-radio-button label="实际存在的边"></el-radio-button>
            <el-radio-button label="">两者重叠</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import {getWbForwardInformation} from "../../../api/part1/PublicOpinionsRisk";
import SeeksRelationGraph from "relation-graph";

export default {
  name: "DensityDialog",
  components:{SeeksRelationGraph},
  props:{
    show:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default: '网络密度',
    }
  },
  data(){
    return{
      //dialog参数
      localShow:this.show,

      //网状图选项设置
      forwardData:[],
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
      check_edge:'',
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    }
  },
  created() {
    this.getData();
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
    //网络密度相关函数
    //*******************************************************************
    getData()
    {
      getWbForwardInformation().then((res)=>{
        if(res.data.searchresult!=null)
        {
          console.log("网络密度：getWbForwardInformation！");
          this.forwardData=res.data.searchresult;

        }
        else {
          console.log("网络密度：获取数据为null!");
        }
      }).catch(()=>{
        console.log("Density:getWbForwardInformation fail");
      });
    },

    //绘制网状图
    drawGraph(val)
    {
      let rootids=this.getRootID(val);
      let nodes=this.getNodesInformation(val,rootids);
      let links=this.getNodeLinks(val);
      let graph_json_data={
        'rootid':rootids[0],
        'nodes':nodes,
        'links':links,
      };
      this.$refs.seeksRelationGraph.setJsonData(graph_json_data, (seeksRGGraph) => {});
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
      let nodes=[];
      let index=0;
      for(let i=0;i<val.length;i++)
      {
        let obj={};
        obj.id=val[i].userid;
        obj.text=val[i].name;
        if(val[i].fromnodeuserid==='-1')
        {
          obj.color='#b70f2b';
          obj.innerHTML='<div class="c-my-node" style="background:#ffffff; border:#121313 solid 3px;"> <div class="c-node-name" style="color:#ff875e">'+obj.text+'</div></div>' ;
          nodes[index]=obj;
          index++;
        }
        else if(!this.checkRootNode(val[i].userid,rootids) && !this.checkNodeExist(val[i].userid,nodes))
        {
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

    doFilter()
    {
      let _all_lines=this.$refs.seeksRelationGraph.getLines();
      _all_lines.forEach(thisLine => {
        var _isHideThisLine = true;
            thisLine.relations.forEach(thisLink => {
            if(this.check_edge==='理论可能的边')
            {
              if(thisLink.data['theoryEdge']!==1)
              {
                thisLink.isHide=true;
              }
              else {
                _isHideThisLine = false;
                thisLink.isHide = false;
                thisLink.color='#121313';
                thisLink.lineWidth=1;
              }
            }
            else if(this.check_edge==='实际存在的边')
            {
              if(thisLink.data['trueEdge']!==1)
              {
                thisLink.isHide=true;
              }
              else {
                _isHideThisLine = false;
                thisLink.isHide = false;
                thisLink.color='#911115';
                thisLink.lineWidth=3;
              }
            }
            else{
              thisLink.isHide = false;
              thisLink.color='#121313';
              thisLink.lineWidth=1;
              if(thisLink.data['trueEdge']===1)
              {
                thisLink.color='#911115';
                thisLink.lineWidth=3;
              }
            }
          })
      })
    },

    //加载网状图
    handleClick_refreshGraph()
    {
      this.drawGraph(this.forwardData);
    },
  }
}
</script>

<style lang="scss" >
  .panel_network_density{
    width: 100%;
    height: 500px;
    float:right;
    background: #ffffff;
    margin-top: 10px;
  }
  .DensityDialogClass .el-dialog__body{
    height:600px
  }
</style>

