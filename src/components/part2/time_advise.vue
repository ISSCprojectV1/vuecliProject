<template>
    <div id="app">
        <h2> 监控时间粒度推荐 </h2>
        <div class="block" style="height:80px;text-align:left;margin-left:30px;">
            <span class="demonstration">请选择商品类别：   </span>
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button class="btn1" type="primary"  @click="openFullScreen2" style="margin-left:20px;margin-right:20px">提交</el-button>
        </div>

        <div class="block" style="height:80px;text-align:left;margin-left:30px;">
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

            <el-button class="btn1" type="primary" style="margin-left:20px;margin-right:20px">提交</el-button>
        </div>

        <div class="block" style="height:80px;text-align:left;margin-left:30px;">
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
            <el-button class="btn2" type="primary" style="margin-left:20px;margin-right:20px">提交</el-button>
        </div>
        <el-button type="primary" @click="goTo()">限定时间内需响应任务数</el-button>
    </div>
</template>

<script>
    import {getcommodityVariety,addcommodityVariety,deletecommodityVariety,updatecommodityVariety} from "@/api/part1/Multimodal-multigranularity";
    export default {
        name: "time_advise",

        //在这里调用ajax请求方法
        created(){
            this.getData();
        },


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
                value2: '',

                varietyname:'',

                options: [{
                    value: '小麦',
                    label: '小麦'
                }, {
                    value: '大豆',
                    label: '大豆'
                }, {
                    value: '焦炭',
                    label: '焦炭'
                }, {
                    value: '动力煤',
                    label: '动力煤'
                }, {
                    value: '甲醇',
                    label: '甲醇'
                }, {
                    value: '螺纹钢',
                    label: '螺纹钢'
                }],
                value: ''
            };
        },
        methods: {

            openFullScreen2() {
                const loading = this.$loading({
                    lock: true,
                    text: '正在计算推荐的时间粒度',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            },

            goTo() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/timeGranularity');
            },

            getData(){
                // 获取表格数据
                console.log("获取品类表格数据 步骤一")
                var dataConvert = [];
                var dataConverttest;
                getcommodityVariety().then((res) => {

                    dataConvert = res.data;
                    console.log(dataConvert)

                    for(var i = 0;i<dataConvert.length;i++){// 调试用！！！！
                      console.log("varietyname的值为：")
                      console.log(dataConvert[i].name)
                     // dataConverttest[i].name=dataConvert[i].name;
                    }
                    //this.datatest=dataConverttest;
                    console.log(this.datatest)

                    //this.value = this.datatest;


                }).catch(()=>{
                    console.log("taskExecution fail")
                });

            } ,
        }
    }
</script>

<style scoped>

</style>
