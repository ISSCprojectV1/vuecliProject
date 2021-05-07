<template>
  <div>
    <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :default-openeds="['system2']"
        router>
      <el-submenu index='system'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/admin/user">
          用户管理
        </el-menu-item>
        <el-menu-item index="/admin/role">
          角色管理
        </el-menu-item>
        <el-menu-item index="/admin/menu">
          菜单管理
        </el-menu-item>

      </el-submenu>

      <el-submenu   index='system2' >
        <template slot="title">

          <span>交易数据共享激励</span>
        </template>
        <el-menu-item index="/admin/auctionNew">
          拍卖管理
        </el-menu-item>
        <el-menu-item index="/admin/score">
          积分管理
        </el-menu-item>
        <el-menu-item index="/admin/data">
          数据管理
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
  /*
  *         <el-menu-item index="/admin/auctionAdd">
          新建拍卖
        </el-menu-item>
  *
  * */
export default {
  name: "sideBar",
  methods: {},
  computed: {
    defaultActive() {
      return this.$route.path
    }
  }
}
/*
*   <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 20px">价格态势演化</span>
          </template>
          <el-menu-item v-if="isAvailable('/trade/riskPrediction/riskSurveillance')"
                        index="/trade/riskPrediction/riskSurveillance"
                        style="text-align: left;padding-left: 80px;font-size: 18px">

            <span slot="title">价格波动态势演化</span>
          </el-menu-item>
          <el-menu-item v-if="isAvailable('/trade/riskPrediction/riskVolumePicture')"
                        index="/trade/riskPrediction/riskVolumeSurveillance"
                        style="text-align: left;padding-left: 80px;font-size: 18px">

            <span slot="title">交易量波动预警</span>
          </el-menu-item>*/
</script>

<style scoped lang="stylus">
</style>
