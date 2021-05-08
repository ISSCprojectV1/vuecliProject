<template>
    <div>
      <h2 style="text-align: center">数据共享激励</h2>
        <el-table
                :data="tableData"
                highlight-current-row
        >
            <el-table-column
                    label="拍卖活动id"
                    min-width="100"
                    prop=id>
            </el-table-column>
            <el-table-column
                    label="获取时间"
                    min-width="100"
                    prop=gmtCreate>
            </el-table-column>
            <el-table-column
                    label="积分值"
                    min-width="100"
                    prop=price>
            </el-table-column>
            <el-table-column
                    label="是否上传数据"
                    min-width="100"
                    prop=uploadFile>
            </el-table-column>
        </el-table>

        <el-pagination
                ref="pagination"
                style="text-align: center"
                background
                layout="prev, pager, next"
                @current-change = "pageChange"
                :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
    import {getsettlement} from "@/api/part3/auction";

    export default {
        name: "score",
        data(){
            return {
                total:0,
                currentPage:1,
                tableData:[]
            }
        },
        created(){
            this.getScoreRecord(1);
        },
        methods:{
            getScoreRecord(page){
                getsettlement(page,10).then(res=>{
                    this.tableData = res.data.list.map(item => {
                      return {
                        id: item.id,
                        auctionId: item.auctionId,
                        userId: item.userId,
                        price: item.price,
                        winner: item.winner,
                        gmtCreate: item.gmtCreate.split('.')[0].replace('T', ' '),
                        uploadFile: item.uploadFile
                      }
                    })
                    this.total = res.data.total
                }).catch(err=>{
                    console.log(err)
                })
            },
            pageChange(page){
                this.currentPage=page;
                this.getScoreRecord(page);
            },
        }

    }
</script>

<style scoped>

</style>
