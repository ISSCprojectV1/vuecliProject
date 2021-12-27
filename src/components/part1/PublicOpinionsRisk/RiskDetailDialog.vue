<template>
  <el-dialog :visible.sync="localShow" :title="title" :before-close="beforeClose">
    <slot>
      <table class="myTable" style="border:#121313 solid 2px">
        <tr>
          <td class="column_key">舆情网络规模</td>
          <td class="column_value">{{ RiskInfo.netsize }}</td>
        </tr>
        <tr>
          <td class="column_key">舆情网络密度</td>
          <td class="column_value">
            <template>
              <el-button type="text" @click="handleClick_density()">
                {{ RiskInfo.netdensity | numFilter }}
              </el-button>
            </template>
          </td>

        </tr>
        <tr>
          <td class="column_key">舆情网络直径</td>
          <td class="column_value">
            <template>
              <el-button type="text" @click="handleClick_diameter()">
                {{ RiskInfo.netdiameter }}
              </el-button>
            </template>
          </td>
        </tr>
        <tr>
          <td class="column_key">舆情网络平均距离</td>
          <td class="column_value">{{ RiskInfo.netaveragedistance | numFilter }}</td>
        </tr>
        <tr>
          <td class="column_key">舆情网络聚类系数</td>
          <td class="column_value">{{ RiskInfo.netclusteringcoefficient | numFilter }}</td>
        </tr>
        <tr>
          <td class="column_key">舆情扩散速度</td>
          <td class="column_value">
            <template>
              <el-button type="text" @click="handleClick_diffusion()">
                {{ RiskInfo.diffusionrate | numFilter }}(节点/小时)
              </el-button>
            </template>
          </td>
        </tr>
        <tr>
          <td class="column_key">舆情已持续时间</td>
          <td class="column_value">{{ RiskInfo.existingtime }}</td>
        </tr>
        <tr>
          <td class="column_key">重要节点影响力评估</td>
          <td class="column_value">{{ RiskInfo.importantnodesinfluenceassessment }}</td>
        </tr>
        <tr>
          <td class="column_key">恶意节点占比</td>
          <td class="column_value">{{ RiskInfo.maliciousnodesratio }}</td>
        </tr>
      </table>
      <!--舆情扩散折线图-->
      <div>
        <DiffusionDialog :show="detailShow" title="舆情网络信息时间分布" @close="closeDiffusionDialog"></DiffusionDialog>
      </div>
      <!--舆情网络密度-->
      <div>
        <DensityDialog :show="detailShow_density" title="舆情网络密度展示" @close="closeDensityDialog"></DensityDialog>
      </div>
      <!--舆情网络直径-->
      <div>
        <DiameterDialog :show="detailShow_diameter" title="舆情网络最长传播链展示" @close="closeDiameterDialog"></DiameterDialog>
      </div>
    </slot>
  </el-dialog>

</template>

<script>
import {getOpinionsRiskLevelInformation} from "../../../api/part1/PublicOpinionsRisk";
import DiffusionDialog from "./DiffusionDialog";
import DensityDialog from "./DensityDialog";
import DiameterDialog from "./DiameterDialog";

export default {
  name: "RiskDetailDialog",
  components: {DiameterDialog, DensityDialog, DiffusionDialog},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '详情'
    }
  },
  data() {
    return {
      //dialog参数
      localShow: this.show,
      //表格参数
      RiskInfo: '',

      //舆情扩散dialog参数
      detailShow: false,
      //舆情网络密度dialog参数
      detailShow_density:false,
      //舆情网络直径dialog参数
      detailShow_diameter:false,
    }
  },
  watch: {
    show(val) {
      this.localShow = val
    }
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位
      return parseFloat(value).toFixed(2);
    }
  },
  created() {
    this.getData();
  },
  methods: {
    //*******************************************************************
    //获取表格值相关函数
    //*******************************************************************
    getData() {
      getOpinionsRiskLevelInformation().then((res) => {
        console.log('获取风险等级评估详情!');
        this.RiskInfo = res.data;
      }).catch(() => {
        console.log("taskExecution fail risklevel")
      })
    },
    //*******************************************************************
    //dialog相关函数
    //*******************************************************************
    beforeClose() {
      this.close()
    },
    close() {
      this.$emit('close')
    },
    //*******************************************************************
    //舆情扩散Dialog相关函数
    //*******************************************************************
    handleClick_diffusion() {
      console.log("获取舆情扩散时间分布折线图！")
      this.detailShow = true;
    },
    closeDiffusionDialog() {
      this.detailShow = false;
    },
    //*******************************************************************
    //舆情网络密度Dialog相关函数
    //*******************************************************************
    handleClick_density()
    {
      console.log("获取舆情网络密度展示图！");
      this.detailShow_density=true;
    },
    closeDensityDialog(){
      this.detailShow_density=false;
    },
    //*******************************************************************
    //舆情网络直径Dialog相关函数
    //*******************************************************************
    handleClick_diameter()
    {
      console.log("获取舆情网络最长传播链展示图！");
      this.detailShow_diameter=true;
    },
    closeDiameterDialog(){
      this.detailShow_diameter=false;
    },

  },
}
</script>

<style scoped>
.myTable {
  width: 100%;
  height: 100%;
  background: #ffffff;
  text-align: center;
}

.column_key {
  background: #7a98b2;
  color: #121313;
  font-size: 18px;
  font-weight: bolder;
  width: 40%;
  height: 60px;
}

.column_value {
  background: #ebeff5;
  color: #121313;
  font-size: 18px;
}
</style>