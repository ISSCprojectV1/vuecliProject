<template>
    <div>
        <div>

            <el-steps :active="active"  finish-status="success" align-center simple>
                <el-step title="任务输入"   @click.native="onclickFun1"></el-step>

                <el-step title="时间空间粒度补全"  @click.native="onclickFun2"></el-step>
                <el-step title="联盟形成" @click.native="onclickFun3"></el-step>
                <el-step title="流程图展示"  @click.native="onclickFun4"></el-step>
            </el-steps>
            <div>
            <el-tag>点击步骤条相关步骤查看对应内容</el-tag>
            </div>
            <div>
            <el-button @click="goformer()">上一步</el-button>
            <el-button @click="golater()" >下一步</el-button>
                </div>
    </div>
        <div>
        <router-view>    </router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "stepBar",
        data(){
        return{
            active:0

        }},
created() { this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
},
        methods:{
            goformer(){
               /* if(this.active>=1)
                {
                    this.$router.go(-1)
                    this.active--
                }*/
                if(this.active==1)
                {
                    this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
                    this.active=0
                    return
                }

                if(this.active==2)
                {
                    this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
                    this.active=1
                    return
                }

                if(this.active==3)
                {
                    this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
                    this.active=2
                    return
                }


            },
            golater(){
                console.log(this.active)
                if(this.active==0)
                {
                    this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
                    this.active=1
                    return
                }

                if(this.active==1)
                {
                    this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
                    this.active=2
                    return
                }

                if(this.active==2)
                {
                    this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")
                    this.active=3
                    return
                }

            },
        onclickFun1()
        {
            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")
            this.active=0

        },
        onclickFun2()
        {

            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")
            this.active=1

        },
        onclickFun3()
        {
            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")
            this.active=2
        }     ,
        onclickFun4()
        {
            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")
            this.active=3
        }

    }

    }
</script>

<style scoped>

</style>