<template>
  <div>
    <div style="margin-bottom: 0.5rem;">
      <el-steps :active="stepActive" finish-status="success" align-center simple>
        <el-step v-for="item in steps" :key="item.num" :title="item.title"
                 :class="'step-active'"
                 @click.native="onClickStep(item.title, item.num)"></el-step>
      </el-steps>
    </div>
    <div style="margin: 1rem 1rem;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
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
          title: '粒度自适应补全',
          num: 1
        },
        {
          title: '模态动态切换',
          num: 2
        },
        {
          title: '联盟形成',
          num: 3
        },
        {
          title: '人机器资源调度',
          num: 4
        },
        {
          title: '模态粒度指标优化',
          num: 5
        }]
    }
  },
  created() {
    let arr = this.$route.path.split('/');
    let page_name = arr[arr.length - 1];
    let title = '';
    let numStep = 0;
    switch (page_name) {
      case 'taskInput':
        title = '任务输入'
        numStep = 0
        break
      case 'taskQueryTableView':
        title = '粒度自适应补全'
        numStep = 1
        break
      case 'taskQueryOnlyModityView':
        title = '模态动态切换'
        numStep = 2
        break
      case 'taskQueryTransactionCoalition':
        title = '联盟形成'
        numStep = 3
        break
      case 'taskQueryFlowChart':
        title = '人机器资源调度'
        numStep = 4
        break
      case 'algorithmAnalysisTable':
        title = '模态粒度指标优化'
        numStep = 5
        break
      default:
        break;
    }
    this.onClickStep(page_name, numStep)
    // 判断返回上一个step的界面
    // if (!this.$store.state.stepbarposition) {
    //   this.onClickStep(this.steps[0].title, 0)
    // } else
    //   this.onClickStep(this.steps[this.$store.state.stepbarposition].title, this.$store.state.stepbarposition)
  },
  methods: {
    onClickStep(title, numStep) {
      switch (title) {
        case '任务输入':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput")
          break
        case '粒度自适应补全':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
          break
        case '模态动态切换':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryOnlyModityView")
          break
        case '联盟形成':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
          break
        case '人机器资源调度':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")
          break
        case '模态粒度指标优化':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/algorithmAnalysisTable")
          break
        default:
          break
      }
      this.$store.commit('setStepbarPosition', numStep);
      this.stepActive = numStep;
    },
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
    padding: 0.2rem 0.7rem;
    text-align: center;
    font-size: 14px;
  }

  /deep/ .el-step__title.is-wait {
    padding: 0.2rem 0.7rem;
    text-align: center;
    font-size: 14px;
  }

  /deep/ .el-step__title.is-success {
    padding: 0.2rem 0.7rem;
    text-align: center;
    font-size: 14px;
  }
}
</style>