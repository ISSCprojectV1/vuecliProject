<template>
    <div>
        <el-table
                :data="tableData"
                highlight-current-row
        >
            <el-table-column
                    label="编号"
                    min-width="100"
                    prop=id>
            </el-table-column>
            <el-table-column
                    label="拍卖id"
                    min-width="100"
                    prop=auctionId>
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    min-width="100"
                    prop=gmtCreated>
            </el-table-column>
            <el-table-column
                    label="文件名"
                    min-width="100"
                    prop=fileName>
            </el-table-column>
            <el-table-column
                    label="文件下载"
                    min-width="100"
                    prop=filePath>
                <template slot-scope="scope">
                    <el-button
                            @click="handledownload(scope.row)"
                    >下载</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="审核情况"
                    min-width="100">
            <template slot-scope="scope">
                <el-button
                        :type="scope.row.status=='2'?'success':'danger'"
                        :icon="scope.row.status=='2'?'el-icon-check':'el-icon-close'"
                        circle
                        @click="handleCertificate(scope.row)"
                ></el-button>
            </template>
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
    import {
        getUsers,
        getroles,
        getUserinfoByUserId,
        UserchangeRole
    } from "@/api/part3";
    import {
        addAuction, changeUploadFileStatus,
        deleteAuction,
        endAuction,
        getAllAuctions,
        getAuction, getuploadfile,
        updateAuction
    } from "@/api/part3/auction";
    import {timeForAuction} from "@/utils/part3";

    export default {
        name: "auction",
        created(){
            this.getAuctions(1);
        },
        data(){
            return{
                form:{},
                formLabelWidth: '120px',
                total:0,//总数
                currentPage:1,
                tableData:[],
            }
        },
        methods: {
            getAuctions(currentPage,pageSize=10){
                getuploadfile(currentPage,pageSize).then(res=>{
                    this.tableData = res.data.list.map(item => {
                      return {
                        id: item.id,
                        auctionId: item.id,
                        userId: item.userId,
                        gmtCreated: item.gmtCreated.split('.')[0].replace('T', ' '),
                        fileName: item.fileName,
                        filePath: item.filePath,
                        status: item.status
                      }
                    })
                    this.total = res.data.total
                }).catch(err=>{
                    console.log(err)
                })
            },
            handleDelete(){

            },
            handleCertificate(row){
                if(row.status=="1")
                    row.status = "2";
                else
                    row.status = "1";
                changeUploadFileStatus(row.id,row.status).then((res)=>{
                    this.$message.success("【成功修改】")
                    this.getAuctions(this.currentPage);
                }).catch(()=>{
                    this.$message.error("【出错】")
                    this.getAuctions(this.currentPage);
                })
            },

            //换页请求
            pageChange(page){
                this.currentPage=page;
                this.getAuctions(page);
            },
        }
    }
</script>

<style scoped lang="stylus">
    .button
        margin-bottom 10px
</style>
