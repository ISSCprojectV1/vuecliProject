<template>
    <div>
        <div>
            <el-steps :active="2" align-center>
                <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"  @click.native="onclickFun1"></el-step>
                <el-step title="步骤2" description="这是一段很长很长很长的描述性文字" @click.native="onclickFun2"></el-step>
                <el-step title="步骤3" description="这是一段很长很长很长的描述性文字" @click.native="onclickFun3"></el-step>
                <el-step title="步骤4" description="这是一段很长很长很长的描述性文字" @click.native="onclickFun4"></el-step>
            </el-steps>
        <ul id="main">
            <li><router-link  to="/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition" >商品</router-link></li>
            <li><router-link  to="/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart">评价</router-link></li>
            <li><router-link  to="/trade/Multimodal-multigranularity/stepBar/taskQueryTableView">商家</router-link></li>

        </ul>
    </div>
        <div>
        <router-view>    </router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "stepBar",
    methods:{
        onclickFun1()
        {
            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskInput3")

        },
        onclickFun2()
        {
            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTransactionCoalition")

        },
        onclickFun3()
        {
            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryFlowChart")

        }     ,
        onclickFun4()
        {
            this.$router.push("/trade/Multimodal-multigranularity/stepBar/taskQueryTableView")

        }

    }

    }
</script>

<style scoped>

</style>