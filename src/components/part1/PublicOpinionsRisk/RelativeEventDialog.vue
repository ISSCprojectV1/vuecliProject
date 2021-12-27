<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose">
    <slot>
      <div style="height: 100%;width: 100%; background: #cbdaea;border: #121313 solid 2px;">
        <el-form ref="form" :model="form" label-width="15%">
          <el-form-item label="关键词">
            <el-input v-model="form.keyword" placeholder="请输入事件关键词"
                      style="float: right;width: 80%;margin-right: 15%;border: #121313 solid 2px;border-radius: 5px"></el-input>
          </el-form-item>
          <el-form-item label="发布平台">
            <el-select v-model="form.platform" placeholder="请选择平台"
                       style="float: right;width: 80%;margin-right: 15%;border: #121313 solid 2px;border-radius: 5px">
              <el-option label="微博" value="微博"></el-option>
              <el-option label="贴吧" value="贴吧"></el-option>
              <el-option label="新闻" value="新闻"></el-option>
              <el-option label="论坛" value="论坛"></el-option>
              <!--<el-option label="论坛" value="论坛" disabled></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="起始日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.startdate"
                            style="float: right;width: 80%;margin-right: 15%;border: #121313 solid 2px;border-radius: 5px"></el-date-picker>
          </el-form-item>
          <el-form-item label="终止日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.enddate"
                            style="float: right;width: 80%;margin-right: 15%;border: #121313 solid 2px;border-radius: 5px"></el-date-picker>
          </el-form-item>
          <el-form-item label="交易所名">
            <el-select v-model="form.exchangename" placeholder="请选择交易所"
                       style="float: right;width: 80%;margin-right: 15%;border: #121313 solid 2px;border-radius: 5px">
              <el-option v-for="item in exchangenamedata" :key="item.id" :label="item.name"
                         :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="Submit" style="float:left; margin-left: 5%;border: #121313 solid 2px;">
              确定
            </el-button>
            <el-button type="primary " @click="close" style="float:right; margin-right: 15%;border: #121313 solid 2px;">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import {getExchangeNameData} from "../../../api/part1/PublicOpinionsRisk";

export default {
  name: "RelativeEventDialog",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '搜索'
    }
  },
  data() {
    return {
      //显示
      localShow: this.show,

      //表单数据
      form: {
        keyword: '',
        platform: '',
        exchangename: '',
      },

      //需要从后端获取的交易所数据
      exchangenamedata: [],

      //要传递的数据
      submitValue: {
        inputWord: '',
        fromPlatform: '',
        starttime: '',
        endtime: '',
        exchangename: '',
      },
    }
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created() {
    this.getExchangeNameInformation();
  },
  methods: {
    //*******************************************************************
    //Dialog相关函数
    //*******************************************************************
    beforeClose() {
      this.close()
    },
    close() {
      this.$emit('close')
    },
    //*******************************************************************
    //从后端获取交易所下拉框数值相关函数
    //*******************************************************************
    getExchangeNameInformation() {
      getExchangeNameData().then((res) => {
        let temp = res.data;
        for (let i = 0; i < temp.length; i++) {
          let obj = {};
          obj.id = i;
          obj.name = temp[i];
          this.exchangenamedata[i] = obj;
        }
      }).catch(() => {
        console.log("getExchangeNameInformation fail")
      });
    },

    //*******************************************************************
    //传递表单数据相关函数
    //*******************************************************************
    Submit() {
      //搜索

      if (this.form.keyword === '' || this.form.enddate === '' || this.form.startdate === '' || this.exchangenamedata === '') {
        this.$message.error('表单输入不得为空！');
      } else if (this.form.enddate < this.form.startdate) {
        this.$message.error('终止日期不得小于起始日期！');
      } else if (new Date() < this.form.enddate) {
        this.$message.error('终止日期不得大于今日日期！');
      } else {
        console.log('submit!');
        this.form.enddate.setMinutes(this.form.enddate.getMinutes() + 59);
        this.form.enddate.setHours(this.form.enddate.getHours() + 23);
        this.submitValue.inputWord = this.form.keyword;
        this.submitValue.fromPlatform = this.form.platform;
        this.submitValue.starttime = this.form.startdate;
        this.submitValue.endtime = this.form.enddate;
        this.submitValue.exchangename = this.form.exchangename;
        this.$emit('func', this.submitValue);
      }

    },
  },
}
</script>

<style lang="scss" scoped>
.el-form {
  margin-top: 12px;
}
</style>