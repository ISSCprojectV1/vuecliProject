<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  components: {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  computed: {
    grades() {
      return this.$store.state.grades;
    },
    subjects() {
      return this.$store.state.subjects;
    }
  },
}

</script>

<style lang="stylus">
#app
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  border: 1px solid #dcdfe6;
  //color: #2c3e50;
  background-color: #ffffff;
  position: relative;

html
  min-height: 100%;
  _height: 100%;
  height: 100%;

// 表格边框对齐
.el-table th.gutter {
  display: table-cell !important;
}

.el-table colgroup.gutter {
  display: table-cell !important;
}

// 字体调整
.el-table {
  font-size: 14px !important;
}

//.el-button {
//  font-size: 14px !important;
//}

.el-link {
  font-size: 14px !important;
}

.el-form {
  font-size: 14px !important;
}

.el-input {
  font-size: 14px !important;
}


</style>
