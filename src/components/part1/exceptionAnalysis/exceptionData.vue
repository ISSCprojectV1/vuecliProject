<template>
    <div>
    <h2>报送异常事件</h2>
    <div style="text-align: left;width: 400px">
        <el-form :model="exceptionData" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="平台id" >
                <el-input v-model="exceptionData.source_id"></el-input>
            </el-form-item>
            <el-form-item label="报送时间">
                <el-date-picker
                        v-model="exceptionData.generate_time"
                        type="datetime"
                        placeholder="报送时间选择">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="商品种类id">
                <el-input v-model="exceptionData.product_id"></el-input>
            </el-form-item>
            <el-form-item label="异常类型id">
                <el-input v-model="exceptionData.type_id"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
    import {reportException} from "@/api/part1/exceptionRelation";

    export default {
        name: "exceptionData",
        data(){
            return {
                exceptionData:{
                    source_id:"",
                    generate_time:"",
                    product_id:"",
                    type_id:""
                }
            }
        },
        methods:{
            submitForm(){
                reportException(this.exceptionData).then(()=>{
                    this.$message({
                        message: '报送成功',
                        type: 'success'
                    });
                }).catch((err)=>{
                    console.log(err)
                })
            },
            resetForm(){
                this.exceptionData ={
                    source_id:"",
                    generate_time:"",
                    product_id:"",
                    type_id:""
                }
            }
        }
    }
</script>

<style scoped>

</style>
