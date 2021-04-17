<template>
  <div>
    <div style="margin-bottom: 0.5rem">
      <el-steps :active="stepActive" finish-status="success" align-center simple>
        <el-step v-for="item in steps" :key="item.num" :title="item.title"
                 :class="stepActive === item.num ? 'step-active' : 'step-active'"
                 @click.native="onClickStep(item.title, item.num)"></el-step>
      </el-steps>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {getRole} from "@/utils/auth";

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
          title: '主动模态',
          num: 2
        },
        {
          title: '联盟形成',
          num: 3
        },
        {
          title: '人机器资源调度',
          num: 4
        }]
    }
  },
  created() {
    // 根据role设置steps
    let role = getRole();
    if (role === 'RS')
      this.steps = [
        {
          title: '粒度补全',
          num: 0
        },
        {
          title: '主动模态',
          num: 1
        },
        {
          title: '人机器资源调度',
          num: 2
        }
      ]
    if (role === 'OMS')
      this.steps = [
        {
          title: '任务输入',
          num: 0
        },
        {
          title: '联盟形成',
          num: 1
        },
        {
          title: '人机器资源调度',
          num: 2
        }
      ]

    // 判断返回上一个step的界面
    if (!this.$store.state.stepbarposition) {
      this.onClickStep(this.steps[0].title, 0)
    }
    switch (this.$store.state.stepbarposition) {
      case 0:
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
        this.$store.commit('setStepbarPosition', 0);
        this.stepActive = 0
        break
      case 1:
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
        this.$store.commit('setStepbarPosition', 1);
        this.stepActive = 1
        break
      case 2:
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryOnlyModityView")
        this.$store.commit('setStepbarPosition', 2);
        this.stepActive = 2
        break
      case 3:
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
        this.$store.commit('setStepbarPosition', 3);
        this.stepActive = 3
        break
      case 4:
        this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")
        this.$store.commit('setStepbarPosition', 4);
        this.stepActive = 4
        break
      default:
        break
    }
  },
  methods: {
    onClickStep(title, numStep) {
      switch (title) {
        case '任务输入':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
          break
        case '粒度补全':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
          break
        case '主动模态':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryOnlyModityView")
          break
        case '联盟形成':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
          break
        case '人机器资源调度':
          this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")
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