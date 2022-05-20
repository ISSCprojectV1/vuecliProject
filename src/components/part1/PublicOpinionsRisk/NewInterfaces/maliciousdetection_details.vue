<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" class="MaliciousDialogClass">
    <slot>
      <div class="malicious_details_class" style="width: 100%;height: 100%;background: #ffffff">
        <!--表格-->
        <div class="graph-panel">
            <el-table :data="malicious_data.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                      style="width: 100%;border: #121313 solid 2px;"
                      border
                      :header-cell-style="{background:'#7a98b2',color:'black'} ">
              <el-table-column prop="id" label="用户编号"></el-table-column>
              <el-table-column prop="username" label="用户名"></el-table-column>
              <el-table-column prop="releasetime" label="发布时间"></el-table-column>
              <el-table-column prop="content" label="发布内容" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <a :href="scope.row.linkaddress" target="_blank" style="text-decoration: none;">{{scope.row.content}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="links" label="信息详情">
                <template slot-scope="scope">
                  <el-button type="text" size="small"  @click="handleClick_userdetails(scope.row)" >点击查看</el-button>
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
                :total="malicious_data.length">
            </el-pagination>
          </div>
        <!--用户信息详情弹出框-->
        <div class="dialog_class">
          <PersonalEventDetailDialog_WB :show="detailShow_WBUser" title="用户相关信息详情" @close="closePersonalEventDialog_WB" v-bind:listValue_WB="listValue_WB" ></PersonalEventDetailDialog_WB>
        </div>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import PersonalEventDetailDialog_WB from "../PersonalEventDetailDialog_WB";
import {getMaliciousUserDetails} from "../../../../api/part1/PublicSentimentRisk";

export default {
  name: "maliciousdetection_details",
  components:{PersonalEventDetailDialog_WB},
  props:{
    show:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default: '',
    },
    malicious_data:{
      required:true,
      default:[],
    }
  },
  data(){
    return{
      //dialog参数
      localShow:this.show,

      //表格
      currentPage:1,
      pageSizes:[5,10,15,20],
      PageSize:5,

      //用户信息详情相关参数
      detailShow_WBUser:false,
      listValue_WB:[],
    }
  },
  watch: {
    show (val) {
      this.localShow = val
    }
  },
  created() {
  },
  methods:{
    //dialog相关函数
    beforeClose () {
      this.close()
    },
    close () {
      this.$emit('close')
    },
    //分页器相关函数
    handleSizeChange(val)
    {
      this.PageSize=val;// 改变每页显示的条数
      this.currentPage=1;// 注意：在改变每页显示的条数时，要将页码显示到第一页
    },
    handleCurrentChange(val)
    {
      this.currentPage=val; // 改变默认的页数
    },
    //查看用户信息详情
    handleClick_userdetails(val)
    {
      this.detailShow_WBUser=true;
      for(let i=0;i<this.malicious_data.length;i++)
      {
        if(val.id===this.malicious_data[i].id)
        {
          this.listValue_WB=this.malicious_data[i];
          break;
        }
      }
    },
    //关闭查看用户信息详情弹出框
    closePersonalEventDialog_WB()
    {
      this.detailShow_WBUser=false;
    },
  }
}
</script>

<style lang="scss" >
</style>