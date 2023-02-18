<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose" >
    <slot>
      <div class="risk_assessment_class" style="width: 100%;height: 100%;background: #ffffff; border: #121313 solid 2px">
        <el-row style="height: 50px;">
          <el-col :span="12">
            <el-row style="height: 50px;border-bottom: #121313 solid 2px; background: #7a98b2;color: #121313;font-weight: bolder;">
              <div>
                <p>风险等级</p>
              </div>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row style="height: 50px;border-bottom: #121313 solid 2px; border-left: #121313 solid 2px;background: #7a98b2;color: #121313;font-weight: bolder;">
              <div>
                <p>{{RiskData.risklevel}}</p>
              </div>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="border-bottom: #121313 solid 2px;height: 100px">
          <el-col :span="8">
            <div >
              <p>时间维度</p>
            </div>
          </el-col>
          <el-col :span="8" >
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: #121313 solid 2px;;height: 50px;" >
              <div>
                <p>平均传播速度</p>
              </div>
            </el-row>
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;height: 50px" >
              <div>
                <p>峰值传播速度</p>
              </div>
            </el-row>
          </el-col >
          <el-col :span="8" >
            <el-row style="border-bottom: #121313 solid 2px;height: 50px" >
              <div>
                <p>{{RiskData.average_speed}}</p>
              </div>
            </el-row>
            <el-row >
              <div>
                <p>{{RiskData.peak_speed}}</p>
              </div>
            </el-row>
          </el-col>
        </el-row>
        <el-row  style="border-bottom: #121313 solid 2px;height: 200px">
          <el-col :span="8">
            <div >
              <p>数量维度</p>
            </div>
          </el-col>
          <el-col :span="8">
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: solid 2px;height: 50px" >
              <div>
                <p>总微博数</p>
              </div>
            </el-row>
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: solid 2px;height: 50px" >
              <div>
                <p>总用户数</p>
              </div>
            </el-row>
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: solid 2px;height: 50px" >
              <div>
                <p>标签阅读数</p>
              </div>
            </el-row>
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;height: 50px" >
              <div>
                <p>标签讨论数</p>
              </div>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row style="border-bottom: solid 2px;height: 50px">
              <div>
                <p>{{RiskData.wblog_num}}</p>
              </div>
            </el-row>
            <el-row style="border-bottom: solid 2px;height: 50px">
              <div>
                <p>{{RiskData.user_num}}</p>
              </div>
            </el-row>
            <el-row style="border-bottom: solid 2px;height: 50px">
              <div>
                <p>{{RiskData.label_readnum}}</p>
              </div>
            </el-row>
            <el-row style="height: 50px">
              <div>
                <p>{{RiskData.label_discussnum}}</p>
              </div>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="border-bottom: #121313 solid 2px;height: 200px">
          <el-col :span="8">
            <div >
              <p>显著维度</p>
            </div>
          </el-col>
          <el-col :span="8">
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: #121313 solid 2px;height: 50px" >
              <div>
                <p>用户平均影响力</p>
              </div>
            </el-row>
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: #121313 solid 2px;height: 50px" >
              <div>
                <p>用户平均活跃度</p>
              </div>
            </el-row>
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: #121313 solid 2px;height: 50px" >
              <div>
                <p>话题标签活跃度</p>
              </div>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row style="border-bottom: #121313 solid 2px;height: 50px">
              <div>
                <p>{{RiskData.user_influence}}</p>
              </div>
            </el-row>
            <el-row style="border-bottom: #121313 solid 2px;height: 50px">
              <div>
                <p>{{RiskData.user_active}}</p>
              </div>
            </el-row>
            <el-row style="border-bottom: #121313 solid 2px;height: 50px">
              <div>
                <p>{{RiskData.label_active}}</p>
              </div>
            </el-row>
            <el-row style="height: 50px">
              <div>
                <p>{{RiskData.user_maliciousrate}}</p>
              </div>
            </el-row>
          </el-col>
        </el-row>
        <el-row  style="height: 150px">
          <el-col :span="8" >
            <div >
              <p>集中维度</p>
            </div>
          </el-col>
          <el-col :span="8">
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px ;border-bottom: #121313 solid 2px;height: 50px">
              <div>
                <p>信息集中度</p>
              </div>
            </el-row >
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;border-bottom: #121313 solid 2px;height: 50px" >
              <div>
                <p>用户密集度</p>
              </div>
            </el-row>
            <el-row style="border-left:#121313 solid 2px;border-right: #121313 solid 2px;height: 50px" >
              <div>
                <p>用户交流度</p>
              </div>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row style="border-bottom: #121313 solid 2px;height: 50px">
              <div>
                <p>{{RiskData.info_concentration}}</p>
              </div>
            </el-row>
            <el-row style="border-bottom: #121313 solid 2px;height: 50px">
              <div>
                <p>{{RiskData.user_intensity}}</p>
              </div>
            </el-row>
            <el-row style="height: 50px">
              <div>
                <p>{{RiskData.user_communication}}</p>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </slot>
  </el-dialog>
</template>

<script>
export default {
  name: "riskassessment_details",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '详情'
    },
    RiskData:{
      required:true,
      default:{},
    }
  },
  data(){
    return{
      //dialog参数
      localShow: this.show,


      //
    }
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created() {

  },
  methods:{
    /**
     * dialog相关函数
     */
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit('close');
    },
  }
}
</script>

<style scoped lang="scss">

</style>