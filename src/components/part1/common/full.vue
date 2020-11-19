<template>
  <el-container>
    <el-header>
      <Header>
      </Header>
    </el-header>
    <el-container>
      <el-aside style="width: 250px;height: 100%" ref="changdu">
        <leftNav>
        </leftNav>
      </el-aside>
      <el-main>
        <router-view></router-view>
        <nav-button></nav-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/part3/Common/header";
import leftNav from "@/components/part1/common/leftNav";
import navButton from "@/components/part1/common/navButton";

export default {
  components: {
    Header,
    leftNav,
    navButton
  },
  data() {
    return {}
  },
  methods:
      {}


}
</script>

<style lang="stylus" scoped>
.el-header
  //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  padding 0px;
  margin-bottom 1px

.el-aside
  //box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  padding 0px;
  margin-bottom 1px

</style>
