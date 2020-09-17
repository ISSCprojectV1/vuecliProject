<template>
    <div class="all">
        <div>
            <el-form ref="form" :model="file" label-width="80px">
                <el-form-item
                        label="资源名称"
                        placeholder="请填入名称"
                >
                    <el-input v-model="file.fileName"></el-input>
                </el-form-item>
                <el-form-item label="资源类型">
                    <el-select v-model="file.category" placeholder="请选择">
                        <el-option label="类型一" value="类型一"></el-option>
                        <el-option label="类型二" value="类型二"></el-option>
                    </el-select>
                </el-form-item>
<!--                <el-form-item-->
<!--                        label="所需积分"-->
<!--                >-->
<!--                    <el-input v-model="file.fileScore"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item-->
<!--                        label="资源标签"-->
<!--                        placeholder="请填入标签"-->
<!--                >-->
<!--                    <el-tag-->
<!--                            :key="tag"-->
<!--                            v-for="tag in this.dynamicTags"-->
<!--                            closable-->
<!--                            :disable-transitions="false"-->
<!--                            @close="handleClose(tag)">-->
<!--                        {{tag}}-->
<!--                    </el-tag>-->
<!--                    <el-input-->
<!--                            class="input-new-tag"-->
<!--                            v-if="inputVisible"-->
<!--                            v-model="inputValue"-->
<!--                            ref="saveTagInput"-->
<!--                            size="small"-->
<!--                            @keyup.enter.native="handleInputConfirm"-->
<!--                            @blur="handleInputConfirm"-->
<!--                    >-->
<!--                    </el-input>-->
<!--                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="资源描述">-->
<!--                    <el-input type="textarea" v-model="file.fileDescription"></el-input>-->
<!--                </el-form-item>-->
<!--                <p style="color: #f9a7a7">声明：请确保您上传的内容合法合规，涉及侵权内容将会被移除，详见《资源共享规则》</p>-->
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getfileDetail, updateFile} from "@/api/part3";
    import {timestampToTime} from "@/utils/part3";

    export default {
        name: "editorial",
        created(){
            this.$emit("label","editorial");
            this.getFile();
        },
        data(){
            return {
                file:{
                    id:0,
                    fileName:"",
                    fileDescription:"",
                    category:"",
                    fileScore:0,
                    fileTags:"",
                },
                inputVisible: false,
                inputValue: '',
                dynamicTags:[]
            }
        },
        methods:{
            getFile(){
                getfileDetail(this.$route.params.id).then((res)=>{
                    this.init(res.data.data[0]);
                    console.log(res.data.data[0]);
                    console.log("getfileDetail success!")
                }).catch((e)=>{
                    console.log(e);
                    console.log("getfileDetail fail")
                })
            },
            updateFile(data){
                updateFile(data).then((res)=>{
                    console.log(res.data.data[0]);
                    console.log("updateFile success!")
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                }).catch((e)=>{
                    console.log(e);
                    this.$message.error('修改失败');
                    console.log("updateFile fail")
                });
                setTimeout(()=>this.$router.go(0),3000)
            },
            init(data){
                this.file.fileName = data.fileName;
                this.file.fileDescription = data.fileDescription;
                this.file.fileScore = data.fileScore;
                this.file.fileTags = data.fileTags;
                this.file.id = data.id;
                this.file.gmtModified = timestampToTime(data.gmtModified);
                this.file.category = data.category;
                this.dynamicTags = data.fileTags.split(",");
            },
            onSubmit(){
                this.file.fileTags = this.dynamicTags.toString();
                let data={
                    id:this.file.id,
                    fileName:this.file.fileName,
                    category:this.file.category,
                    fileScore:this.file.fileScore,
                    fileDescription:this.file.fileDescription,
                    fileTags:this.file.fileTags
                }
                console.log("提交")
                this.updateFile(data)
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },

            showInput() {
                this.inputVisible = true;
                // eslint-disable-next-line no-unused-vars
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .all
        text-align left

    .el-tag + .el-tag {
        margin-left: 10px;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

</style>
