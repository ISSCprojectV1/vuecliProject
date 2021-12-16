<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose">
    <slot>
      <div style="height: 100px;width: 100%; background: #cbdaea;border: #121313 solid 2px;">
        <div style="margin-bottom: 10px">
          <label style="font-size: 20px;color: #121313">是否搜集最新信息并更新？</label>
        </div>
        <div>
          <el-button type="primary" @click="Submit" style="float:left; margin-left: 5%;border: #121313 solid 2px;">确定</el-button>
          <el-button type="primary " @click="close" style="float:right; margin-right: 15%;border: #121313 solid 2px;">取消</el-button>
        </div>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
import {crawlWbInformation} from "../../../api/part1/PublicOpinionsRisk";
import {Loading} from "element-ui";

export default {
  name: "UpdateOpinionsDialog",
  props:{
    show:{
      type:Boolean,
      default:false,
    },
    title:{
      type:String,
      default: '搜索'
    }
  },
  data(){
    return{
      localShow:this.show,

    }
  },
  watch: {
    show (val) {
      this.localShow = val;
    }
  },
  methods:{
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
    //是否要调用爬虫搜集最新的舆情信息
    //*******************************************************************
    Submit() {
      var update_opinions_flag = true;
      this.$emit('func', update_opinions_flag);
    }
  },
}
</script>

<style scoped>

</style>