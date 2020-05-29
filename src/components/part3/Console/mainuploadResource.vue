<template>
    <div class="all">
        <div>
                    <el-upload
                            drag
                            action="/api/upload"
                            ref="upload"
                            :auto-upload=false
                            :data=form
                            name="file"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">可上传任意格式文件</div>
                    </el-upload>
            <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item
                                label="资源名称"
                                placeholder="请填入名称"
                        >
                            <el-input v-model="form.fileName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属类型">
                            <el-select v-model="form.category" placeholder="请选择">
                                <el-option label="钢铁" value="钢铁"></el-option>
                                <el-option label="棉花" value="棉花"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item
                                label="所需积分"
                        >
                            <el-input v-model="form.fileScore"></el-input>
                        </el-form-item>
                            <el-form-item
                                    label="资源标签"
                                    placeholder="请填入标签"
                            >
                                <el-tag
                                        :key="tag"
                                        v-for="tag in dynamicTags"
                                        closable
                                        :disable-transitions="false"
                                        @close="handleClose(tag)">
                                    {{tag}}
                                </el-tag>
                                <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputValue"
                                        ref="saveTagInput"
                                        size="small"
                                        @keyup.enter.native="handleInputConfirm"
                                        @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                            </el-form-item>
                        <el-form-item label="资源描述">
                            <el-input type="textarea" v-model="form.fileDescription"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-radio-group>
                                <el-radio label="同意数据共享规则"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit(form)">提交</el-button>
                        </el-form-item>
                    </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mainuploadResource",
        created(){
            this.$emit("label","uploadResource")
            },
        data(){
            return {
                form:{
                    fileName:"",
                    category:"",
                    fileScore:"",
                    fileTags:"",
                    fileDescription:"",
                    //agree:"",
                },
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            }
        },
        methods:{
            onSubmit(form){
                form.fileTags = this.dynamicTags.toString();
                console.log(form);
                this.$refs.upload.submit();
                this.$router.push('/console/upload');
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
