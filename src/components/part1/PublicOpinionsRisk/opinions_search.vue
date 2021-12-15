<template>
  <div class="panel">
    <h2>舆情事件查询</h2>
    <div class="button_class">
      <el-button type="primary" icon="el-icon-search" @click="handleClick_search" style="width:250px;background: #7a98b2;border: #121313 solid 2px; color: #121313">搜索</el-button>
      <!--多源点舆情网络构建-->
      <el-button type="primary" icon="el-icon-orange" @click="handleClick_multi_points_network" style="width:250px;background: #7a98b2;border: #121313 solid 2px; color: #121313">多源点舆情网络构建</el-button>
      <!--事件搜索-->
      <div class="panel_search_event">
        <RelativeEventDialog :show="eventShow" title="舆情事件搜索" @close="closeRelativeEventDialog" @func="getFormValue"></RelativeEventDialog>
      </div>
    </div>
    <div class="table_class">
      <el-table ref="multipleTable"
                :data="dormitory.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                tooltip-effect="dark"
                border
                style="width: 100%;border: #121313 solid 2px;"
                @select="handleSelectionChange"
                :row-key="getRowKeys"
                :header-cell-style="{background:'#7a98b2',color:'black'}"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column prop="id" label="编号" ></el-table-column>
        <el-table-column prop="name" label="发布人"  ></el-table-column>
        <el-table-column prop="content" label="内容摘要" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="releasetime" label="发布时间" sortable :formatter="setDate"></el-table-column>
        <el-table-column prop="platform" label="发布平台"  ></el-table-column>
        <el-table-column prop="commentnum" label="评论数"  sortable v-if="this.commentShow"></el-table-column>
        <el-table-column prop="forwardnum" label="转发数"  sortable v-if="this.forwardShow"></el-table-column>
        <el-table-column prop="importance" label="重要性评估"  sortable></el-table-column>
        <el-table-column prop="exchangename" label="相关交易所"  sortable></el-table-column>
        <el-table-column prop="details" label="详情"  >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" >查看详情</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column prop="linkaddress" label="链接地址" >
          <template slot-scope="scope">
            <a link :href="scope.row.linkaddress" target="_blank" style="color: #559cf1">点击跳转</a>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <!--分页器-->
    <div class="pagination_class">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="PageSizes"
          :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="dormitory.length">
      </el-pagination>
    </div>

    <div class="dialog_class">
      <PersonalEventDetailDialog_WB :show="detailShow_WB" title="相关信息详情" @close="closePersonalEventDialog_WB" v-bind:listValue_WB="listValue_WB" ></PersonalEventDetailDialog_WB>
    </div>
    <div class="dialog_class">
      <PersonalEventDetailDialog_LT :show="detailShow_LT" title="相关信息详情" @close="closePersonalEventDialog_LT" v-bind:listValue_LT="listValue_LT" ></PersonalEventDetailDialog_LT>
    </div>
  </div>
</template>

<script>
import RelativeEventDialog from "./RelativeEventDialog";
import PersonalEventDetailDialog_WB from "./PersonalEventDetailDialog_WB";
import PersonalEventDetailDialog_LT from "./PersonalEventDetailDialog_LT";
import {
  createWbForwardInformation,
  getSearchStatus,
  getWbForwardInformation,
  getWbInformationByKeyWords,
  getLtInformationByKeyWords,
} from "../../../api/part1/PublicOpinionsRisk";
import moment from "moment";
import {Loading} from "element-ui";
export default {
  name: "opinions_search",
  components:{PersonalEventDetailDialog_WB,PersonalEventDetailDialog_LT,RelativeEventDialog},
  data(){
    return{
      eventShow:true,
      currentPage:1,
      PageSizes:[5,10,15,20,30],
      PageSize:10,
      keyWord:'',//用户输入的关键词
      fromPlatform:'',//用户勾选的来源平台
      startTime:'',//用户输入的起始日期
      endTime:'',//用户输入的终止日期
      exchangename:'',//用户输入的交易所名称
      dormitory: [],
      selectedData:[],//用户勾选的表格数据

      listValue_WB:'',//传给dialog的数据
      detailShow_WB:false,//详情展示dialog
      listValue_LT:'',//传给dialog的数据
      detailShow_LT:false,//详情展示dialog

      loading_forward:'',

      //是否轮询标志
      intervalFlag:true,
      timer:null,

      //列显示
      forwardShow:false,
      commentShow:false,
    }
  },

  methods: {
    //*******************************************************************
    //获取表格数据相关函数
    //*******************************************************************
    //获取用户输入的关键词、发布平台和交易所名称
    getFormValue(data){
      this.dormitory=[];
      this.eventShow=false;
      this.keyWord=data.inputWord;
      this.fromPlatform=data.fromPlatform;
      this.startTime=data.starttime;
      this.endTime=data.endtime;
      this.exchangename=data.exchangename;
      if(this.keyWord!=='' && this.fromPlatform!=='' && this.startTime!=='' && this.endTime!=='')
      {
        //判断来源平台
        if(this.fromPlatform==='微博')
        {
          this.forwardShow=true;
          this.commentShow=false;
          this.getWbDataByForm(this.keyWord,this.startTime,this.endTime,this.exchangename);
        }
        else if(this.fromPlatform==='论坛')
        {
          this.commentShow=true;
          this.forwardShow=false;
          //获取论坛数据
          this.getLtDataByForm(this.keyWord,this.startTime,this.endTime,this.exchangename);
        }
      }
      else
      {
        console.log('用户输入信息不完整');
        this.$message.error('表单输入不得为空！');
      }

    },
    //根据关键词读取微博数据
    getWbDataByForm(val,starttime,endtime,exchangename)
    {
      let URL='/getWbInformationByKeyWords/'+val+'/'+starttime+'/'+endtime+'/'+exchangename;
      getWbInformationByKeyWords(URL).then((res) => {
        console.log('根据关键词读取微博数据');
        if(res.data.length>0)
        {
          this.dormitory=res.data;
        }
        else
        {
          this.$message.warning('获取相关内容数为0！');
        }
      }).catch(()=>{
        console.log("getWbInformationByKeyWords fail")
      });
    },

    //根据关键词读取论坛数据
    getLtDataByForm(val,starttime,endtime,exchangename)
    {
      let URL='/getLtInformationByKeyWords/'+val+'/'+starttime+'/'+endtime+'/'+exchangename;
      getLtInformationByKeyWords(URL).then((res) => {
        console.log('根据关键词读取论坛数据');
        if(res.data.length>0)
        {
          this.dormitory=res.data;
        }
        else
        {
          this.$message.warning('获取相关内容数为0！');
        }
      }).catch(()=>{
        console.log("getLtInformationByKeyWords fail")
      });
    },

    //转换时间格式
    setDate(row,col)
    {
      var newdate=row[col.property];
      if(newdate===undefined){return ''}
      return moment(newdate).format("YYYY-MM-DD HH:mm");
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
    //表格查看详情相关函数
    //*******************************************************************
    handleClick(val)
    {
      if(val.platform==='微博')
      {
        //显示dialog
        this.detailShow_WB=true;

        //传值给dialog
        let index=0;
        for(let i = 0; i<this.dormitory.length; i++)
        {
          if(this.dormitory[i].id===val.id)
          {
            index=i;
            break;
          }
        }
        this.listValue_WB=this.dormitory[index];
      }
      else if(val.platform==='论坛')
      {
        //显示dialog
        this.detailShow_LT=true;

        //传值给dialog
        let index=0;
        for(let i=0;i<this.dormitory.length;i++)
        {
          if(this.dormitory[i].id===val.id)
          {
            index=i;
            break;
          }
        }
        this.listValue_LT=this.dormitory[index];
      }
    },
    closePersonalEventDialog_WB(){
      this.detailShow_WB=false;
    },
    closePersonalEventDialog_LT(){
      this.detailShow_LT=false;
    },
    //*******************************************************************
    //勾选源头节点相关函数
    //*******************************************************************
    getRowKeys (row) {
        return row.id;
    },
    handleSelectionChange(val) {
      this.selectedData =val;
    },
    //*******************************************************************
    //搜索dialog相关函数
    //*******************************************************************
    handleClick_search(){
      this.eventShow=true;
    },
    closeRelativeEventDialog(){
      this.eventShow=false;
    },
    //*******************************************************************
    //创建多源点舆情网络相关函数
    //*******************************************************************
    handleClick_multi_points_network() {

      if(this.selectedData.length===0)
      {
        this.$message.warning('请选择源头节点');
      }
      else if(this.selectedData.length>5)
      {
        this.$message.error('请选择不超过5个源头节点');
      }
      else
      {
        //打印勾选的数据
        //console.log(JSON.stringify(this.selectedData));
        //根据源头节点获取转发节点
        this.createForwardNode(this.selectedData);
        this.$message.success('共选择'+this.selectedData.length+'个源头节点');
      }
    },

    //根据源头节点搜集转发数据
    createForwardNode(val)
    {
      let options = {
        lock: true,
        text: '创建多源点舆情网络中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      };
      this.loading_forward=Loading.service(options);
      createWbForwardInformation(val).then((res)=>{
        console.log('成功传送源头节点数据！');
        this.checkWbSearchState();
      }).catch(()=>{
        console.log("createWbForwardInformation fail");
      });
    },
    //查询搜集数据状态
    checkWbSearchState()
    {
      getSearchStatus().then((res)=>{
        console.log('getSearchStatus:status='+res.data);
        this.getForwardNode();
        if(this.intervalFlag)
        {
          this.set_interval();
        }
      }).catch(()=>{
        console.log("getSearchStatus fail");
      });
    },

    //隔2s访问
    set_interval()
    {
      window.clearInterval(this.timer)
      this.timer=window.setInterval(()=>{
        setTimeout(
          this.getForwardNode(),0)
      },2000)
    },

    //获取搜集的转发数据
    getForwardNode()
    {
      getWbForwardInformation().then((res)=>{
        console.log('获取微博转发数据！status='+res.data.status);
        if(res.data.status===0)
        {
          window.clearInterval(this.timer);
          this.timer = null;
          this.intervalFlag=false; //设置为不执行轮询
          this.jumpNetwork();
        }
        }).catch(()=>{
        console.log("getWbForwardInformation fail");
      });
    },
    //传值跳转
    jumpNetwork()
    {
      getWbForwardInformation().then((res)=>{
        this.loading_forward.close();
        this.$router.push({path:'/trade/PublicOpinionsRisk/opinions_network',query:{sourceNodeInformation:res.data}});
      }).catch(()=>{
        console.log("jumpNetwork fail");
      });
    },
  },
  computed:{
    checkedWeight(){
      let totalWeight = 0;
      this.selectedData.forEach(item =>{
        totalWeight += item.weight;
      });
      return totalWeight.toFixed(2);
    }
  }
}
</script>

<style lang="scss" scoped>
.panel{
  background: #ffffff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);

  .table_class{
    margin: 20px 30px 20px 30px;
  }
}
</style>