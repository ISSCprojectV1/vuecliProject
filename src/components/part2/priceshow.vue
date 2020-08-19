<template>
<!--    选择商品，展示历史价格数据，给出推荐的时间粒度-->
    <div id="app">
        <div>
            <el-form ref="form" :model="form" label-width="80px">
            <h2> 选择需要查询的商品 </h2>
            <el-form-item label="商品属性">
                <el-cascader class="kind"
                             placeholder="试试搜索：农副产品小麦"
                             :options="options"
                             :props="{ multiple: true }"
                             filterable></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ok">确定</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div id="show">
            <h2> 该商品历史价格展示 </h2>
            <div id="index" v-loading="loading" element-loading-text="拼命加载中">
                <div id="main" class="box"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "priceshow",
        methods: {
            ok() {
                this.$message({
                    message: '提交成功！',
                    type: 'success'
                });
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
</style>
