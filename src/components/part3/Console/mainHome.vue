<template>
    <div id ="diceng">
    <div>
        <announcement></announcement>
        <div class="block">
            <profile-bar style="border: 0"></profile-bar>
        </div>
            <el-tabs v-model="part">
                <el-tab-pane name="first">
                    <span slot="label">常用入口</span>
                </el-tab-pane>
            </el-tabs>
        <div class="block">
            <ul>
                <li>
                    <span>
                        <i class="el-icon-upload"></i><el-link @click="uploadDialog">上传资源</el-link>
                    </span>
                </li>
                <li>
                    <span>
                        <i class="el-icon-user"></i><el-link @click="gotouserinfo">个人信息</el-link>
                    </span>
                </li>
                <li>
                    <span>
                        <i class="el-icon-wallet"></i><el-link @click="gotoscore">积分明细</el-link>
                    </span>
                </li>
            </ul>
        </div>
    </div>
        <el-dialog title="上传资源" :visible.sync="dialogFormVisible" width="40%" center>
            <div style="margin: 0 auto;">
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
            <div style="margin-top: 5%">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="资源名称" style="margin-left: 10%">
                        <el-input v-model="form.fileName" placeholder="请填入名称" style="width: 80%"></el-input>
                    </el-form-item>
                    <el-form-item label="所属拍卖" style="margin-left: 10%">
                        <el-select v-model="form.auctionId" placeholder="请选择" style="width: 80%">
                            <el-option v-for="auction in auctions" :key="auction.auctionId" :label="auction.auctionName" :value="auction.auctionId"></el-option>
                        </el-select>
                    </el-form-item>
<!--                    <el-form-item>-->
<!--                        <el-button type="primary" @click="onSubmit(form)" style="display:block; margin:0 auto">提交</el-button>-->
<!--                    </el-form-item>-->
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit(form)" style="display:block; margin:0 auto">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import profileBar from "@/components/part3/Download/profileBar";
    import announcement from "@/components/part3/Common/announcement";
    import {getAuctionNames} from "@/api/part3/auction";
    export default {
        name: "mainHome",
        components:{
            profileBar,
            announcement
        },
        created(){
            this.$emit("label","");
            this.getAuctions();
        },
      mounted() {
       let tiankong= document.getElementById("diceng");
       tiankong.style.height=window.innerHeight+"px"

        console.log(tiankong.style.height)
       let announcement=document.getElementById("announcement");
       console.log(tiankong)
      },
      data(){
            return{
                part:"first",
                dialogFormVisible: false,
                form:{
                    fileName:"",
                    auctionId:"",
                },
                auctions:[],
            }
        },
        methods:
            {
                gotouserinfo(){
                    this.$router.push('/console/userinfo')
                },
                gotoscore(){
                    this.$router.push('/console/manage/score')
                },
                gotoupload(){
                    this.$router.push('/console/uploadResources')
                },
                getAuctions(){
                    getAuctionNames().then(res=>{
                        this.auctions = res.data.auctionNames;
                        console.log(res.data)
                    }).catch(err=>{
                        console.log(err)
                    })
                },
                uploadDialog(){
                    this.dialogFormVisible = true;
                },
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
                onSubmit(form){
                    this.$refs.upload.submit();
                },
            }
    }
</script>

<style scoped lang="stylus">

    .block
        padding 10px


    li
        display inline-block
        margin-right 38px

    ul
        text-align left

    li span
        border 1px solid #e9e9e9;
        padding 10px 50px
</style>
