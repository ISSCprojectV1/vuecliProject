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
          <el-menu-item index="/trade/Dashboard" style="text-align: left;font-size: 20px">
            <i class="el-icon-house"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="/trade/auction" style="text-align: left;">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">数据共享</span>
            </template>
            <el-menu-item index="/trade/auction" style="text-align: left;padding-left: 80px;font-size: 18px">
              <span slot="title">拍卖中心</span>
            </el-menu-item>
            <el-menu-item index="/trade/uploadResource" style="text-align: left;padding-left: 80px;font-size: 18px">
              <span slot="title">上传数据</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu
              v-for="routes in this.accessRoutes"
              :key="routes.title"
              :index="routes.title"
              style="text-align: left">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span style="font-size: 20px">{{ routes.title }}</span>
            </template>
            <el-menu-item :index="route.path" v-for="route in routes.routes" :key="route.path"
                          style="text-align: left;padding-left: 80px;font-size: 18px">
              <span slot="title">{{ route.meta.title }}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/trade/riskPrediction/riskSurveillance/" style="text-align: left;font-size: 20px">
            <i class="el-icon-menu"></i>
            <span slot="title">风险预警监控</span>
          </el-menu-item>

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
  methods: {}
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
