<template>
    <div>
        <el-button type="primary" @click="dialogFormAddInit" class="button">新增</el-button>
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
                    label="组件url"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="component"
                    label="组件路径"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click=dialogFormUpdateInit(scope.row)>修改</el-button>
                    <el-popconfirm
                            confirmButtonText='确定'
                            cancelButtonText='取消'
                            icon="el-icon-info"
                            iconColor="red"
                            title="确定删除该项吗？"
                            @onConfirm="handleDelete(scope.row.id)"
                    >
                        <el-button  size="mini" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增菜单" :visible.sync="dialogFormAddVisible">
            <el-tree
            :data="tableData"
            node-key="id"
            :props="{
                label:'name',
                children:'children'
            }"
            @node-click="addDialogClickChange"
            v-if="!addNewPid"
            :highlight-current="true"
            ></el-tree>


            <el-form :model="addMenuForm">
                <el-form-item label="请选择" :label-width="formLabelWidth2" >
                    <el-switch
                            style="text-align: center"
                            v-model="addNewPid"
                            active-text="增加新父节点"
                            inactive-text="选择已有父节点"
                            v-on:change="changeAddNewPid"
                    >
                    </el-switch>
                </el-form-item>

                <el-form-item label="pid" :label-width="formLabelWidth" >
                    <el-input v-model="addMenuForm.pid" autocomplete="off" :disabled="addNewPid"></el-input>
                </el-form-item>
                <el-form-item label="name" :label-width="formLabelWidth">
                    <el-input v-model="addMenuForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="type" :label-width="formLabelWidth">
                    <el-input v-model="addMenuForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="path" :label-width="formLabelWidth">
                    <el-input v-model="addMenuForm.url" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="component" :label-width="formLabelWidth2">
                    <el-input v-model="addMenuForm.component" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="score" :label-width="formLabelWidth">
                    <el-input v-model="addMenuForm.score" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAddCancel">取 消</el-button>
                <el-button type="primary" @click="dialogFormAddConfirm(addMenuForm)">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改菜单" :visible.sync="dialogFormUpdateVisible">
            <el-form :model="form">
                <el-form-item label="name" :label-width="formLabelWidth2">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="path" :label-width="formLabelWidth2">
                    <el-input v-model="form.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="component" :label-width="formLabelWidth2">
                    <el-input v-model="form.component" autocomplete="off"></el-input>
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
        adminAddMenu,
        adminDeleteMenu,
        adminUpdateMenu, getmenu,
    } from "@/api/part3";

    export default {
        name: "menu",
        data(){
            return {
                addNewPid:false,
                formLabelWidth: '50px',
                formLabelWidth2: '90px',
                dialogFormUpdateVisible: false,
                dialogFormAddVisible: false,
                addMenuForm: {
                    pid:0
                },
                form:{},
                tableData:[
                    // {
                    //     "id": 1,
                    //     "name": "动态联盟自组织",
                    //     "url": "/transactionProject",
                    //     "icon": null,
                    //     "childMenus": [
                    //         {
                    //             "id": 5,
                    //             "name": "网络图",
                    //             "url": "/transctionProject/echarts",
                    //             "icon": null,
                    //             "childMenus": []
                    //         },
                    //         {
                    //             "id": 6,
                    //             "name": "联盟查询",
                    //             "url": "/transctionProject/processQuery",
                    //             "icon": null,
                    //             "childMenus": []
                    //         }
                    //     ]
                    // },
                    // {
                    //     "id": 2,
                    //     "name": "激励机制",
                    //     "url": "/incentiveMechanism",
                    //     "icon": null,
                    //     "childMenus": [
                    //         {
                    //             "id": 7,
                    //             "name": "激励机制主页",
                    //             "url": "/transactionProject/processQuery",
                    //             "icon": null,
                    //             "childMenus": []
                    //         },
                    //         {
                    //             "id": 8,
                    //             "name": "上传资源",
                    //             "url": "/IncentiveMechanism/console/uploadResource",
                    //             "icon": null,
                    //             "childMenus": []
                    //         },
                    //         {
                    //             "id": 9,
                    //             "name": "下载主页",
                    //             "url": "/IncentiveMechanism/Download/downloadHome",
                    //             "icon": null,
                    //             "childMenus": []
                    //         },
                    //         {
                    //             "id": 10,
                    //             "name": "我的资源",
                    //             "url": "IncentiveMechanism/Download/myDownload",
                    //             "icon": null,
                    //             "childMenus": []
                    //         },
                    //         {
                    //             "id": 11,
                    //             "name": "上传明细",
                    //             "url": "/IncentiveMechanism/Download/resourceDetail",
                    //             "icon": null,
                    //             "childMenus": []
                    //         },
                    //         {
                    //             "id": 12,
                    //             "name": "用户信息",
                    //             "url": "/IncentiveMechanism/User/userinfo",
                    //             "icon": null,
                    //             "childMenus": []
                    //         }
                    //     ]
                    // },
                    // {
                    //     "id": 3,
                    //     "name": "模块与粒度",
                    //     "url": "/granularityProject",
                    //     "icon": null,
                    //     "childMenus": [
                    //         {
                    //             "id": 14,
                    //             "name": "模块与粒度输入",
                    //             "url": "/ModuleProject /moduleInput",
                    //             "icon": null,
                    //             "childMenus": []
                    //         }
                    //     ]
                    // },
                    // {
                    //     "id": 4,
                    //     "name": "风险预测",
                    //     "url": "/riskPredictionProject",
                    //     "icon": null,
                    //     "childMenus": [
                    //         {
                    //             "id": 13,
                    //             "name": "价格预测示意图",
                    //             "url": "/riskPredictionProject/riskPrediction",
                    //             "icon": null,
                    //             "childMenus": []
                    //         }
                    //     ]
                    // },
                    // {
                    //     "id": 21,
                    //     "name": "权限管理",
                    //     "url": "/admin/manage",
                    //     "icon": null,
                    //     "childMenus": []
                    // },
                    // {
                    //     "id": 15,
                    //     "name": "数据审核",
                    //     "url": "/admin",
                    //     "icon": null,
                    //     "childMenus": [
                    //         {
                    //             "id": 16,
                    //             "name": "上传数据审核",
                    //             "url": "/admin/checkfile",
                    //             "icon": null,
                    //             "childMenus": []
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        created(){
            this.init();
        },
        methods:{
            init(){
                this.getMenuAPI();
            },
            getMenuAPI(){
                getmenu().then(res=>{
                    console.log("请求菜单列表api成功");
                    console.log(res.data);
                    this.handleName(res.data);
                    console.log(res.data)
                    this.tableData = res.data;

                }).catch(err=>{
                    console.log(err);
                    console.log("请求角色列表api失败")
                })
            },
            handleName(list){
                if(list.length>0){
                    for(let i=0;i<list.length;i++)
                    {
                        list[i].name = list[i].meta.title
                        list[i].url = list[i].path
                        this.handleName(list[i].children)
                    }
                }

            },
            handleDelete(id) {
                adminDeleteMenu(id).then(res=>{
                    console.log("菜单删除api成功");
                    this.$message({
                        showClose: true,
                        message: '菜单删除成功',
                        type: 'success'
                    });
                    this.getMenuAPI();
                }).catch(err=>{
                    console.log("菜单删除api失败");
                    this.$message({
                        showClose: true,
                        message: '菜单删除失败',
                        type: 'error'
                    });
                })
            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(this.$refs.tree.getCheckedKeys())
                console.log(data, checked, indeterminate);
            },




            dialogFormUpdateInit(row){
                this.dialogFormUpdateVisible = true
                this.form = row
            },

            dialogFormUpdateCancel(){
                this.dialogFormUpdateVisible = false

            },
            dialogFormUpdateConfirm(data){
                this.dialogFormUpdateVisible = false
                adminUpdateMenu(data).then(res=>{
                    console.log("菜单修改api成功");
                    this.$message({
                        showClose: true,
                        message: '菜单修改成功',
                        type: 'success'
                    });
                    this.getMenuAPI();
                }).catch(err=>{
                    console.log("菜单修改api失败");
                    this.$message({
                        showClose: true,
                        message: '菜单修改失败',
                        type: 'error'
                    });

                })
            },




            dialogFormAddInit(){
                this.dialogFormAddVisible = true;
                this.addMenuForm = {
                    pid:0
                }
            },

            dialogFormAddCancel(){
                this.dialogFormAddVisible = false

            },
            dialogFormAddConfirm(data){
                this.dialogFormAddVisible = false
                adminAddMenu(data).then(res=>{
                    console.log("菜单新增api成功");
                    this.$message({
                        showClose: true,
                        message: '菜单新增成功',
                        type: 'success'
                    });
                    this.getMenuAPI();
                }).catch(err=>{
                    console.log("菜单新增api失败");
                    this.$message({
                        showClose: true,
                        message: '菜单新增失败',
                        type: 'error'
                    });

                })
            },
            addDialogClickChange(node){
                this.addMenuForm.pid = node.id
            },

            changeAddNewPid(IsaddNewPid){
                if (IsaddNewPid){
                    this.addMenuForm.pid=0;
                }

            }
        }
    }
</script>

<style scoped lang="stylus">
    .button
        margin-bottom 10px
</style>
