<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" v-if="listValue_WB!=null">
    <slot>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="舆情信息详情" name="first" >
          <table class="event_table" style="border:#121313 solid 2px;text-align: left">
            <tr>
              <td class="column_key">编号</td>
              <td class="column_value">{{listValue_WB.id}}</td>
            </tr>
            <tr>
              <td class="column_key">发布人</td>
              <td class="column_value">{{listValue_WB.username}}</td>
            </tr>
            <tr>
              <td class="column_key">发布内容</td>
              <td class="column_value">{{listValue_WB.content}}</td>
            </tr>
            <tr>
              <td class="column_key">发布时间</td>
              <td class="column_value">{{listValue_WB.releasetime}}</td>
            </tr>
            <tr>
              <td class="column_key">发布来源</td>
              <td class="column_value">{{listValue_WB.source}}</td>
            </tr>
            <tr>
              <td class="column_key">发布平台</td>
              <td class="column_value">{{listValue_WB.platform}}</td>
            </tr>
            <tr>
              <td class="column_key">点赞数</td>
              <td class="column_value">{{listValue_WB.likenum}}</td>
            </tr>
            <tr>
              <td class="column_key">评论数</td>
              <td class="column_value">{{listValue_WB.commentnum}}</td>
            </tr>
            <tr>
              <td class="column_key">转发数</td>
              <td class="column_value">{{listValue_WB.forwardnum}}</td>
            </tr>
            <tr>
              <td class="column_key">链接地址</td>
              <td class="column_value">
                <template>
                  <el-button type="text" @click="handleClick_link">点此跳转</el-button>
                </template>
              </td>
            </tr>
          </table>

        </el-tab-pane>

        <el-tab-pane label="用户信息详情" name="second">
          <table class="person_table" style="border:#121313 solid 2px;text-align: left">
            <tr>
              <td class="column_key">用户名</td>
              <td class="column_value">{{listValue_WB.username}}</td>
            </tr>
            <tr>
              <td class="column_key">用户id</td>
              <td class="column_value">{{listValue_WB.userid}}</td>
            </tr>
            <tr>
              <td class="column_key">微博id</td>
              <td class="column_value">{{listValue_WB.wblogid}}</td>
            </tr>
            <tr>
              <td class="column_key">用户等级</td>
              <td class="column_value">{{listValue_WB.userrank}}</td>
            </tr>
            <tr>
              <td class="column_key">vip等级</td>
              <td class="column_value">{{listValue_WB.viplevel}}</td>
            </tr>
            <tr>
              <td class="column_key">用户性别</td>
              <td class="column_value">{{listValue_WB.gender}}</td>
            </tr>
            <tr>
              <td class="column_key">关注数</td>
              <td class="column_value">{{listValue_WB.follownum}}</td>
            </tr>
            <tr>
              <td class="column_key">粉丝数</td>
              <td class="column_value">{{listValue_WB.fansnum}}</td>
            </tr>
            <tr>
              <td class="column_key">身份认证</td>
              <td class="column_value">{{listValue_WB.authentication}}</td>
            </tr>
            <tr>
              <td class="column_key">认证理由</td>
              <td class="column_value">{{listValue_WB.authenticationreason}}</td>
            </tr>
            <tr>
              <td class="column_key">用户简介</td>
              <td class="column_value">{{listValue_WB.userintroduction}}</td>
            </tr>
            <tr>
              <td class="column_key">注册时间</td>
              <td class="column_value">{{listValue_WB.jointime}}</td>
            </tr>
            <tr>
              <td class="column_key">用户地址</td>
              <td class="column_value">{{listValue_WB.useraddress}}</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
    </slot>
  </el-dialog>
</template>

<script>
export default {
  name: "PersonalEventDetailDialog_WB",
  props:{
    show:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default: '详情'
    },
    listValue_WB: {
      required:true,
      default:[],
    }
  },
  data(){
    return{
      localShow:this.show,
      activeName:'first',
    }
  },
  watch: {
    show (val) {
      this.localShow = val;
    },
  },
  methods: {
    //*******************************************************************
    //Dialog相关函数
    //*******************************************************************
    beforeClose () {
      this.close()
    },
    close () {
      this.$emit('close')
    },
    //*******************************************************************
    //链接跳转外部网页相关函数
    //*******************************************************************
    handleClick_link(){
      let url=this.listValue_WB.linkaddress;
      window.open(url,'_blank');
    },
  }
}
</script>

<style lang="scss" scoped>
.event_table{
  width: 100%;
  height: 100%;

  .column_key{
    background: #7a98b2;
    font-size: 20px;
    font-weight: bolder;//加粗
    color: #121313;
    width: 30%;
    height: 10%;
  }
  .column_value{
    background: #ebeff5;
    font-size: 18px;
    color: #121313;
  }
}
.person_table{
  width: 100%;
  height: 100%;

  .column_key{
    background: #7a98b2;
    font-size: 20px;
    font-weight: bolder;//加粗
    color: #121313;
    width: 30%;
    height: 10%;
  }
  .column_value{
    background: #ebeff5;
    font-size: 18px;
    color: #121313;
    height: 10%;
  }
}
</style>