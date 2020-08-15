<template>
    <div>
        <h2>关联查询</h2>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="查询商品">
                <el-select v-model="formInline.itemid" placeholder="选择商品">
                    <el-option label="棉花U001" value="1"></el-option>
                    <el-option label="钢铁U730" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询时间">
                <el-date-picker
                        v-model="formInline.time"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(formInline)">查询</el-button>
            </el-form-item>
        </el-form>
        <h3>用户交易频率统计</h3>
        <el-table
                :default-sort = "{prop: 'count', order: 'descending'}"
                :data="supportData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="uid"
                    label="用户id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="oid"
                    label="商品id"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="count"
                    label="交易频次"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="support"
                    label="频次系数"
                    width="180">
            </el-table-column>
        </el-table>
        <h3>用户关联分析</h3>
        <el-table
                :default-sort = "{prop: 'similarity', order: 'descending'}"
                :data="SimilarityUser"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="uid1"
                    label="关联用户id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="uid2"
                    label="关联用户id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="oid"
                    label="关联商品id"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="similarity"
                    label="用户关联度"
                    width="180">
            </el-table-column>
            <el-table-column label="关联交易">
                <template slot-scope="scope">
                    <el-button
                            @click="Tradesimilar(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h3>交易关联分析</h3>
        <el-table
                :data="SimilarityTrade"
                stripe
                :default-sort = "{prop: 'similarity', order: 'descending'}"
                style="width: 100%">
            <el-table-column
                    prop="tid1"
                    label="关联交易id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="tid2"
                    label="关联交易id"
                    width="180">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="similarity"
                    label="用户关联相似度"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="关联交易id"
                    width="180">
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
    import {tradesimilar, userrelation, usersupport} from "@/api/part1/relation";

    export default {
        name: "relationQuery",
        data() {
            return {
                formInline: {
                    itemid: '',
                    time: [],
                },
                supportData:[],
                SimilarityUser:[],
                SimilarityTrade:[]
            }
        },
        methods: {
            init(){
                this.supportData=[];
                this.SimilarityTrade=[];
                this.SimilarityUser=[];
            },
            onSubmit(formInline) {
                this.init();
                usersupport(formInline.itemid).then(res=>{
                    console.log(res.data.data)
                    this.supportData = res.data.data
                }).catch(err=>{
                    console.log(err)
                })
                userrelation(formInline.itemid).then(res=>{
                    console.log(res.data.data)
                    this.SimilarityUser = res.data.data
                }).catch(err=>{
                    console.log(err)
                })

            },
            Tradesimilar(row){
                let data={
                    uid1:row.uid1,
                    uid2:row.uid2,
                    itemid:row.oid,
                }
                tradesimilar(data).then(res=>{
                    this.SimilarityTrade = res.data.data
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>
