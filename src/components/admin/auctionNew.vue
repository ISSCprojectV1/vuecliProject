<template>
    <div>
        <el-button type="primary" @click="dialogFormAddInit" style="margin-bottom: 10px">新增</el-button>
        <el-table
            :data="tableData"
            highlight-current-row>
            <el-table-column label="编号" min-width="80" prop=id></el-table-column>
            <el-table-column label="名称" min-width="100" prop=name></el-table-column>
            <el-table-column label="描述" min-width="100" prop=description></el-table-column>
            <el-table-column label="开始时间" min-width="120" prop=startTime></el-table-column>
            <el-table-column label="结束时间" min-width="120" prop=endTime></el-table-column>
            <el-table-column label="状态" min-width="80" prop=status></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="text" style="margin-right: 5px" @click=dialogFormUpdateInit(scope.row)>修改
                    </el-button>

                    <el-popconfirm
                        confirmButtonText='确定'
                        cancelButtonText='取消'
                        icon="el-icon-info"
                        iconColor="red"
                        title="确定结束？"
                        @onConfirm="handleEnd(scope.row.id)">
                        <el-button type="text" style="margin-right: 5px" slot="reference">结束</el-button>
                    </el-popconfirm>

                    <el-popconfirm
                        confirmButtonText='确定'
                        cancelButtonText='取消'
                        icon="el-icon-info"
                        iconColor="red"
                        title="确定删除？"
                        @onConfirm="handleDelete(scope.row.id)">
                        <el-button type="text" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            ref="pagination"
            style="text-align: center; margin-top: 1rem"
            background
            layout="prev, pager, next"
            @current-change="pageChange"
            :total="total">
        </el-pagination>

        <el-dialog title="新增拍卖" :visible.sync="dialogFormAddVisible">

            <el-form :model="formAddAuction">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="formAddAuction.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="formAddAuction.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="formAddAuction.time"

                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-input v-model="formAddAuction.status" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAddCancel">取消</el-button>
                <el-button type="primary" @click="dialogFormAddConfirm(formAddAuction)">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改拍卖信息" :visible.sync="dialogFormUpdateVisible">

            <el-form :model="formModifyAuction">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="formModifyAuction.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="formModifyAuction.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-input v-model="formModifyAuction.status" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="formModifyAuction.time"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    :default-value="defaultTime">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogFormUpdateConfirm(formModifyAuction)">确定</el-button>
                <el-button @click="dialogFormUpdateCancel">取消</el-button>
            </div>

        </el-dialog>


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
    addAuction, addAuctionNew,
    deleteAuction, deleteAuctionNew,
    endAuction, endAuctionNew,
    getAllAuctions, getAllAuctionsNew,
    getAuction, getAuctionNew,
    updateAuction, updateAuctionNew
} from "@/api/part3/auction";
import {timeForAuction} from "@/utils/part3";

export default {
    name: "auction",
    created() {
        this.init();
    },
    data() {
        return {
            formModifyAuction: {
                name: '',
                description: '',
                status: '',
                time: [],
            },
            dialogFormUpdateVisible: false,
            dialogFormAddVisible: false,
            formLabelWidth: '120px',
            total: 0, // 用户总数
            currentPage: 1,
            roleOptions: [
                {
                    id: 1,
                    roleName: '管理员'
                },
                {
                    id: 2,
                    roleName: '普通用户'
                },
            ],
            tableData: [],
            formAddAuction: {
                name: "",
                description: "",
                status: "",
                time: [],
            }
        }
    },
    methods: {
        handleEnd(id) {
            endAuctionNew(id, 0).then(res => {
                this.$message({
                    showClose: true,
                    message: '结束拍卖成功',
                    type: 'success'
                });
                this.getAuctions(this.currentPage);
            }).catch(err => {
                this.$message({
                    showClose: true,
                    message: '结束拍卖失败',
                    type: 'error'
                });
            })
        },
        getAuctions(currentPage, pageSize = 10) {
            getAllAuctionsNew(currentPage, pageSize).then(res => {
                console.log(res)
                this.tableData = res.data.list
                this.total = res.data.total
            }).catch(err => {
                console.log(err)
            })
        },
        getAuctionDetail(id) {
            getAuctionNew(id).then(res => {
              this.formModifyAuction.name = res.data.name
              this.formModifyAuction.description = res.data.description
              this.formModifyAuction.status = res.data.status
              this.formModifyAuction.time = [res.data.startTime, res.data.endTime]
            }).catch(err => {
                console.log(err)
            })
        },
        getUsersAPI() {
            getUsers(1).then(res => {
                console.log("请求用户列表api成功")
                console.log(res.data)
                this.tableData = res.data.list
                this.total = res.data.total;
            }).catch(err => {
                console.log(err);
                console.log("请求用户列表api失败")
            });
        },
        getrolesAPI() {
            getroles().then(res => {
                console.log("请求角色列表api成功");
                console.log(res);
                this.roleOptions = res.data.roleList;
            }).catch(err => {
                console.log(err);
                console.log("请求角色列表api失败")
            })
        },
        getUserDetailAPI(id) {
            getUserinfoByUserId(id).then(res => {
                console.log("请求用户详情api成功");
                console.log(res);
                let user = res.data.user
                let role = res.data.role
                this.formModifyAuction.id = user.id
                this.formModifyAuction.accountId = user.accountId
                this.formModifyAuction.name = user.name
                this.formModifyAuction.email = user.email
                this.formModifyAuction.score = user.score
                this.formModifyAuction.reputation = user.reputation
                this.formModifyAuction.roleId = role.id
            }).catch(err => {
                console.log(err);
                console.log("请求用户详情api失败")
            })
        },
        changeRole(form) {
            console.log(form.id)
            console.log(form.roleId)
            let params = {}
            params.userId = form.id
            params.roleId = form.roleId
            UserchangeRole(params).then(res => {
                console.log("角色修改成功");
                this.$message({
                    showClose: true,
                    message: '角色修改成功',
                    type: 'success'
                });
                this.getUsersAPI();//刷新
            }).catch(err => {
                console.log("角色修改失败");
                this.$message({
                    showClose: true,
                    message: '角色修改失败',
                    type: 'error'
                });
            })
        },

        init() {
            this.getAuctions(1);
        },

        handleDelete(id) {
            deleteAuctionNew(id).then(res => {
                this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                });
                this.getAuctions(this.currentPage);
            }).catch(err => {
                this.$message({
                    showClose: true,
                    message: '删除失败',
                    type: 'error'
                });
            })
        },

        handleCelldbClink(row) {
            this.dialogFormUpdateInit(row);
        },

        handleCheckChange(data, checked, indeterminate) {
            console.log(this.$refs.tree.getCheckedKeys())
            console.log(data, checked, indeterminate);
        },
        dialogFormUpdateInit(row) {
            this.dialogFormUpdateVisible = true
            this.getAuctionDetail(row.id)
        },
        dialogFormUpdateCancel() {
            this.dialogFormUpdateVisible = false

        },
        dialogFormUpdateConfirm(data) {
            let params = {
                id: data.id,
                name: data.name,
                description: data.description,
                startTime: data.time[0],
                endTime: data.time[1],
                status: data.status,
            }
            this.dialogFormUpdateVisible = false
            updateAuctionNew(params).then(res => {
                this.$message({
                    showClose: true,
                    message: '拍卖信息修改成功',
                    type: 'success'
                });
                this.getAuctions(this.currentPage);
            }).catch(err => {
                this.$message({
                    showClose: true,
                    message: '拍卖信息修改失败',
                    type: 'error'
                });

            })
        },
        dialogFormAddInit() {
            this.dialogFormAddVisible = true;
            this.formAddAuction = {}
        },
        dialogFormAddCancel() {
            this.dialogFormAddVisible = false

        },
        dialogFormAddConfirm(data) {
            console.log(data.time[0])
            this.dialogFormAddVisible = false;
            console.log(timeForAuction(data.time[0]))
            let params = {
                name: data.name,
                description: data.description,
                startTime: data.time[0],
                endTime: data.time[1],
                status: data.status,
            }
            addAuctionNew(params).then(res => {
                console.log("新增拍卖成功");
                this.$message({
                    showClose: true,
                    message: '新增拍卖成功',
                    type: 'success'
                });
                this.getAuctions(1);// 页面更新
            }).catch(err => {
                console.log("新增拍卖失败");
                console.log(err);
                this.$message({
                    showClose: true,
                    message: '新增拍卖失败',
                    type: 'error'
                });

            })
        },

        //换页请求
        pageChange(page) {
            this.currentPage = page;
            this.getAuctions(page);
        },
    }
}
</script>

<style scoped lang="stylus">

</style>
