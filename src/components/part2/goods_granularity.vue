<template>
    <div style="width: 100%;height: 800px">
        <h2 class="red"> 商品信息展示与添加 </h2>
        <div>
            <el-cascader class="kind"
                         placeholder="试试搜索：农副产品小麦"
                         :options="options"
                         :props="{ multiple: true }"
                         filterable></el-cascader>
            <el-button type="primary" @click="ok">展示</el-button>
            <el-button type="primary" @click="goTo()">商品品类维护</el-button>
            <el-button type="primary" @click="dialogFormVisible = true">添加新商品</el-button>
            <el-button type="primary" @click="goToprice()">商品历史价格</el-button>
            <el-dialog title="添加新商品" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" label-width="80px"  >
                    <el-form-item label="商品属性">
                        <el-cascader class="kind"
                                     placeholder="试试搜索：农副产品"
                                     :options="options"
                                     :props="{ multiple: true }"
                                     filterable></el-cascader>
                    </el-form-item>
                    <el-form-item label="商品名称">
                        <!--                <el-col :span="5">-->
                        <el-input v-model="form.name"></el-input>
                        <!--                </el-col>-->
                    </el-form-item>
                    <el-form-item label="商品代码">
                        <el-input v-model="form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="商品报价">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品地域">
                        <el-select v-model="form.region" placeholder="请选择区域">
                            <el-option label="北京市" value="110000"></el-option>
                            <el-option label="天津市" value="120000"></el-option>
                            <el-option label="河北省" value="130000"></el-option>
                            <el-option label="山西省" value="140000"></el-option>
                            <el-option label="内蒙古自治区" value="150000"></el-option>
                            <el-option label="辽宁省" value="210000"></el-option>
                            <el-option label="吉林省" value="220000"></el-option>
                            <el-option label="黑龙江省" value="230000"></el-option>
                            <el-option label="上海市" value="310000"></el-option>
                            <el-option label="江苏省" value="320000"></el-option>
                            <el-option label="浙江省" value="330000"></el-option>
                            <el-option label="安徽省" value="340000"></el-option>
                            <el-option label="福建省" value="350000"></el-option>
                            <el-option label="江西省" value="360000"></el-option>
                            <el-option label="山东省" value="370000"></el-option>
                            <el-option label="河南省" value="410000"></el-option>
                            <el-option label="湖北省" value="420000"></el-option>
                            <el-option label="湖南省" value="430000"></el-option>
                            <el-option label="广东省" value="440000"></el-option>
                            <el-option label="广西壮族自治区" value="450000"></el-option>
                            <el-option label="海南省" value="460000"></el-option>
                            <el-option label="四川省" value="510000"></el-option>
                            <el-option label="贵州省" value="520000"></el-option>
                            <el-option label="云南省" value="530000"></el-option>
                            <el-option label="西藏自治区" value="540000"></el-option>
                            <el-option label="重庆市" value="500000"></el-option>
                            <el-option label="陕西省" value="610000"></el-option>
                            <el-option label="甘肃省" value="620000"></el-option>
                            <el-option label="青海省" value="630000"></el-option>
                            <el-option label="宁夏回族自治区" value="640000"></el-option>
                            <el-option label="新疆维吾尔自治区" value="650000"></el-option>
                            <el-option label="香港特别行政区" value="810000"></el-option>
                            <el-option label="澳门特别行政区" value="820000"></el-option>
                            <el-option label="台湾省" value="830000"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="有效时间">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="有效/暂停">
                        <el-switch v-model="form.ok"></el-switch>
                    </el-form-item>
                    <el-form-item label="质量品级">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="特级" name="type"></el-checkbox>
                            <el-checkbox label="一级" name="type"></el-checkbox>
                            <el-checkbox label="二级" name="type"></el-checkbox>
                            <el-checkbox label="三级" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="form.describe"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <h2 class="red">  </h2>
        <div>
            <!-- 任务输入表格区 -->
            <el-table
                    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                    style="width: 100%; height:100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="商品ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="商品地域">
                                <span>{{ props.row.region }}</span>
                            </el-form-item>
                            <el-form-item label="商品属性">
                                <span>{{ props.row.attribute }}</span>
                            </el-form-item>
                            <el-form-item label="上市日期">
                                <span>{{ props.row.launch_date }}</span>
                            </el-form-item>
                            <el-form-item label="下市日期">
                                <span>{{ props.row.delisting_date }}</span>
                            </el-form-item>
                            <el-form-item label="商品报价">
                                <span>{{ props.row.price}}</span>
                            </el-form-item>
                            <el-form-item label="当前状态">
                                <span>{{ props.row.state}}</span>
                            </el-form-item>
                            <el-form-item label="质量品级">
                                <span>{{ props.row.grade}}</span>
                            </el-form-item>
                            <el-form-item label="商品说明">
                                <span>{{ props.row.describe }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                        label="商品ID"
                        prop="id">
                </el-table-column>
                <el-table-column
                        label="商品名称"
                        prop="name">
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
    export default {
        name: 'goods_granularity',
        props: {
            msg: {
                type: String,
                default: ''
            }
        },
        methods: {
                goTo() {
                    //直接跳转
                    this.$router.push('/trade/Multimodal-multigranularity/taskInput');
                },
            goToprice() {
                //直接跳转
                this.$router.push('/trade/Multimodal-multigranularity/priceshow');
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

            },
        data () {
            return {
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
                form: {
                    name: '',
                    id: '',
                    price:'',
                    region: '',
                    date1: '',
                    date2: '',
                    ok: false,
                    type: [],
                    resource: '',
                    describe: ''
                },
                formLabelWidth: '120px',
                options: [{
                    value: '1000',
                    label: '农副产品',
                    children:[{
                        value: '10002',
                        label: '小麦',
                    },{
                        value: '10004',
                        label: '大豆'
                    }]
                },{
                    value: '2000',
                    label: '能源煤炭',
                    children:[{
                        value: '20001',
                        label: '焦炭',
                    },{
                        value: '20002',
                        label: '动力煤'
                    }]
                },{
                    value: '3000',
                    label: '石油化工',
                    children:[{
                        value: '30002',
                        label: '甲醇',
                    },{
                        value: '30004',
                        label: '肥料'
                    }]
                },{
                    value: '4000',
                    label: '钢铁金属',
                    children:[{
                        value: '40001',
                        label: '螺纹钢',
                    },{
                        value: '40004',
                        label: '贵金属'
                    },{
                        value: '40006',
                        label: '有色金属'
                    }]
                }
                ],
                tableData: [{
                    id: '10002S2018', // 商品代码
                    name: '冬小麦2018', // 商品名称
                    region: '河北', //商品地域
                    attribute: '农副产品/小麦', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '1000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自河北品质优良的冬小麦', // 商品说明
                },{
                    id: '10004S2020', // 商品代码
                    name: '大豆', // 商品名称
                    region: '吉林', //商品地域
                    attribute: '农副产品/大豆', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '2000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '二级', // 商品质量品级
                    describe: '产自吉林品质优良的大豆', // 商品说明
                },{
                    id: '20002W2010', // 商品代码
                    name: '动力煤', // 商品名称
                    region: '山西', //商品地域
                    attribute: '能源煤炭/动力煤', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '1000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自山西品质优良的煤炭', // 商品说明
                },{
                    id: '30002A2019', // 商品代码
                    name: '甲醇', // 商品名称
                    region: '江苏', //商品地域
                    attribute: '石油化工/甲醇', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '20000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自江苏品质优良的甲醇', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },{
                    id: '40001S2019', // 商品代码
                    name: '螺纹钢', // 商品名称
                    region: '上海', //商品地域
                    attribute: '钢铁金属/螺纹钢', // 商品属性
                    launch_date: '2018/10/16', // 上市时间
                    delisting_date: '2018/12/16', // 下市时间
                    price: '50000.00', // 商品报价
                    state: '有效', // 当前状态 （有效、暂停）
                    grade: '一级', // 商品质量品级
                    describe: '产自上海品质优良的螺纹钢', // 商品说明
                },
                ]
            }
        }
    }
</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
    .red{
        color: #000000;
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
