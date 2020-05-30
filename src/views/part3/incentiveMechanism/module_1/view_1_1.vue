<template>
    <div>
    <div>view_1_1_list</div>
        <el-table
                :data="tableData"
                style="width: 100% ; height: 500px ; overflow:scroll"
                @row-click="(row)=> editRow(row.id)"
        >
            <el-table-column
                    label="日期"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.last_updated}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="180">
                <template slot-scope="scope">
                    <el-popover trigger="focus" placement="left">
                        <p>姓名: {{ scope.row.verify_status }}</p>
                        <p>住址: {{ scope.row.last_verify }}</p>
                        <span slot="reference" style="margin-left: 10px">{{ scope.row.name}}</span>
                    </el-popover>
                </template>

            </el-table-column>
            <el-table-column
                    prop="phone_number"
                    label="电话">
            </el-table-column>
        </el-table>
        <el-pagination
                @current-change = "changepage"
                :page-size=10
                layout="total, prev, pager, next"
                :total=total>
        </el-pagination>



    </div>

</template>

<script>
    import {getTutorList} from "@/api/part3";

    export default {
        name: "view_1_1",
        data(){
            return {
                tableData : [],
                total : 0,
                current : 1,
                count :5
            }
        },

        methods: {
            getData(){
                let params = {}
                params.start = this.current*10-10
                params.end = this.current*10
                getTutorList(params).then(res =>{
                    this.tableData = res.results;
                    this.total = res.total;
                    console.log(res);
                })
            },
            editRow(id) {
                this.$router.push('/view_1_1_Detail/' + id)
            },
            changepage(e){
                this.current = e;
                console.log(e)
                this.getData();
            },
            load(){
                this.count +=2
            }
        },
        created(){
            this.getData();
            var startTime = new Date();
            setTimeout(function () {
                console.log(new Date()-startTime);
            },400)
        },
    }
</script>

<style scoped>

</style>
