<template>
    <div>
        <el-button type="primary" @click="open" class="button">新增</el-button>
        <el-button type="success" @click="open" class="button">修改</el-button>
        <el-button type="danger" @click="open" class="button">删除</el-button>
        <el-table
                :data="tableData"
        >
            <el-table-column
                    label="编号"
                    width="180"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    width="180"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="手机号码"
                    width="180"
                    prop="telephone">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    width="180"
                    prop="createdDate">
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

        <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.role" clearable placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
        name: "user",
        data(){
            return{
                form:{},

                dialogFormVisible: false,
                formLabelWidth: '120px',


                options: [
                    {
                    value: 1,
                    label: '管理员'
                    },
                    {
                    value: 2,
                    label: '普通用户'
                    },
                ],
                tableData:[
                    {
                        id:1,
                        name:"admin",
                        telephone:"18851001980",
                        createdDate:"2019-03-16 11:30:00",
                        role:1
                    },
                    {
                        id:2,
                        name:"user1",
                        telephone:"18851004444",
                        createdDate:"2019-03-18 11:30:00",
                        role:2
                    },
                ]
            }
        },
        methods: {
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
                this.$confirm('是否删除角色:'+row.name, '提示', {
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
