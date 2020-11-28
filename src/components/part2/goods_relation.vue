<template>
    <div style="width: 100%;height: 800px">
        <div  style="display: inline-block; margin-bottom:30px; margin-right:500px; font-size:40px"><el-button type="primary" @click="backTo()" style="margin-right:400px">返回上一级</el-button>关联商品发现</div>

        <el-container style="height: 800px; border: 10px solid #eee">

            <el-aside width="500px" style="border: 10px solid #eee">
                <div style="margin-left:20px;margin-right:20px">
                    <h2> 关联商品展示 </h2>
                    <el-table  :data="tables2.slice((currentPage2-1)*PageSize2,currentPage2*PageSize2)">
                        <el-table-column prop="commodityname" label="商品名称">
                        </el-table-column>
                        <el-table-column prop="relationname" label="关联商品">
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange2"
                                   @current-change="handleCurrentChange2"
                                   :current-page="currentPage2"
                                   :page-sizes="pageSizes2"
                                   :page-size="PageSize2" layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCount2">
                    </el-pagination>

                    <h2> </h2>
                </div>
            </el-aside>
            <el-container style="height: 800px; border: 10px solid #eee">

            <el-main>
                <div>
                    <h2 class="red"> 交易事务集展示 </h2>
                    <el-input v-model="search" style="width: 300px" placeholder="请输入搜索关键词"></el-input>
                    <el-button type="primary" @click="goToprice()" style="margin-left:10px;margin-right:10px">添加交易事务</el-button>
                    <el-button type="primary" @click="goTogoods_relation()" style="margin-left:10px;margin-right:10px">关联商品发现</el-button>

                </div>
                <div>
                    <h2></h2>
                    <el-table :data="tables.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                              :default-sort="{prop: 'id', order: 'ascending'}">
                        <el-table-column prop="id" label="交易事务ID">
                        </el-table-column>
                        <el-table-column prop="dealerid" label="交易商ID">
                        </el-table-column>
                        <el-table-column prop="dealername" label="交易商名称">
                        </el-table-column>
                        <el-table-column prop="commodityid" label="参与交易商品ID">
                        </el-table-column>
                        <el-table-column prop="commodityname" label="商品名称">
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-sizes="pageSizes"
                                   :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCount">
                    </el-pagination>
                </div>
            </el-main>
            </el-container>
        </el-container>


    </div>
</template>

<script>
    import {getcommodityTransaction,getcommodityRelation} from "@/api/part1/Multimodal-multigranularity";
    export default {
        name: "goods_relation",
        created(){
            this.getData();
            this.getData2();
        },
        methods: {

            getData(){
                // 获取表格数据1
                getcommodityTransaction().then((res) => {
                    //this.tableData = res.data;
                    this.dormitory = res.data;
                }).catch(()=>{
                    console.log("taskExecution fail")
                });
            } ,
            getData2(){
                // 获取表格数据2
                getcommodityRelation().then((res) => {
                    this.dormitory2 = res.data;
                }).catch(()=>{
                    console.log("taskExecution fail")
                });
            } ,

            backTo() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/goodsgranularity');
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

            // 分页
            // 每页显示的条数
            handleSizeChange2(val) {
                // 改变每页显示的条数
                this.PageSize2=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage2=1
            },
            // 显示第几页
            handleCurrentChange2(val) {
                // 改变默认的页数
                this.currentPage2=val
            },

        },
        computed: {
            // 模糊搜索
            tables () {
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
            // 模糊搜索
            tables2 () {
                const search = this.search2
                if (search) {
                    // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                    // 注意： filter() 不会对空数组进行检测。
                    // 注意： filter() 不会改变原始数组。
                    return this.dormitory2.filter(data => {
                        return Object.keys(data).some(key => {
                            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.dormitory2
            }
        },
        data() {
            return {
                dormitory: [],
                dormitory2: [],
                search: '',
                search2: '',
                // 默认显示第几页
                currentPage:1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount:100,
                // 个数选择器（可修改）
                pageSizes:[5,10],
                // 默认每页显示的条数（可修改）
                PageSize:5,

                currentPage2:1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount2:20,
                // 个数选择器（可修改）
                pageSizes2:[5,10],
                // 默认每页显示的条数（可修改）
                PageSize2:10,

                dialogTableVisible: false,
                dialogFormVisible: false,
                dialogFormVisible2: false,
                form: {
                    name: '',
                    id: '',
                    cateid:'',
                    unit:'',
                    catename:''
                },
                //tableData:[],
                relationtable:[]
            };
        },
    }

</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
.kind{
    text-align: left;
}
.demonstration{
    color: #0009ff;
    text-align: left;
}
</style>
