<template>
    <div style="width: 100%;height: 800px">
        <div style="display: inline-block; margin-bottom:30px; font-size:40px">时间与商品粒度优化</div>
        <div>
            <el-input v-model="search" style="width: 300px" placeholder="请输入搜索关键词"></el-input>
            <!--<el-button type="primary" @click="getData()" style="margin-left:10px;margin-right:10px">展示</el-button>-->
            <el-button type="primary" @click="goTotime()" style="margin-left:10px;margin-right:10px">时间粒度优化</el-button>
            <el-button type="primary" @click="goTogoods_relation()" style="margin-left:10px;margin-right:10px">商品粒度优化</el-button>
            <el-button type="primary" @click="goTogoods_variety()" style="margin-left:10px;margin-right:10px">商品品类维护</el-button>
            <el-button type="primary" @click="dialogFormVisible = true" style="margin-left:10px;margin-right:10px">添加新商品</el-button>
            <el-button type="primary" @click="dialogFormVisibledelete = true" style="margin-left:10px;margin-right:10px">删除商品</el-button>
            <el-dialog title="删除商品" :visible.sync="dialogFormVisibledelete" width="25%" >
                <el-form ref="form" :model="deleteform" size="mini" label-width="80px">
                    <el-form-item label="商品代码">
                        <el-input v-model="deleteform.id" placeholder="输入商品代码进行删除"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="ondelete()">确认删除</el-button>
                        <el-button @click="dialogFormVisibledelete = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <el-button type="primary" @click="goToprice()" style="margin-left:10px;margin-right:10px">商品历史价格</el-button>

            <el-dialog title="添加新商品" :visible.sync="dialogFormVisible" width="30%" center>
                <el-form ref="form" :model="form" label-width="80px" size="mini" >
                    <el-form-item label="大类代码">
                        <el-input v-model="form.cateid" ></el-input>
                    </el-form-item>
                    <el-form-item label="大类名称">
                        <el-input v-model="form.catename" ></el-input>
                    </el-form-item>
                    <el-form-item label="品名代码">
                        <el-input v-model="form.varietyid" ></el-input>
                    </el-form-item>
                    <el-form-item label="品名名称">
                        <el-input v-model="form.varietyname" ></el-input>
                    </el-form-item>
                    <el-form-item label="商品代码">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <el-input v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="商品报价">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="报价单位">
                        <el-input v-model="form.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="商品地域" size="width=80px">
                        <el-select v-model="form.region" placeholder="请选择区域">
                            <el-option label="北京市" value="北京市"></el-option>
                            <el-option label="天津市" value="天津市"></el-option>
                            <el-option label="河北省" value="河北省"></el-option>
                            <el-option label="山西省" value="山西省"></el-option>
                            <el-option label="内蒙古自治区" value="内蒙古自治区"></el-option>
                            <el-option label="辽宁省" value="辽宁省"></el-option>
                            <el-option label="吉林省" value="吉林省"></el-option>
                            <el-option label="黑龙江省" value="黑龙江省"></el-option>
                            <el-option label="上海市" value="上海市"></el-option>
                            <el-option label="江苏省" value="江苏省"></el-option>
                            <el-option label="浙江省" value="浙江省"></el-option>
                            <el-option label="安徽省" value="安徽省"></el-option>
                            <el-option label="福建省" value="福建省"></el-option>
                            <el-option label="江西省" value="江西省"></el-option>
                            <el-option label="山东省" value="山东省"></el-option>
                            <el-option label="河南省" value="河南省"></el-option>
                            <el-option label="湖北省" value="湖北省"></el-option>
                            <el-option label="湖南省" value="湖南省"></el-option>
                            <el-option label="广东省" value="广东省"></el-option>
                            <el-option label="广西壮族自治区" value="广西壮族自治区"></el-option>
                            <el-option label="海南省" value="海南省"></el-option>
                            <el-option label="四川省" value="四川省"></el-option>
                            <el-option label="贵州省" value="贵州省"></el-option>
                            <el-option label="云南省" value="云南省"></el-option>
                            <el-option label="西藏自治区" value="西藏自治区"></el-option>
                            <el-option label="重庆市" value="重庆市"></el-option>
                            <el-option label="陕西省" value="陕西省"></el-option>
                            <el-option label="甘肃省" value="甘肃省"></el-option>
                            <el-option label="青海省" value="青海省"></el-option>
                            <el-option label="宁夏回族自治区" value="宁夏回族自治区"></el-option>
                            <el-option label="新疆维吾尔自治区" value="新疆维吾尔自治区"></el-option>
                            <el-option label="香港特别行政区" value="香港特别行政区"></el-option>
                            <el-option label="澳门特别行政区" value="澳门特别行政区"></el-option>
                            <el-option label="台湾省" value="台湾省"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有效时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.launchdate" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.delistingdate" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="暂停/有效" active-value="有效" inactive-value="暂停">
                        <el-switch v-model="form.state"></el-switch>
                    </el-form-item>
                    <el-form-item label="质量品级">
                        <el-select v-model="form.grade">
                            <el-option label="一级" value="一级"></el-option>
                            <el-option label="二级" value="二级"></el-option>
                            <el-option label="三级" value="三级"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="form.descri"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit()">提交</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <h2 class="red">  </h2>
        <div>
            <!-- 任务输入表格区 -->
            <el-table
                    :data="tables.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                    style="width: 100%; height:100%">
                <el-table-column type="expand">
                    <template slot-scope="props"  >
                        <el-form label-position="left" inline class="demo-table-expand" >
                            <el-form-item label="商品ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="商品地域">
                                <span>{{ props.row.region }}</span>
                            </el-form-item>
                            <el-form-item label="商品大类">
                                <span>{{ props.row.catename }}</span>
                            </el-form-item>
                            <el-form-item label="商品品名">
                                <span>{{ props.row.varietyname }}</span>
                            </el-form-item>
                            <el-form-item label="上市日期">
                                <span>{{ props.row.launchdate }}</span>
                            </el-form-item>
                            <el-form-item label="下市日期">
                                <span>{{ props.row.delistingdate }}</span>
                            </el-form-item>
                            <el-form-item label="商品报价">
                                <span>{{ props.row.price}}</span>
                            </el-form-item>
                            <el-form-item label="报价单位">
                                <span>{{ props.row.unit}}</span>
                            </el-form-item>
                            <el-form-item label="当前状态">
                                <span>{{ props.row.state}}</span>
                            </el-form-item>
                            <el-form-item label="质量品级">
                                <span>{{ props.row.grade}}</span>
                            </el-form-item>
                            <el-form-item label="商品说明">
                                <span>{{ props.row.descri }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
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
                        label="商品地域"
                        prop="region">
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
    </div>
</template>

<script>
    import {getcommodityInfomation,addcommodityInfomation,deletecommodityInfomation} from "@/api/part1/Multimodal-multigranularity";
    export default {
        name: 'goods_granularity',
        props: {
            msg: {
                type: String,
                default: ''
            }
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
            }
        },
        //在这里调用ajax请求方法
        created(){
            this.getData();
        },
        methods: {
            getData(){
                // 获取表格数据
                console.log("获取modalityQuery表格数据 步骤一")
                var dataConvert = [];
                getcommodityInfomation().then((res) => {
                    console.log(res)
                    dataConvert = res.data;
                    console.log(" dataConvert的格式长度："+dataConvert.length)
                    for(var i = 0;i<dataConvert.length;i++){
                        var data = this.timestampToTime(dataConvert[i].delistingdate)
                        dataConvert[i].launchdate = data
                        data = this.timestampToTime(dataConvert[i].launchdate)
                        dataConvert[i].delistingdate = data
                    }
                    this.dormitory=dataConvert
                }).catch(()=>{
                    console.log("taskExecution fail")
                });
            } ,
            // 转换时间戳
            timestampToTime (cjsj) {
                var date = new Date(cjsj) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
                var D = date.getDate() + ' '
                var h = date.getHours() + ':'
                var m = date.getMinutes() + ':'
                var s = date.getSeconds()
                return Y+M+D+h+m+s
            },
            goTotime() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/time_advise');
            },
            goTogoods_variety() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/goods_variety');
            },
            goToprice() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/priceshow');
            },
            goTogoods_relation(){
                this.$router.push('/trade/Multimodal-multigranularity/goods_relation');
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

            //向数据库中添加商品
            onSubmit(){
                console.log("launchdate时间:  "+ this.form.launchdate +"delistingdate时间:   " + this.form.delistingdate)
                var launchdate = new Date(this.form.launchdate).getDate();
                var delistingdate = new Date(this.form.delistingdate).getDate();
                console.log("转换过后：launchdate时间:  "+ launchdate +"delistingdate时间:   " + delistingdate)
                var data = this.form;
                addcommodityInfomation(data).then((res) =>  {
                    console.log("添加商品成功！")
                    this.addok();
                }).catch(function (error) {
                    console.log(error);
                });
                this.dialogFormVisible= false
                this.getData()
            },

            addok() {
                this.$message({
                    message: '添加商品成功！',
                    type: 'success'
                });
            },

            ondelete(){//根据品名ID删除该品类
                var URL ='/deletecommodityInfomation/'+this.deleteform.id;
                console.log("URL:"+URL)
                deletecommodityInfomation(URL).then((res) => {
                    this.deleteok();
                }).catch(()=>{
                    console.log(" fail")
                });
                this.getData()
                this.dialogFormVisibledelete= false
                console.log("删除成功！");
            },

            deleteok() {
                this.$message({
                    message: '删除商品成功！',
                    type: 'success'
                });
            },


            },
        data () {
            return {
                dormitory: [],
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
                dialogFormVisibledelete: false,
                form: {
                    id: '',
                    name: '',
                    cateid:'',
                    catename:'',
                    varietyid:'',
                    varietyname:'',
                    unit:'',
                    region: '',
                    price:'',
                    launchdate: '',
                    delistingdate: '',
                    state: '',
                    grade: '',
                    descri: ''
                },
                deleteform: {
                    id: '',
                },
                formLabelWidth: '120px',
                search: '',
                tableData: []
            }
        }
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
    .red{
        color: #4444ff;
        text-align:center;
        style:"width: 100%; height:100%"
    }
    .demo-table-expand {
        font-size: 0;
        width: 100%;
        height: 100%;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
        height: 100%;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
        height: 100%;
    }
</style>
