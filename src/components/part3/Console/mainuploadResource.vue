<template>
    <div class="all" id="diceng">
        <div style="margin: 0 auto;">
          <div>
            <el-upload
                drag
                action="/api/uploadfile"
                ref="upload"
                :auto-upload=false
                :data=form
                name="multipartFile"
                :on-error="uploadError"
                :on-success="uploadSuccess"
                style="display: table; margin: auto;"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="text-align: center">仅支持上传sql文件</div>
            </el-upload>
          </div>
            <el-form ref="form" :model="form" label-width="80px" label-position="top">
                        <el-form-item
                                label="资源名称"
                                placeholder="请填入名称"
                        >
                            <el-input v-model="form.fileName"></el-input>
                        </el-form-item>
                        <el-form-item label="所属拍卖">
                            <el-select v-model="form.auctionId" placeholder="请选择" style="width: 100%">
                                <el-option v-for="auction in auctions" :key="auction.auctionId" :label="auction.auctionName" :value="auction.auctionId"></el-option>
                            </el-select>
                        </el-form-item>
<!--                        <el-form-item-->
<!--                                label="所需积分"-->
<!--                        >-->
<!--                            <el-input v-model="form.fileScore"></el-input>-->
<!--                        </el-form-item>-->
<!--                            <el-form-item-->
<!--                                    label="资源标签"-->
<!--                                    placeholder="请填入标签"-->
<!--                            >-->
<!--                                <el-tag-->
<!--                                        :key="tag"-->
<!--                                        v-for="tag in dynamicTags"-->
<!--                                        closable-->
<!--                                        :disable-transitions="false"-->
<!--                                        @close="handleClose(tag)">-->
<!--                                    {{tag}}-->
<!--                                </el-tag>-->
<!--                                <el-input-->
<!--                                        class="input-new-tag"-->
<!--                                        v-if="inputVisible"-->
<!--                                        v-model="inputValue"-->
<!--                                        ref="saveTagInput"-->
<!--                                        size="small"-->
<!--                                        @keyup.enter.native="handleInputConfirm"-->
<!--                                        @blur="handleInputConfirm"-->
<!--                                >-->
<!--                                </el-input>-->
<!--                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>-->
<!--                            </el-form-item>-->
<!--                        <el-form-item label="资源描述">-->
<!--                            <el-input type="textarea" v-model="form.fileDescription"></el-input>-->
<!--                        </el-form-item>-->
<!--                        <el-form-item label="">-->
<!--                            <el-radio-group>-->
<!--                                <el-radio label="同意数据共享规则"></el-radio>-->
<!--                            </el-radio-group>-->
<!--                        </el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit(form)" style="display:block;margin:0 auto">提交</el-button>
                        </el-form-item>
                    </el-form>
        </div>
    </div>
</template>

<script>
import {getAuctionNames, getAuctionNamesNew} from "@/api/part3/auction";

    export default {
        name: "mainuploadResource",
        created(){
            this.$emit("label","uploadResource");
            this.getAuctions();
            },
        data(){
            return {
                auctions:[],
                form:{
                    fileName:"",
                    auctionId:"",
                    // fileScore:"",
                    // fileTags:"",
                    // fileDescription:"",
                    //agree:"",
                },
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            }
        },
      mounted() {
        let tiankong= document.getElementById("diceng");
        tiankong.style.height=window.innerHeight+"px"

        console.log(tiankong.style.height)
        let announcement=document.getElementById("announcement");
        console.log(tiankong)
      },
        methods:{
            uploadSuccess(){
                this.$message({
                    message: '上传成功',
                    type: 'success',
                })
            },
            uploadError(){
                this.$message({
                    message: '上传失败',
                    type: 'error'
                });
            },
            getAuctions(){
                getAuctionNamesNew().then(res=>{
                    this.auctions = res.data.auctionNames;
                    console.log(res.data)
                }).catch(err=>{
                    console.log(err)
                })
            },
            onSubmit(form){
                this.$refs.upload.submit();
                //this.$router.push('/console/upload');
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
        width 50%
        text-align left
        margin-left auto
        margin-right auto

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
