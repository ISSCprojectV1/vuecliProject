<template>
    <div id="app">
        <el-form ref="form" :model="form" label-width="80px">
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
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="上海" value="shanghai"></el-option>
                    <el-option label="北京" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="有效时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
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
            <el-form-item label="特殊资源">
                <el-radio-group v-model="form.resource">
                    <el-radio label="军工"></el-radio>
                    <el-radio label="战略储备"></el-radio>
                </el-radio-group>
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
                }
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
