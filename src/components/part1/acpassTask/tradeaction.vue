<template>
    <div>
        <el-table
                :data="Data"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px">
            <el-table-column
                    prop="group"
                    label="编号"
                    width="180">
            </el-table-column>
            <el-table-column label="交易行为" align="center">
                <el-table-column
                        prop="buyerid"
                        label="买方id">
                </el-table-column>
                <el-table-column
                        prop="buyername"
                        label="买方姓名">
                </el-table-column>
                <el-table-column
                        prop="category"
                        label="商品">
                </el-table-column>
                <el-table-column
                        prop="amount"
                        label="数量">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格">
                </el-table-column>
                <el-table-column
                        prop="sellerid"
                        label="卖方id">
                </el-table-column>
                <el-table-column
                        prop="sellername"
                        label="卖方姓名">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="交易时间">
                </el-table-column>
                <el-table-column
                        prop="belong"
                        label="归属">
                </el-table-column>
                <el-table-column
                        prop="tasksize"
                        label="空间粒度">
                </el-table-column>
                <el-table-column
                        prop="original"
                        label="原生任务"
                        v-if="activeOrpassive()"
                >
                </el-table-column>
                <el-table-column
                        prop=""
                        label="交易模式">
                    <template slot-scope="scope">
                        <el-button @click="look(scope.row.id)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table-column>

        </el-table>
    </div>


</template>

<script>
    import {activetradeaction, passivetradeaction} from "@/api/part1/acpassTask";

    export default {
        name: "tradeaction",
        created(){
            const id = this.$router.currentRoute.params.id;
            if (this.activeOrpassive()){
                activetradeaction(id).then(res=>{
                    this.tableData = res.data.data
                    this.handleData();
                }).catch(err=>{
                    console.log(err);
                    console.log("出现错误")

                })
            }
            else{
                passivetradeaction(id).then(res=>{
                    this.tableData = res.data.data
                    this.handleData();
                }).catch(err=>{
                    console.log(err);
                    console.log("出现错误")
                })
            }
            //this.handleData();
            // console.log(this.$router)
            // console.log(this.spanarray)
            // console.log(this.Data)

        },
        data() {
            return {
                Data:[],
                spanarray:[],
                tableData: [
                    // [
                    //     {
                    //         "id":0,
                    //         "buyerid":0,
                    //         "buyername":"张0",
                    //         "sellerid":0,
                    //         "sellername":"李0",
                    //         "category":null,
                    //         "price":0,
                    //         "amount":0,
                    //         "original": null, //原生任务
                    //         "tasksize":null,
                    //         "belong":null,
                    //         "time":null
                    //     },
                    //     {
                    //         "id":1,
                    //         "buyerid":0,
                    //         "buyername":"张1",
                    //         "sellerid":0,
                    //         "sellername":"李1",
                    //         "category":null,
                    //         "price":0,
                    //         "amount":0,
                    //         "original": null,
                    //         "tasksize":null,
                    //         "belong":null,
                    //         "time":null
                    //     }
                    // ],
                    // [
                    //     {
                    //         "id":0,
                    //         "buyerid":0,
                    //         "buyername":"张0",
                    //         "sellerid":0,
                    //         "sellername":"李0",
                    //         "category":null,
                    //         "price":0,
                    //         "amount":0,
                    //         "original": null,
                    //         "tasksize":null,
                    //         "belong":null,
                    //         "time":null
                    //     },
                    //     {
                    //         "id":1,
                    //         "buyerid":0,
                    //         "buyername":"张1",
                    //         "sellerid":0,
                    //         "sellername":"李1",
                    //         "category":null,
                    //         "price":0,
                    //         "amount":0,
                    //         "original":null,
                    //         "tasksize":null,
                    //         "belong":null,
                    //         "time":null
                    //     }
                    // ]
                ],
            };
        },
        methods: {
            look(){},
            handleData(){
                let cnt=0;
                for(let i=0;i<this.tableData.length;i++){
                    this.spanarray.push({
                        row:cnt,
                        num:this.tableData[i].length
                    });
                    for(let j=0;j<this.tableData[i].length;j++){
                        cnt++;
                        this.tableData[i][j]['group']=i+1;
                        this.Data.push(this.tableData[i][j])
                    }
                }
            },
            activeOrpassive(){
                return this.$router.currentRoute.path.startsWith('/trade/acpassTask/activetradeaction')
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (column.label === '编号' || column.label=== '交易模式') {
                    const condition = (element) => element['row'] === rowIndex;
                    let index = this.spanarray.findIndex(condition)
                    if (index !==-1){
                        return {
                            rowspan: this.spanarray[index]['num'],
                            colspan: 1
                        }
                    }
                    else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            }
        }
    };
</script>

<style scoped>

</style>
