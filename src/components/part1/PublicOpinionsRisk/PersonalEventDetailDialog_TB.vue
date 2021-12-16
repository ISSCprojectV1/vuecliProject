<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" v-if="listValue_TB!=null">
    <slot>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="舆情信息详情" name="first">
          <table class="event_table" style="border:#121313 solid 2px">
            <tr>
              <td class="column_key">编号</td>
              <td class="column_value">{{listValue_TB.id}}</td>
            </tr>
            <tr>
              <td class="column_key">发布人</td>
              <td class="column_value">{{listValue_TB.name}}</td>
            </tr>
            <tr>
              <td class="column_key">发布内容</td>
              <td class="column_value">{{listValue_TB.content}}</td>
            </tr>
            <tr>
              <td class="column_key">发布时间</td>
              <td class="column_value">{{listValue_TB.releasetime}}</td>
            </tr>
            <tr>
              <td class="column_key">发布平台</td>
              <td class="column_value">{{listValue_TB.platform}}</td>
            </tr>
            <tr>
              <td class="column_key">发布来源</td>
              <td class="column_value">{{listValue_TB.sourcefirstclass}} / {{listValue_TB.sourcesecondclass}} / {{listValue_TB.source}}</td>
            </tr>
            <tr>
              <td class="column_key">转发数</td>
              <td class="column_value">{{listValue_TB.forwardnum}}</td>
            </tr>
            <tr>
              <td class="column_key">点赞数</td>
              <td class="column_value">{{listValue_TB.likenum}}</td>
            </tr>
            <tr>
              <td class="column_key">回复数</td>
              <td class="column_value">{{listValue_TB.commentnum}}</td>
            </tr>
            <tr>
              <td class="column_key">有效帖数</td>
              <td class="column_value">{{listValue_TB.validpostnum}}</td>
            </tr>
            <tr>
              <td class="column_key">链接地址</td>
              <td class="column_value">
                <template>
                  <el-button type="text" @click="handleClick_lick">点此跳转</el-button>
                </template>
              </td>
            </tr>
          </table>
        </el-tab-pane>

        <el-tab-pane label="用户信息详情" name="second">
          <table class="person_table" style="border:#121313 solid 2px">
            <tr>
              <td class="column_key">用户名</td>
              <td class="column_value">{{listValue_TB.name}}</td>
            </tr>
            <tr>
              <td class="column_key">用户id</td>
              <td class="column_value">{{listValue_TB.userid}}</td>
            </tr>
            <tr>
              <td class="column_key">用户贴吧标识</td>
              <td class="column_value">{{listValue_TB.portrait}}</td>
            </tr>
            <tr>
              <td class="column_key">粉丝数</td>
              <td class="column_value">{{listValue_TB.fansnum}}</td>
            </tr>
            <tr>
              <td class="column_key">用户在来源贴吧等级</td>
              <td class="column_value">{{listValue_TB.sourcelevel}}</td>
            </tr>

          </table>
        </el-tab-pane>
      </el-tabs>
    </slot>
  </el-dialog>
</template>

<script>
export default {
  name: "PersonalEventDetailDialog_TB",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '详情'
    },
    listValue_TB: {
      required: true,
      default: {},
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
    handleClick_lick(){
      var url=this.listValue_TB.linkaddress;
      window.open(url,'_blank');
    },
    timestampToTime (cjsj) {
      var date = new Date(cjsj) ;//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      return Y+M+D
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
    width: 40%;
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
</style>