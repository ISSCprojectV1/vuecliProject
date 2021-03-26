<template>
  <div>
    <div style="margin-bottom: 0.5rem;">
      <el-steps :active="stepActive" finish-status="success" align-center simple>
        <el-step v-for="item in steps" :key="item.num" :title="item.title"
                 :class="stepActive === item.num ? 'step-active' : 'step-active'"
                 @click.native="onClickStep(item.num)"></el-step>
      </el-steps>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/*
*   <div>
        <el-tag>点击步骤条相关步骤查看对应内容</el-tag>
        </div>
        <div>
        <el-button @click="goformer()">上一步</el-button>
        <el-button @click="golater()" >下一步</el-button>
            </div>
* */
export default {
  name: "stepBar",
  data() {
    return {
      stepActive: 0,
      steps: [
        {
          title: '任务输入',
          num: 0
        },
        {
          title: '粒度补全',
          num: 1
        },
        {
          title: '联盟形成',
          num: 2
        },
        {
          title: '人际资源调度',
          num: 3
        }]
    }
  },
  created() {
    this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
  },
  methods: {
    goformer() {
      /* if(this.stepActive>=1)
       {
           this.$router.go(-1)
           this.stepActive--
       }*/
      if (this.stepActive === 1) {
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
        this.stepActive = 0
        return
      }
      if (this.stepActive === 2) {
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
        this.stepActive = 1
        return
      }
      if (this.stepActive === 3) {
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
        this.stepActive = 2
      }
    },
    golater() {
      console.log(this.stepActive)
      if (this.stepActive === 0) {
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
        this.stepActive = 1
        return
      }
      if (this.stepActive === 1) {
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
        this.stepActive = 2
        return
      }
      if (this.stepActive === 2) {
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")
        this.stepActive = 3
      }
    },
    onClickStep(numStep) {
      switch (numStep) {
        case 0:
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
          this.stepActive = 0
          break
        case 1:
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
          this.stepActive = 1
          break
        case 2:
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
          this.stepActive = 2
          break
        case 3:
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")
          this.stepActive = 3
          break
        default:
          break
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.el-step.is-simple.step-active {
  /deep/ .el-step__title.is-process {
    color: white;
    font-weight: normal;
    border: 0.1px solid #409eff;
    background-color: #409eff;
    border-radius: 0.3rem;
    padding: 0.2rem 1rem;
  }

  /deep/ .el-step__title.is-wait {
    padding: 0.2rem 1rem;
  }

  /deep/ .el-step__title.is-success {
    padding: 0.2rem 1rem;
  }
}
</style>