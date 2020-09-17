<template>
    <div>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-main>
                    <announcement></announcement>
                    <router-view :file="file"></router-view>
                </el-main>
<!--                <el-aside>-->
<!--                    <profile-bar></profile-bar>-->
<!--                </el-aside>-->
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from "@/components/part3/Common/header";
    //import profileBar from "@/components/part3/Common/profileBar";
    import announcement from "@/components/part3/Common/announcement";
    import {getfileDetail} from "@/api/part3";
    import {timestampToTime} from "@/utils/part3";
    export default {
        name: "resourceDetail",
        components:{
            Header,
            //profileBar
            announcement
        },
        data(){
            return{
                file:{
                    id:0,
                    fileName:"",
                    fileDescription: "",
                    fileScore:0,
                    gmtModified:"",
                    fileTags:"",
                },
                resourceId:this.$route.params.id
            }
        },
        created(){
            this.getFile();
        },
        methods:{
            init(data){
                this.file.fileName = data.fileName;
                this.file.fileDescription = data.fileDescription;
                this.file.fileScore = data.fileScore;
                this.file.fileTags = data.fileTags;
                this.file.id = data.id;
                this.file.gmtModified = timestampToTime(data.gmtModified);
            },
            getFile(){
                getfileDetail(this.$route.params.id).then((res)=>{
                    this.init(res.data.data[0]);
                    //console.log(res.data.data[0])
                    console.log("getfileDetail success!")
                }).catch((e)=>{
                    console.log(e);
                    console.log("getfileDetail fail")
                })
            }
        }
    }
</script>

<style scoped lang="stylus">
    .el-aside
        padding 20px 10px 20px 10px
</style>
