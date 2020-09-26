<template>
    <div>

      <div class="title">
        <div style="display: inline-block; margin-bottom:20px;font-size: 30px;" >  多模态多粒度监管与服务模式——主被动模态与空间粒度</div>
      </div>

        <el-button type="primary" @click="dialogFormAddInit">添加新任务</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="taskname"
                    label="任务名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="startingtime"
                    label="开始时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="endingtime"
                    label="结束时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="creatingtime"
                    label="创建时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="category"
                    label="监管种类"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="tasksize"
                    label="空间粒度"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="introduction"
                    label="描述"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="监管方式"
                    fixed="right"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="gotoActive(scope.row.id)" type="text" size="small">详情</el-button>
                  <el-button @click="gotoPassive(scope.row.id)" type="text" size="small">被动</el-button>


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
        <el-dialog title="新增新任务" :visible.sync="dialogAddVisible">
            <el-form :model="addForm" align="left">
                <el-form-item label="监管任务名称" >
                    <el-input v-model="addForm.taskname" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="时间">
                    <div>
                        <el-col :span="8">
                            <el-date-picker type="date" placeholder="开始时间" v-model="addForm.startingtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1"></el-col>
                        <el-col :span="8">
                            <el-date-picker placeholder="结束时间" type="date" v-model="addForm.endingtime" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </div>
                </el-form-item>
                <el-form-item label="种类" >
                    <el-input v-model="addForm.category" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="粒度" >
                    <el-select v-model="addForm.tasksize" placeholder="请选择活动区域">
                        <el-option label="国家级" value="国家级"></el-option>
                        <el-option label="省级" value="省级"></el-option>
                        <el-option label="市级" value="市级"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="范围" >
                    <el-input v-model="addForm.regulrange" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="介绍" >
                    <el-input v-model="addForm.introduction" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAddCancel">取 消</el-button>
                <el-button type="primary" @click="dialogFormAddConfirm(addForm)">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {activetask, addactivetask} from "@/api/part1/acpassTask";
//    <el-button @click="gotoPassive(scope.row.id)" type="text" size="small">被动</el-button>
    export default {
        name: "acpassTask",
        created(){
            this.activetaskList(1,10);
        },
        data() {
            return {
                total:0,
                addForm:{
                    taskname:"",
                    startingtime: "",
                    endingtime:"",
                    category:"",
                    tasksize:"",
                    regulrange: "",
                    introduction: "",
                    creatingtime: "",
                },
                dialogAddVisible:false,
                tableData: [
                //     {
                //     "id":0,     //可以不要
                //     "taskname":"11", //字符串
                //     "startingtime":"11", // 开始时间  比结束时间早
                //     "endingtime":"11", //结束时间  比开始时间晚
                //     "category":"11",  //种类 字符串即可
                //     "tasksize":"11",  //粒度 字符串 {0 ,1,2,3}  中一个即可
                //     "regulrange":"11", //范围 字符串 省+市+平台 用+号间隔传递
                //     "introduction":"11",// 字符串 前端文本输入
                //     "creatingtime":"11" // 当前时间
                // }
                ]
            }
        },
        methods:{
            activetaskList(currentPage,pageSize){
                activetask(currentPage,pageSize).then(res =>{
                    console.log("请求列表api成功");
                    console.log(res);
                    this.total = res.data.data.total
                    this.tableData = res.data.data.reslist
                }).catch(err=>{
                    console.log(err);
                    console.log("请求列表api失败")
                })
            },


            //换页请求
            pageChange(page){
                this.currentPage=page;
                this.activetaskList(page,10);
            },
            dialogFormAddConfirm(addForm){
                addForm.creatingtime = Date.now();
                console.log(addForm.startingtime)
                console.log(addForm.endingtime)
                console.log(addForm.creatingtime)
                addactivetask(addForm).then(res=>{
                    this.$message.success("添加成功")
                    this.dialogAddVisible=false
                    activetask().then(res =>{
                        console.log("请求列表api成功");
                        console.log(res);
                        this.tableData = res.data.data;

                    }).catch(err=>{
                        console.log(err);
                        console.log("请求列表api失败")
                    })

                }).catch(err=>{
                    console.log(err)
                })

            },
            dialogFormAddCancel(){
                this.dialogAddVisible=false
            },
            dialogFormAddInit(){
                this.dialogAddVisible=true
            },
            gotoActive(id){
                this.$router.push(`/trade/acpassTask/activetask/${id}`);

                //this.$router.push(`/trade/acpassTask/activetradeaction/${id}`);
            },
            gotoPassive(id){
              console.log("aaa")
              console.log(id)
                this.$router.push(`/trade/acpassTask/passivetradeaction/${id}`);
            }
        }
    }
</script>

<style scoped>

</style>
