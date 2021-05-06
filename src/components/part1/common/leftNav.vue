<template>
  <div id="diceng" style="background-color:#00659B">
    <el-row>
      <el-col>
        <el-menu
            :unique-opened="true"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            router
            background-color="#00659B"
            text-color="#FFFFFF"
            active-text-color="#ffd04b" style="height: 100%">

          <el-menu-item v-if="isAvailable('/trade/Dashboard')" index="/trade/Dashboard"
                        style="text-align: left;font-size: 20px">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu v-if="isAvailable('/trade/auction') || isAvailable('/trade/uploadResource')"
                      index="/trade/auction" style="text-align: left;">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">数据共享</span>
            </template>
            <el-menu-item v-if="isAvailable('/trade/auction')" index="/trade/auction"
                          style="text-align: left;padding-left: 80px;font-size: 18px">
              <span slot="title">拍卖中心</span>
            </el-menu-item>
            <el-menu-item v-if="isAvailable('/trade/uploadResource')" index="/trade/uploadResource"
                          style="text-align: left;padding-left: 80px;font-size: 18px">
              <span slot="title">上传数据</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu
              v-if="isAvailable('/trade/Multimodal-multigranularity/stepBar') || isAvailable('/trade/Multimodal-multigranularity/goodsgranularity')"
              index="/trade/Multimodal-multigranularity" style="text-align: left">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">模态粒度与建议</span>
            </template>
            <el-menu-item v-if="isAvailable('/trade/Multimodal-multigranularity/stepBar')"
                          index="/trade/Multimodal-multigranularity/stepBar"
                          style="text-align: left;padding-left: 80px;font-size: 18px">
              <span slot="title">模态与粒度步骤</span>
            </el-menu-item>
            <el-menu-item v-if="isAvailable('/trade/Multimodal-multigranularity/goodsgranularity')"
                          index="/trade/Multimodal-multigranularity/goodsgranularity"
                          style="text-align: left;padding-left: 80px;font-size: 18px">
              <span slot="title">时间与商品粒度</span>
            </el-menu-item>
          </el-submenu>
          <!--          <el-submenu-->
          <!--              v-for="routes in this.accessRoutes"-->
          <!--              :key="routes.title"-->
          <!--              :index="routes.title"-->
          <!--              style="text-align: left">-->
          <!--            <template slot="title">-->
          <!--              <i class="el-icon-menu"></i>-->
          <!--              <span style="font-size: 20px">{{ routes.title }}</span>-->
          <!--            </template>-->
          <!--            <el-menu-item :index="route.path" v-for="route in routes.routes" :key="route.path"-->
          <!--                          style="text-align: left;padding-left: 80px;font-size: 18px">-->
          <!--              <span slot="title">{{ route.meta.title }}</span>-->
          <!--            </el-menu-item>-->
          <!--          </el-submenu>-->

          <el-submenu
              v-if="isAvailable('/trade/riskPrediction/riskSurveillance') || isAvailable('/trade/riskPrediction/riskVolumePicture')"
              index="/trade/riskPrediction" style="text-align: left">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">价格预警</span>
            </template>
            <el-menu-item v-if="isAvailable('/trade/riskPrediction/riskSurveillance')"
                          index="/trade/riskPrediction/riskSurveillance"
                          style="text-align: left;padding-left: 80px;font-size: 18px">

              <span slot="title">价格波动预警</span>
            </el-menu-item>
            <el-menu-item v-if="isAvailable('/trade/riskPrediction/riskVolumePicture')"
                          index="/trade/riskPrediction/riskVolumeSurveillance"
                          style="text-align: left;padding-left: 80px;font-size: 18px">

              <span slot="title">交易量波动预警</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultActive: "",
      accessRoutes: [
        {
          title: "模态粒度与建议",
          routes: [
            {
              path: "/trade/Multimodal-multigranularity/stepBar",
              component: () => import("@/components/part1/Multimodal-multigranularity/stepBar"),
              meta: {
                title: "模态与粒度步骤"
              }
            },
            {
              path: "/trade/Multimodal-multigranularity/goodsgranularity",
              component: () => import("@/components/part2/goods_granularity"),
              meta: {
                title: "时间与商品粒度"
              }
            },
          ]
        }
      ]
    }
  },
  mounted() {
    this.defaultActive = this.$router.currentRoute.path
    let rootDiv = document.getElementById("diceng");
    rootDiv.style.height = (window.innerHeight > document.body.scrollHeight ?
        window.innerHeight : document.body.scrollHeight) + "px"
  },
  created() {
  },
  methods: {
    // 判断当前用户是否有权限访问菜单对应界面，从而确定是否显示菜单
    isAvailable(path) {
      return this.$store.getters["permission/hasAccessTo"](path)
    }
  }
}
</script>
<style>
.el-submenu__title:hover {
  background: #0677B3 !important;
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
  color: #FFFFFF;
}

.el-icon-house:before {
  content: "\e754";
  color: #FFFFFF;
}

</style>
