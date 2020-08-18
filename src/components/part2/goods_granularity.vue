<template>
    <div id="app">
        <h2> 商品信息添加 </h2>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品属性">
                <el-cascader class="kind"
                             placeholder="试试搜索：农副产品"
                             :options="options"
                             :props="{ multiple: true }"
                             filterable></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品代码">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="商品报价">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="商品地域">
                <el-select v-model="form.region" placeholder="请选择区域">
                    <el-option label="北京市" value="110000"></el-option>
                    <el-option label="天津市" value="120000"></el-option>
                    <el-option label="河北省" value="130000"></el-option>
                    <el-option label="山西省" value="140000"></el-option>
                    <el-option label="内蒙古自治区" value="150000"></el-option>
                    <el-option label="辽宁省" value="210000"></el-option>
                    <el-option label="吉林省" value="220000"></el-option>
                    <el-option label="黑龙江省" value="230000"></el-option>
                    <el-option label="上海市" value="310000"></el-option>
                    <el-option label="江苏省" value="320000"></el-option>
                    <el-option label="浙江省" value="330000"></el-option>
                    <el-option label="安徽省" value="340000"></el-option>
                    <el-option label="福建省" value="350000"></el-option>
                    <el-option label="江西省" value="360000"></el-option>
                    <el-option label="山东省" value="370000"></el-option>
                    <el-option label="河南省" value="410000"></el-option>
                    <el-option label="湖北省" value="420000"></el-option>
                    <el-option label="湖南省" value="430000"></el-option>
                    <el-option label="广东省" value="440000"></el-option>
                    <el-option label="广西壮族自治区" value="450000"></el-option>
                    <el-option label="海南省" value="460000"></el-option>
                    <el-option label="四川省" value="510000"></el-option>
                    <el-option label="贵州省" value="520000"></el-option>
                    <el-option label="云南省" value="530000"></el-option>
                    <el-option label="西藏自治区" value="540000"></el-option>
                    <el-option label="重庆市" value="500000"></el-option>
                    <el-option label="陕西省" value="610000"></el-option>
                    <el-option label="甘肃省" value="620000"></el-option>
                    <el-option label="青海省" value="630000"></el-option>
                    <el-option label="宁夏回族自治区" value="640000"></el-option>
                    <el-option label="新疆维吾尔自治区" value="650000"></el-option>
                    <el-option label="香港特别行政区" value="810000"></el-option>
                    <el-option label="澳门特别行政区" value="820000"></el-option>
                    <el-option label="台湾省" value="830000"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="有效时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="有效/暂停">
                <el-switch v-model="form.ok"></el-switch>
            </el-form-item>
            <el-form-item label="质量品级">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="特级" name="type"></el-checkbox>
                    <el-checkbox label="一级" name="type"></el-checkbox>
                    <el-checkbox label="二级" name="type"></el-checkbox>
                    <el-checkbox label="三级" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="说明">
                <el-input type="textarea" v-model="form.describe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "goods_granularity",
        data() {
            return {
                form: {
                    name: '',
                    id: '',
                    price:'',
                    region: '',
                    date1: '',
                    date2: '',
                    ok: false,
                    type: [],
                    resource: '',
                    describe: ''
                },
                options: [{
                    value: '1000',
                    label: '农副产品',
                    children:[{
                        value: '10002',
                        label: '小麦',
                    },{
                        value: '10004',
                        label: '大豆'
                    }]
                },{
                    value: '2000',
                    label: '能源煤炭',
                    children:[{
                        value: '20001',
                        label: '焦炭',
                    },{
                        value: '20002',
                        label: '动力煤'
                    }]
                },{
                    value: '3000',
                    label: '石油化工',
                    children:[{
                        value: '30002',
                        label: '甲醇',
                    },{
                        value: '30004',
                        label: '肥料'
                    }]
                },{
                    value: '4000',
                    label: '钢铁金属',
                    children:[{
                        value: '40001',
                        label: '螺纹钢',
                    },{
                        value: '40004',
                        label: '贵金属'
                    },{
                        value: '40006',
                        label: '有色金属'
                    }]
                }
                ]
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
</style>
