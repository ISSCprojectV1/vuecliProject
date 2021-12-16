<template>
  <div class="panel">
    <h2>今日舆情信息</h2>
    <div class="search_class">
      <label style="font-size: 20px">搜索</label>
      <i class="el-icon-search" slot="reference"></i>
      <el-input v-model="search" style="display: inline-block;width: 200px" placeholder="请输入关键词"></el-input>
    </div>
    <div class="table_class">
      <el-table :data="tables.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                border
                style="width: 100%;border: #121313 solid 2px;"
                highlight-current-row
                :header-cell-style="{background:'#7a98b2',color:'black'}"
      >
        <el-table-column prop="id" label="编号"  sortable></el-table-column>
        <el-table-column prop="name" label="发布人"></el-table-column>
        <el-table-column prop="content" label="内容摘要" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="releasetime" label="发布时间" sortable ></el-table-column>
        <el-table-column prop="platform" label="发布平台" sortable></el-table-column>
        <el-table-column prop="importance" label="重要性评估"  sortable></el-table-column>
        <el-table-column prop="exchangename" label="相关交易所"  sortable></el-table-column>
        <el-table-column prop="details" label="详情"  >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" >查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页器-->
    <div class="pagination_class">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="dormitory.length">
      </el-pagination>
    </div>
    <div class="dialog_class">
      <PersonalEventDetailDialog_WB :show="detailShow_WB" title="相关信息详情" @close="closePersonalEventDialog_WB" v-bind:listValue_WB="listValue_WB" ></PersonalEventDetailDialog_WB>
    </div>
    <div class="dialog_class">
      <PersonalEventDetailDialog_TB :show="detailShow_TB" title="相关信息详情" @close="closePersonalEventDialog_TB" v-bind:listValue_TB="listValue_TB" ></PersonalEventDetailDialog_TB>
    </div>
    <div class="dialog_class">
      <PersonalEventDetailDialog_XW :show="detailShow_XW" title="相关信息详情" @close="closePersonalEventDialog_XW" v-bind:listValue_XW="listValue_XW" ></PersonalEventDetailDialog_XW>
    </div>
    <div class="dialog_class">
      <PersonalEventDetailDialog_LT :show="detailShow_LT" title="相关信息详情" @close="closePersonalEventDialog_LT" v-bind:listValue_LT="listValue_LT" ></PersonalEventDetailDialog_LT>
    </div>
  </div>
</template>

<script>
import PersonalEventDetailDialog_WB from "./PersonalEventDetailDialog_WB";
import PersonalEventDetailDialog_TB from "./PersonalEventDetailDialog_TB";
import PersonalEventDetailDialog_XW from "./PersonalEventDetailDialog_XW";
import PersonalEventDetailDialog_LT from "./PersonalEventDetailDialog_LT";
import {
  getOpinionsLtInformation,
  getOpinionsTbInformation,
  getOpinionsWbInformation,
  getOpinionsXwInformation
} from "../../../api/part1/PublicOpinionsRisk";
import moment from "moment";

export default {
  name: "opinions_riskinfo",
  components: {PersonalEventDetailDialog_WB,PersonalEventDetailDialog_TB,PersonalEventDetailDialog_XW,PersonalEventDetailDialog_LT},
  props:{
    msg:{
      type: String,
      default: '',
    }
  },
  data(){
    return{
      //分页器相关变量
      currentPage:1,
      pageSizes:[5,10,15,20],
      PageSize:10,

      //模糊搜索
      search:'',

      listValue_WB:'',//传给dialog的数据
      detailShow_WB:false,//详情展示dialog
      listValue_TB:'',//传给dialog的数据
      detailShow_TB:false,//详情展示dialog
      listValue_XW:'',//传给dialog的数据
      detailShow_XW:false,//详情展示dialog
      listValue_LT:'',//传给dialog的数据
      detailShow_LT:false,//详情展示dialog

      //表格数据
      dormitory: [],
      dataConvert_WB:[],//微博舆情信息数据
      dataConvert_TB:[],//贴吧舆情信息数据
      dataConvert_XW:[],//新闻舆情信息数据
      dataConvert_LT:[],//论坛舆情信息数据
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    setTimeout(()=>{
      this.dormitory=this.getDormitoryData();
    },500)//接收数据，延迟加载
  },
  computed:{
    // 模糊搜索
    tables () {
      const search = this.search
      if (search) {
        return this.dormitory.filter(data => {
          return Object.keys(data).some(key => {
            return String(data[key]).indexOf(search) > -1
          })
        })
      }
      return this.dormitory
    }
  },
  methods: {

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
      this.currentPage=val; // 改变默认的页数
    },
    //*******************************************************************
    //表格数据获取相关函数
    //*******************************************************************
    //从数据库加载数据
    getData(){
      var starttime=moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');//开始时间
      let date1=new Date(starttime);
      var endtime=moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');//结束时间
      let date2=new Date(endtime);
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取微博数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      var URL_Wb='/getOpinionsWbInformation/'+date1+'/'+date2;
      getOpinionsWbInformation(URL_Wb).then((res) => {
        this.dataConvert_WB=res.data;
        console.log('获取微博数据!');

      }).catch(() => {
        console.log("taskExecution fail Wb")
      })
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取微信数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      var URL_Tb='/getOpinionsTbInformation/'+date1+'/'+date2;
      getOpinionsTbInformation(URL_Tb).then((res) => {
        this.dataConvert_TB=res.data;
        console.log('获取微信数据!');

      }).catch(() => {
        console.log("taskExecution fail Tb")
      })
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取新闻数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      var URL_Xw='/getOpinionsXwInformation/'+date1+'/'+date2;
      getOpinionsXwInformation(URL_Xw).then((res) => {
        this.dataConvert_XW=res.data;
        console.log('获取新闻数据!');

      }).catch(() => {
        console.log("taskExecution fail Xw")
      })
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      //获取论坛数据
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      var URL_Lt='/getOpinionsLtInformation/'+date1+'/'+date2;
      getOpinionsLtInformation(URL_Lt).then((res) => {
        this.dataConvert_LT=res.data;
        console.log('获取论坛数据!');

      }).catch(() => {
        console.log("taskExecution fail Lt")
      })
    },
    //获取表格数据
    getDormitoryData()
    {
      var index=0;
      var dormitory=[];
      for(var i=index;i<this.dataConvert_WB.length;i++)
      {
        dormitory[i]=this.dataConvert_WB[i];
      }
      index=dormitory.length;
      for(i=0;i<this.dataConvert_TB.length;i++)
      {
        dormitory[index+i]=this.dataConvert_TB[i];
      }
      index=dormitory.length;
      for(i=0;i<this.dataConvert_XW.length;i++)
      {
        dormitory[index+i]=this.dataConvert_XW[i];
      }
      index=dormitory.length;
      for(i=0;i<this.dataConvert_LT.length;i++)
      {
        dormitory[i+index]=this.dataConvert_LT[i];
      }

      for(var j=0;j<dormitory.length;j++)
      {
        dormitory[j].releasetime=this.timestampToTime(dormitory[j].releasetime);
        dormitory[j].jointime=this.timestampToTime(dormitory[j].jointime);
      }

      //按id进行升序排序
      //dormitory.sort((a,b)=>{return a['id']-b['id'];})
      return dormitory;
    },
    // 转换时间戳
    timestampToTime (cjsj) {
      var date = new Date(cjsj) ;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() <10 ? '0'+date.getDate():date.getDate())+ ' ';
      var h = (date.getHours()<10 ? '0'+date.getHours() :date.getHours() )+ ':';
      var m = (date.getMinutes()<10 ? '0'+date.getMinutes() :date.getMinutes() );
      return Y+M+D+h+m
    },
    //*******************************************************************
    //表格查看详情相关函数
    //*******************************************************************
    handleClick(val){

      if(val.platform==='微博')
      {
        //显示dialog
        this.detailShow_WB=true;

        //传值给dialog
        let index = 0;
        for(let i = 0; i<this.dataConvert_WB.length; i++)
        {
          if(this.dataConvert_WB[i].id===val.id)
          {
            index=i;
            break;
          }
        }
        this.listValue_WB=this.dataConvert_WB[index];
      }
      else if(val.platform==='贴吧')
      {
        //显示dialog
        this.detailShow_TB=true;

        //传值给dialog
        let index=0;
        for(let i=0;i<this.dataConvert_TB.length;i++)
        {
          if(this.dataConvert_TB[i].id===val.id)
          {
            index=i;
            break;
          }
        }
        this.listValue_TB=this.dataConvert_TB[index];
      }
      else if(val.platform==='新闻')
      {
        //显示dialog
        this.detailShow_XW=true;

        //传值给dialog
        let index=0;
        for(let i=0;i<this.dataConvert_XW.length;i++)
        {
          if(this.dataConvert_XW[i].id===val.id)
          {
            index=i;
            break;
          }
        }
        this.listValue_XW=this.dataConvert_XW[index];
      }
      else
      {
        //显示dialog
        this.detailShow_LT=true;

        //传值给dialog
        let index=0;
        for(let i=0;i<this.dataConvert_LT.length;i++)
        {
          if(this.dataConvert_LT[i].id===val.id)
          {
            index=i;
            break;
          }
        }
        this.listValue_LT=this.dataConvert_LT[index];
      }

    },
    closePersonalEventDialog_WB(){
      this.detailShow_WB=false;
    },
    closePersonalEventDialog_TB(){
      this.detailShow_TB=false;
    },
    closePersonalEventDialog_XW(){
      this.detailShow_XW=false;
    },
    closePersonalEventDialog_LT(){
      this.detailShow_LT=false;
    },

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
  .el-icon-search{
    margin: 0 10px 0 4px;//上、右、下、左
  }
}



</style>