<template>
    <div>
        <el-button type="primary" @click="dialogFormAddInit" class="button">新增</el-button>
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
                    label="名称"
                    min-width="100"
                    prop=name>
            </el-table-column>
            <el-table-column
                    label="描述"
                    min-width="100"
                    prop=description>
            </el-table-column>
            <el-table-column
                    label="起拍价"
                    min-width="100"
                    prop=startPrice>
            </el-table-column>
            <el-table-column
                    label="最新价"
                    min-width="100"
                    prop=updatedPrice>
            </el-table-column>
            <el-table-column
                label="开始时间"
                min-width="100"
                prop=startTime>
        </el-table-column>
            <el-table-column
                    label="结束时间"
                    min-width="100"
                    prop=endTime>
            </el-table-column>
            <el-table-column
                    label="状态"
                    min-width="100"
                    prop=status>
            </el-table-column>
            <el-table-column
                    label="价格减少单位"
                    min-width="100"
                    prop=minimumDecreasePrice>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click=dialogFormUpdateInit(scope.row)>修改</el-button>

                    <el-popconfirm
                            confirmButtonText='确定'
                            cancelButtonText='取消'
                            icon="el-icon-info"
                            iconColor="red"
                            title="确定删除吗？"
                            @onConfirm="handleDelete(scope.row.id)"
                    >
                        <el-button  size="mini" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>

                    <el-popconfirm
                            confirmButtonText='确定'
                            cancelButtonText='取消'
                            icon="el-icon-info"
                            iconColor="red"
                            title="确定结束吗？"
                            @onConfirm="handleEnd(scope.row.id)"
                    >
<!--                        <el-button  size="mini" type="primary" slot="reference">结束</el-button>-->
                    </el-popconfirm>
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

        <el-dialog title="新增拍卖" :visible.sync="dialogFormAddVisible">
            <el-form :model="addAuctionform">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="addAuctionform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="addAuctionform.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="起拍价" :label-width="formLabelWidth">
                    <el-input v-model="addAuctionform.startPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格减少单位" :label-width="formLabelWidth">
                    <el-input v-model="addAuctionform.minimumDecreasePrice" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="addAuctionform.time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-input v-model="addAuctionform.status" autocomplete="off"></el-input>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAddCancel">取 消</el-button>
                <el-button type="primary" @click="dialogFormAddConfirm(addAuctionform)">确 定</el-button>
            </div>
        </el-dialog>




        <el-dialog title="修改拍卖信息" :visible.sync="dialogFormUpdateVisible">
            <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="起拍价" :label-width="formLabelWidth">
                    <el-input v-model="form.startPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="最新价" :label-width="formLabelWidth">
                    <el-input v-model="form.updatedPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-input v-model="form.status" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="价格减少单位" :label-width="formLabelWidth">
                    <el-input v-model="form.minimumDecreasePrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="时间" :label-width="formLabelWidth">
                    <el-date-picker
                            v-model="form.time"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormUpdateCancel">取 消</el-button>
                <el-button type="primary" @click="dialogFormUpdateConfirm(form)">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import {
        getUsers,
        getroles,
        adminDeleteUser,
        getUserinfoByUserId,
        UserchangeRole
    } from "@/api/part3";
    import {
        addAuction,
        deleteAuction,
        endAuction,
        getAllAuctions,
        getAuction,
        updateAuction
    } from "@/api/part3/auction";
    import {timeForAuction} from "@/utils/part3";

    export default {
        name: "auction",
        created(){
            this.init();
        },
        data(){
            return{
                form:{},
                dialogFormUpdateVisible: false,
                dialogFormAddVisible: false,
                formLabelWidth: '120px',
                total:0,//用户总数
                currentPage:1,


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
                tableData:[],
                addAuctionform:{
                    name:"",
                    description:"",
                    startPrice:"",
                    status:"",
                    time:[],
                    minimumDecreasePrice:"",
                }
            }
        },
        methods: {
            handleEnd(id){
                endAuction(id,0).then(res=>{
                    console.log("拍卖结束api成功");
                    this.$message({
                        showClose: true,
                        message: '拍卖结束成功',
                        type: 'success'
                    });
                    this.getAuctions(this.currentPage);
                }).catch(err=>{
                    console.log("拍卖结束api失败");
                    this.$message({
                        showClose: true,
                        message: '拍卖结束失败',
                        type: 'error'
                    });
                })
            },
            getAuctions(currentPage,pageSize=10){
                getAllAuctions(currentPage,pageSize).then(res=>{
                    this.tableData = res.data.list
                    this.total = res.data.total
                }).catch(err=>{
                    console.log(err)
                })
            },
            getAuctionDetail(id){
                getAuction(id).then(res=>{
                    this.form = res.data
                    this.form.time = [res.data.startTime,res.data.endTime]
                }).catch(err=>{
                    console.log(err)
                })
            },
            getUsersAPI(){
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
            getrolesAPI(){
                getroles().then(res =>{
                    console.log("请求角色列表api成功");
                    console.log(res);
                    this.roleOptions = res.data.roleList;
                }).catch(err=>{
                    console.log(err);
                    console.log("请求角色列表api失败")
                })
            },
            getUserDetailAPI(id){
                getUserinfoByUserId(id).then(res =>{
                    console.log("请求用户详情api成功");
                    console.log(res);
                    let user = res.data.user
                    let role = res.data.role
                    this.form.id = user.id
                    this.form.accountId = user.accountId
                    this.form.name = user.name
                    this.form.email = user.email
                    this.form.score = user.score
                    this.form.reputation = user.reputation
                    this.form.roleId = role.id
                }).catch(err=>{
                    console.log(err);
                    console.log("请求用户详情api失败")
                })
            },
            changeRole(form){

                console.log(form.id)
                console.log(form.roleId)
                let params = {}
                params.userId = form.id
                params.roleId = form.roleId
                UserchangeRole(params).then(res=>{
                    console.log("角色修改成功");
                    this.$message({
                        showClose: true,
                        message: '角色修改成功',
                        type: 'success'
                    });
                    this.getUsersAPI();//刷新
                }).catch(err=>{
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
                deleteAuction(id).then(res=>{
                    console.log("拍卖删除api成功");
                    this.$message({
                        showClose: true,
                        message: '拍卖删除成功',
                        type: 'success'
                    });
                    this.getAuctions(this.currentPage);
                }).catch(err=>{
                    console.log("拍卖删除api失败");
                    this.$message({
                        showClose: true,
                        message: '拍卖删除失败',
                        type: 'error'
                    });
                })
            },


            handleCelldbClink(row){
                this.dialogFormUpdateInit(row);
            },


            handleCheckChange(data, checked, indeterminate) {
                console.log(this.$refs.tree.getCheckedKeys())
                console.log(data, checked, indeterminate);
            },
            dialogFormUpdateInit(row){
                this.dialogFormUpdateVisible = true
                this.getAuctionDetail(row.id)
            },
            dialogFormUpdateCancel(){
                this.dialogFormUpdateVisible = false

            },
            dialogFormUpdateConfirm(data){
                console.log(data)
                let params = {
                    id:data.id,
                    name:data.name,
                    description:data.description,
                    startPrice:data.startPrice,
                    updatedPrice:data.updatedPrice,
                    startTime:data.time[0],
                    endTime:data.time[1],
                    status:data.status,
                    minimumDecreasePrice:data.minimumDecreasePrice

                }
                this.dialogFormUpdateVisible = false
                updateAuction(params).then(res=>{
                    console.log("修改api成功");
                    this.$message({
                        showClose: true,
                        message: '拍卖信息修改成功',
                        type: 'success'
                    });
                    this.getAuctions(this.currentPage);
                }).catch(err=>{
                    console.log("修改api失败");
                    this.$message({
                        showClose: true,
                        message: '拍卖信息修改失败',
                        type: 'error'
                    });

                })
            },

            dialogFormAddInit(){
                this.dialogFormAddVisible = true;
                this.addAuctionform = {}
            },
            dialogFormAddCancel(){
                this.dialogFormAddVisible = false

            },
            dialogFormAddConfirm(data){
                this.dialogFormAddVisible = false;
                console.log(data.time);
                let params = {
                    name:data.name,
                    description:data.description,
                    startPrice:data.startPrice,
                    startTime:timeForAuction(data.time[0]),
                    endTime:timeForAuction(data.time[1]),
                    status:data.status,
                    minimumDecreasePrice:data.minimumDecreasePrice
            }
                addAuction(params).then(res=>{
                    console.log("新增拍卖成功");
                    this.$message({
                        showClose: true,
                        message: '拍卖新增成功',
                        type: 'success'
                    });
                    this.getAuctions(1);//页面更新
                }).catch(err=>{
                    console.log("新增api失败");
                    this.$message({
                        showClose: true,
                        message: '拍卖新增失败',
                        type: 'error'
                    });

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
