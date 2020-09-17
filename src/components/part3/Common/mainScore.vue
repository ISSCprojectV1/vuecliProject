<template>
<div id="diceng">
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="score"
                label="分数"
                width="180">
        </el-table-column>
        <el-table-column
                prop="time"
                label="时间"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="下载资源">
        </el-table-column>
        <el-table-column
                prop="note"
                label="">
        </el-table-column>
    </el-table>
</div>
</template>

<script>
    export default {
        data(){
            return {
                tableData: [{
                    score: "+20",
                    time: '2016-05-02',
                    name: '钢铁交易数据',
                    note: '- 资源被下载获得积分'
                    },
                    {
                    score: "+10",
                    time: '2019-05-02',
                    name: '小麦交易数据',
                    note: '- 资源被下载获得积分'
                    },
                    {
                        score: "-20",
                        time: '2019-05-02',
                        name: '钢铁交易数据',
                        note: '- 下载资源扣除积分'
                    },
                ]
            }
        },
        created(){
            this.$emit("label","score")
        },
      mounted() {
        let tiankong= document.getElementById("diceng");
        tiankong.style.height=window.innerHeight+"px"

        console.log(tiankong.style.height)
        let announcement=document.getElementById("announcement");
        console.log(tiankong)
      },
    }
</script>

<style scoped>

</style>
