<template>
  <div style="background-color: #00659b">
    <el-row>
      <el-col>
        <el-menu
            :unique-opened="true"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            router
            background-color="#00659B"
            text-color="#FFFFFF"
            active-text-color="#ffd04b"
            style="height: 100%"
        >
          <!--     首页     -->
          <el-menu-item
              index="/trade/Dashboard"
              style="text-align: left; font-size: 20px"
          >
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!--监管模态粒度决策子系统-->
          <el-submenu
              index="/trade/Multimodal-multigranularity"
              style="text-align: left"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px; white-space: normal"
              >监管模态粒度决策子系统</span
              >
            </template>

            <el-menu-item
                index="/trade/Multimodal-multigranularity/stepBar/taskInput"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">监管模态粒度决策整体流程</span>
            </el-menu-item>

            <el-menu-item
                index="/trade/Multimodal-multigranularity/goodsgranularity"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">时间商品范围智能化推荐模块</span>
            </el-menu-item>

            <el-menu-item
                @click="goto('粒度自适应补全', 1)"
                index="/trade/Multimodal-multigranularity/stepBar/taskQueryTableView"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">商品对象监管范围推荐模块</span>
            </el-menu-item>

            <el-menu-item
                v-if="false"
                index="/trade/Multimodal-multigranularity/goodsgranularity"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">时间与商品粒度</span>
            </el-menu-item>
          </el-submenu>

          <!--监管主体资源联盟策略子系统-->
          <el-submenu
              v-if="true"
              index="/trade/auctionNew"
              style="text-align: left"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">监管主体资源联盟策略子系统</span>
            </template>

            <el-menu-item
                index="/trade/exceptionAnalysis/page"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">异常交易事件关联预警模块</span>
            </el-menu-item>

            <el-menu-item
                @click="goto('联盟形成', 3)"
                index="/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">监管任务联盟形成模块</span>
            </el-menu-item>

            <el-menu-item
                @click="goto('人机器资源调度', 4)"
                index="/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">动态任务在线资源调度模块</span>
            </el-menu-item>
          </el-submenu>

          <!--数据共享融合子系统-->
          <el-submenu index="/trade/auction" style="text-align: left">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">数据共享融合子系统</span>
            </template>

            <el-submenu
                style="text-align: left; padding-left: 30px; font-size: 18px"
                index="/trade/dataShare"
            >
              <template slot="title">
                <span style="font-size: 18px">跨平台数据共享激励模块</span>
              </template>

              <el-menu-item
                  index="/trade/auction"
                  style="text-align: left; padding-left: 70px; font-size: 18px"
              >
                <span slot="title">数据共享中心</span>
              </el-menu-item>
              <el-menu-item
                  index="/trade/uploadResource"
                  style="text-align: left; padding-left: 70px; font-size: 18px"
              >
                <span slot="title">上传数据</span>
              </el-menu-item>
              <el-menu-item
                  index="/trade/auctionNew/auctionNew"
                  style="text-align: left; padding-left: 70px; font-size: 18px"
              >
                数据共享管理
              </el-menu-item>
              <el-menu-item
                  index="/trade/auctionNew/score"
                  style="text-align: left; padding-left: 70px; font-size: 18px"
              >
                积分管理
              </el-menu-item>
              <el-menu-item
                  index="/trade/auctionNew/data"
                  style="text-align: left; padding-left: 70px; font-size: 18px"
              >
                数据管理
              </el-menu-item>
            </el-submenu>

            <el-menu-item
                index="/trade/dataFusion/dataquery"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">相似交易主体监测模块</span>
            </el-menu-item>

            <el-menu-item
                index="/trade/riskPrediction/forecastMonitorInfo"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">价格波动风险演化模块</span>
            </el-menu-item>

            <el-menu-item
                v-if="false"
                index="/trade/riskPrediction/riskPropagation"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">风险传播链路</span>
            </el-menu-item>

            <el-menu-item
                v-if="false"
                index="/trade/riskPrediction/riskSurveillance"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">价格波动态势演化</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu
              v-if="false"
              index="/trade/riskPrediction"
              style="text-align: left"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">价格态势演化</span>
            </template>
            <el-menu-item
                index="/trade/riskPrediction/riskSurveillance"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">价格波动态势演化</span>
            </el-menu-item>
            <el-menu-item
                index="/trade/riskPrediction/riskVolumeSurveillance"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">交易量波动预警</span>
            </el-menu-item>
          </el-submenu>

          <!--内幕交易监测-->
          <el-submenu index="/trade/insiderTrading" style="text-align: left">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">内幕交易监测子系统</span>
            </template>
            <el-menu-item
                index="/trade/insiderTrading/tradingDetection"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">异常交易监测</span>
            </el-menu-item>
            <!-- <el-menu-item
              index="/trade/insiderTrading/relationDetection/all"
              style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">异常关系监测</span>
            </el-menu-item> -->
          </el-submenu>

          <el-submenu index="/trade/PolicyRisk" style="text-align: left">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px; white-space: normal"
              >系统性风险监测子系统</span
              >
            </template>

            <el-menu-item
                index="/trade/PolicyRisk/event_calendar"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">政策-事件日历</span>
            </el-menu-item>
            <el-menu-item
                 index="/trade/PolicyRisk/comAssociated"
                 style="text-align: left; padding-left: 70px; font-size: 18px"
             >
             <span slot="title">行业品种系统性风险监测</span>
             </el-menu-item>
            <el-menu-item
                index="/trade/PolicyRisk/viewIndustryPolicy"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">业内系统性风险监测</span>
            </el-menu-item>
            <el-menu-item
                index="/trade/PolicyRisk/viewAssociated"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">关联性系统风险监测</span>
            </el-menu-item>
            <!--el-menu-item
                index="/trade/PolicyRisk/gpr_chn"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">行业系统性风险监测</span>
            </el-menu-item-->
          </el-submenu>

          <!--违约风险评估预警-->
          <el-submenu index="/trade/DefaultRisk">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px; white-space: normal; text-align: left">违约风险监测子系统</span>
            </template>

            <el-menu-item
                index="/trade/DefaultRisk/entityEvaluation"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">交易主体评估</span>
            </el-menu-item>

            <el-menu-item
                index="/trade/DefaultRisk/transactionEvaluation"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">交易过程评估</span>
            </el-menu-item>

            <!--            <el-menu-item-->
            <!--              index="/trade/DefaultRisk/categoryEvaluation"-->
            <!--              style="text-align: left; padding-left: 70px; font-size: 18px"-->
            <!--            >-->
            <!--              <span slot="title">品类评估</span>-->
            <!--            </el-menu-item>-->
          </el-submenu>

          <!--舆情风险子系统-->
          <el-submenu
              index="/trade/PublicOpinionsRisk"
              style="text-align: left"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px; white-space: normal"
              >舆情风险监测子系统</span
              >
            </template>

            <!--
            <el-menu-item
                index="/trade/PublicOpinionsRisk/opinions_summary"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">今日舆情汇总</span>
            </el-menu-item>
            <el-menu-item
                index="/trade/PublicOpinionsRisk/opinions_riskinfo"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">今日舆情信息</span>
            </el-menu-item>
            <el-menu-item
                index="/trade/PublicOpinionsRisk/opinions_search"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">舆情事件查询</span>
            </el-menu-item>
            -->
            <el-menu-item
                index="/trade/PublicOpinionsRisk/opinionsMain"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">今日舆情汇总</span>
            </el-menu-item>
            <el-menu-item
                index="/trade/PublicOpinionsRisk/opinionsDetails"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">舆情事件详情</span>
            </el-menu-item>
            <el-menu-item
                index="/trade/PublicOpinionsRisk/opinionsRisk"
                style="text-align: left; padding-left: 70px; font-size: 18px"
            >
              <span slot="title">恶意监测与风险评估</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getRole,
  removeAdminTrue,
  removeRole,
  removeToken,
} from "@/utils/auth";

export default {
  data() {
    return {
      defaultActive: "",
      auctionshow: false,
      accessRoutes: [
        {
          title: "模态粒度与建议",
          routes: [
            {
              path: "/trade/Multimodal-multigranularity/stepBar",
              component: () =>
                  import(
                      "@/components/part1/Multimodal-multigranularity/stepBar"
                      ),
              meta: {
                title: "模态与粒度步骤",
              },
            },
            {
              path: "/trade/Multimodal-multigranularity/goodsgranularity",
              component: () => import("@/components/part2/goods_granularity"),
              meta: {
                title: "时间与商品粒度",
              },
            },
          ],
        },
      ],
    };
  },
  mounted() {
    if (getRole() == "admin" || getRole() == "OMS") this.auctionshow = true;
    else this.auctionshow = false;
    this.defaultActive = this.$router.currentRoute.path;
    let rootDiv = document.getElementById("diceng");
    rootDiv.style.height =
        (window.innerHeight > document.body.scrollHeight
            ? window.innerHeight
            : document.body.scrollHeight) + "px";
  },
  created() {
  },
  methods: {
    goto(page, numStep) {
      this.$router.push("/trade/Multimodal-multigranularity/stepBar");
      switch (page) {
        case "任务输入":
          this.$router.push(
              "/trade/Multimodal-multigranularity/stepBar/taskInput"
          );
          break;
        case "粒度自适应补全":
          this.$router.push(
              "/trade/Multimodal-multigranularity/stepBar/taskQueryTableView"
          );
          break;
        case "模态动态切换":
          this.$router.push(
              "/trade/Multimodal-multigranularity/stepBar/taskQueryOnlyModityView"
          );
          break;
        case "联盟形成":
          this.$router.push(
              "/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition"
          );
          break;
        case "人机器资源调度":
          this.$router.push(
              "/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart"
          );
          break;
      }
      this.$store.commit("setStepbarPosition", numStep);
      console.log(this.$parent.$parent);
      //   this.stepActive = numStep;
    },
    // 判断当前用户是否有权限访问菜单对应界面，从而确定是否显示菜单
    isAvailable(path) {
      return this.$store.getters["permission/hasAccessTo"](path);
    },
  },
};
</script>

<style>
/* 菜单栏实现换行 - start */
.el-submenu__title {
  display: flex;
  align-items: center;
}

.el-submenu__title {
  height: 70px;
}

.el-submenu__title span {
  white-space: normal;
  word-break: break-all;
  line-height: 28px;
  flex: 1;
  padding-right: 20px;
}

.el-menu-item {
  display: flex;
  align-items: center;
  padding-right: 20px !important;
}

.el-menu-item span {
  white-space: normal;
  word-break: break-all;
  line-height: 20px;
  flex: 1;
}

/* 菜单栏实现换行 - end */

.el-submenu__title:hover {
  background: #0677b3 !important;
}

.el-menu-vertical-demo {
  padding: 0;
  margin: 0;
  border: 0;
}

.el-icon-arrow-down:before {
  content: "\e6df";
  color: #ffffff;
}

.el-icon-menu:before {
  content: "\e798";
  color: #ffffff;
}

.el-icon-house:before {
  content: "\e754";
  color: #ffffff;
}
</style>
