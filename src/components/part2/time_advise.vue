<template>
    <div id="app">
        <h2> 监控时间粒度推荐 </h2>
        <div class="block" style="height:80px;text-align:left">
            <span class="demonstration">推荐的时间粒度：   </span>
            <el-date-picker
                    v-model="value1"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="center">
            </el-date-picker>
            <i class="el-icon-right"></i>
            <el-button class="btn1" type="primary" round>提交</el-button>
        </div>

        <div class="block" style="height:80px;text-align:left">
            <span class="demonstration">自主选择与调整：   </span>
            <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="center">
            </el-date-picker>
            <i class="el-icon-right"></i>
            <el-button class="btn1" type="primary" round>提交</el-button>
        </div>
        <el-button type="primary" @click="goTo()">限定时间内需响应任务数</el-button>
    </div>
</template>

<script>
    export default {
        name: "time_advise",
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: [new Date(2020, 6, 10, 0, 0), new Date(2020, 7, 11, 0, 0)],
                value2: ''
            };
        },
        methods: {
            goTo() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/timeGranularity');
            },
        }
    }
</script>

<style scoped>

</style>
