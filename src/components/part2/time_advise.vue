<template>
    <div style="width: 100%;height: 800px">
        <div  style="display: inline-block; margin-bottom:30px; margin-right:500px; font-size:40px"><el-button type="primary" @click="backTo()" style="margin-right:400px">返回上一级</el-button>时间粒度推荐</div>
        <div style="margin-left:20px;margin-right:20px">
            <el-input v-model="search" style="width: 300px" placeholder="请输入搜索关键词"></el-input>
            <el-button class="btn1" type="primary"  @click="addTimeadvise" style="margin-left:20px;margin-right:20px">时间粒度计算</el-button>
            <h2></h2>
            <el-table  :data="tables.slice((currentPage-1)*PageSize,currentPage*PageSize)"
            :header-cell-style="headcell"
            >
                <el-table-column
                        label="商品ID"
                        prop="id"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="商品名称"
                        prop="name"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="推荐时间粒度"
                        prop="timeadvise"
                        sortable>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="currentPage"
                           :page-sizes="pageSizes"
                           :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                           :total="totalCount">
            </el-pagination>

            <h2> </h2>
        </div>
    </div>

</template>

<script>
    import {getcommodityTimeadvise,addcommodityTimeadvise} from "@/api/part1/Multimodal-multigranularity";
    export default {
        name: "time_advise",

        //在这里调用ajax请求方法
        created(){
            this.getData();
        },
        computed: {
            // 模糊搜索
            tables() {
                const search = this.search
                if (search) {
                    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                    // 注意： filter() 不会对空数组进行检测。
                    // 注意： filter() 不会改变原始数组。
                    return this.dormitory.filter(data => {
                        return Object.keys(data).some(key => {
                            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.dormitory
            },
        },

        data() {
            return {
                dormitory: [],
                search: '',
                // 默认显示第几页
                currentPage:1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount:100,
                // 个数选择器（可修改）
                pageSizes:[5,10],
                // 默认每页显示的条数（可修改）
                PageSize:5,

                dialogTableVisible: false,
                dialogFormVisible: false,

            }


        },
        methods: {
          headcell(){
            return {
              'background-color': '#dfdfdf',
              'color': 'rgb(96, 97, 98)',
              'font-weight':'bold',
              'font-size':'16px'
            }
          },
            backTo() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/goodsgranularity');
            },
            getData(){
                // 获取表格数据1
                getcommodityTimeadvise().then((res) => {
                    //this.tableData = res.data;
                    this.dormitory = res.data;
                }).catch(()=>{
                    console.log("taskExecution fail")
                });
            },
            // 分页
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage=1
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage=val
            },

            addTimeadvise() {
                addcommodityTimeadvise().then((res) => {
                    this.getok();
                }).catch(()=>{
                    console.log("taskExecution fail")
                });
                const loading = this.$loading({
                    lock: true,
                    text: '正在计算时间粒度',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                }, 3000);
            },

        }
    }
</script>

<style scoped>

</style>
