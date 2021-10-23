<template>
  <el-row>
    <el-col :span="8">
      <p class="select-box-text">商品</p>
    </el-col>
    <el-col :span="16">
      <el-select v-model="value1" multiple filterable placeholder="请选择" class="select-box">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: [],
      value2: [],
    };
  },
};
</script>

<style>
.select-box {
  width: 50%;
  float: left;
}

.select-box-text {
  float: right;
  margin: 10px;
}
</style>