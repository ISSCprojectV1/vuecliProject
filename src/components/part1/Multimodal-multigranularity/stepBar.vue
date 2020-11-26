<template>
    <div>
        <div>
            <el-steps :active="active" align-center>
                <el-step title="步骤1" description="任务输入"  @click.native="onclickFun1"></el-step>

                <el-step title="步骤2" description="时间粒度空间补全" @click.native="onclickFun2"></el-step>
                <el-step title="步骤3" description="联盟形成" @click.native="onclickFun3"></el-step>
                <el-step title="步骤4" description="流程图展示" @click.native="onclickFun4"></el-step>
            </el-steps>

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

    methods:{
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