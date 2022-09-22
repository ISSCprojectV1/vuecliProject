<template>
  <el-container style="width: 100vw; height: 100vh;">
    <el-header>
      <Header></Header>
    </el-header>

    <el-container>
      <el-aside style="height: calc(100vh - 60px); overflow: auto;">
        <leftNav></leftNav>
      </el-aside>
      <el-main style="height: calc(100vh - 60px); overflow: auto;">
        <keep-alive include="tradingDetection">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/part3/Common/header";
import leftNav from "@/components/part1/common/leftNav";

export default {
  components: {
    Header,
    leftNav,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.el-header {
  padding: 0;
  border-bottom: 2px gold solid;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

.el-aside {
  padding: 0;
  background-color: #00659b;
}

.el-main {
  padding: 0;
  background-color: #F0F2F5;
}
</style>
