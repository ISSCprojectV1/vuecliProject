<template>
    <div>
        <el-button type="primary" @click="open" class="button">新增</el-button>
        <el-button type="success" @click="open" class="button">修改</el-button>
        <el-button type="danger" @click="open" class="button">删除</el-button>
        <el-table
        :data="tableData"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children'}"
        >
            <el-table-column
                    prop="name"
                    label="菜单名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="path"
                    label="组件路径"
                    width="400">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click=dialogFormInit(scope.row)>修改</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改菜单" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="菜单名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组件路径" :label-width="formLabelWidth">
                    <el-input v-model="form.path" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "menu",
        data(){
            return {
                formLabelWidth: '120px',
                dialogFormVisible: false,

                form:{},
                tableData:[
                            {
                                id:1,
                                name:"我的信息",
                                path:"views/part3/incentiveMechanism/User/userinfo",
                                children:[
                                    {
                                        id:2,
                                        name:"个人资料",
                                        path:"views/part3/incentiveMechanism/User/userinfo"
                                    },
                                    {
                                        id:3,
                                        name:"我的下载",
                                        path:"views/part3/incentiveMechanism/User/userinfo"
                                    },
                                    {
                                        id:4,
                                        name:"我的积分",
                                        path:"views/part3/incentiveMechanism/User/userinfo"
                                    },
                                    {
                                        id:5,
                                        name:"我的群组",
                                        path:"views/part3/incentiveMechanism/User/userinfo"
                                    },
                                ]
                            },
                                {
                                    id:6,
                                    name:"工作台",
                                    path:"views/part3/incentiveMechanism/User/userinfo",
                                    children:[
                                        {
                                            id:7,
                                            name:"首页",
                                            path:"views/part3/incentiveMechanism/User/userinfo"
                                        },
                                        {
                                            id:8,
                                            name:"上传资源",
                                            path:"views/part3/incentiveMechanism/User/userinfo"
                                        },
                                        {
                                            id:9,
                                            name:"上传明细",
                                            path:"views/part3/incentiveMechanism/User/userinfo"
                                        },
                                        {
                                            id:10,
                                            name:"积分明细",
                                            path:"views/part3/incentiveMechanism/User/userinfo"
                                        },
                                        {
                                            id:11,
                                            name:"下载明细",
                                            path:"views/part3/incentiveMechanism/User/userinfo"
                                        },
                                        {
                                            id:12,
                                            name:"编辑",
                                            path:"views/part3/incentiveMechanism/User/userinfo"
                                        },
                                    ]
                    }
                ]
            }
        },
        methods:{
            open() {
                this.$prompt('请输入邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            handleDelete(row) {
                this.$confirm('是否删除菜单:'+row.name, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    console.log("删除菜单的id:"+row.id);//加上删除的后端代码
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(this.$refs.tree.getCheckedKeys())
                console.log(data, checked, indeterminate);
            },
            dialogFormInit(row){
                this.dialogFormVisible = true
                this.form = row
            }
        }
    }
</script>

<style scoped lang="stylus">
    .button
        margin-bottom 10px
</style>
