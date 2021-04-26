<template>
  <div style="width: 100%;height: 800px">
    <div  style="display: inline-block; margin-bottom:30px; margin-right:500px; font-size:40px"><el-button type="primary" @click="backTo()" style="margin-right:400px">返回上一级</el-button>商品品类维护</div>
  <el-container style="height: 800px; border: 10px solid #eee">

    <el-aside width="300px" style="background-color: rgb(238, 241, 246);border: 10px solid #eee">
      <h2> 商品品类展示 </h2>
      <el-input
              placeholder="输入关键字搜索"
              v-model="filterText">
      </el-input>

    <h2> </h2>
      <el-tree
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              :filter-node-method="filterNode"
              :expand-on-click-node="false"
              :render-content="renderContent"
              ref="tree"
              accordion
              @node-click="handleNodeClick"
              show-checkbox
              @check-change="handleCheckChange">
      </el-tree>
    <div>
      <h2> </h2>
      <el-button type="primary" @click="dialogFormVisible = true" style="margin-left:10px;margin-right:10px">添加品类</el-button>

      <el-dialog title="添加新品类" :visible.sync="dialogFormVisible" width="25%" >
        <el-form ref="form" :model="form" size="mini" label-width="80px">
          <el-form-item label="分类代码">
            <el-input v-model="form.cateid"></el-input>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input v-model="form.catename"></el-input>
          </el-form-item>
          <el-form-item label="品名代码">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="品名名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="品名单位">
            <el-input v-model="form.unit"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onadd()">确认添加</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-button type="primary" @click="dialogFormVisible2 = true"  style="margin-left:10px;margin-right:10px">删除品类</el-button>
      <el-dialog title="删除品类" :visible.sync="dialogFormVisible2" width="25%" >
        <el-form ref="form" :model="deleteform" size="mini" label-width="80px">
          <el-form-item label="品名代码">
            <el-input v-model="deleteform.id" placeholder="输入品名代码进行删除"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ondelete()">确认删除</el-button>
            <el-button @click="dialogFormVisible2 = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <h2> </h2>

    </div>

      <!--<div>
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
                  prop="catename"
                  label="分类名称">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="品名名称">
          </el-table-column>
          <el-table-column
                  prop="unit"
                  label="品名单位">
          </el-table-column>
        </el-table>
      </div>-->
    </el-aside>
    <el-container style="height: 800px; border: 10px solid #eee">


      <el-main>
        <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" :header-cell-style="headcell">
          <el-table-column prop="cateid" label="分类代码">
          </el-table-column>
          <el-table-column prop="catename" label="分类名称">
          </el-table-column>
          <el-table-column prop="id" label="品名代码">
          </el-table-column>
          <el-table-column prop="name" label="品名名称">
          </el-table-column>
          <el-table-column prop="unit" label="品名单位">
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="pageSizes"
                       :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
  import {getcommodityVariety,addcommodityVariety,deletecommodityVariety,updatecommodityVariety} from "@/api/part1/Multimodal-multigranularity";
export default {
  name: 'goods_variety',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  //在这里调用ajax请求方法
  created(){
    this.getData();
    this.getCate();// 获取商品的品类列表
  },
  props: {

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
    doerror(){
      this.$message.error('执行出错！');
    },
    backTo() {
      //直接跳转
      this.$router.push('/trade/Multimodal-multigranularity/goodsgranularity');
    },

    onadd(){//添加新品类
        console.log("发送请求前")
        var data = this.form;
       console.log("发送请求中")
           addcommodityVariety(data).then((res) => {
             this.addok();
           }).catch(function (error) {
                  console.log(error);
                });
       this.getData()
       this.dialogFormVisible= false
    },
    addok() {
      this.$message({
        message: '添加品类成功！',
        type: 'success'
      });
    },

    ondelete(){//根据品名ID删除该品类
      var URL ='/deletecommodityVariety/'+this.deleteform.id;
      console.log("URL:"+URL)
      deletecommodityVariety(URL).then((res) => {
        this.deleteok();
      }).catch(()=>{
        console.log("granularityExecution fail")
      });
      this.getData()
      this.dialogFormVisible2= false
      console.log("删除成功！");
    },

    deleteok() {
      this.$message({
        message: '删除品类成功！',
        type: 'success'
      });
    },

    getCate(){//获取商品的品类列表

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

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    getData(){
      // 获取表格数据
      console.log("获取品类表格数据 步骤一")
      getcommodityVariety().then((res) => {
        this.tableData = res.data;
      }).catch(()=>{
        console.log("taskExecution fail")
      });
    } ,
  },
  data() {
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
      dialogFormVisible2: false,
      form: {
        name: '',
        id: '',
        cateid:'',
        unit:'',
        catename:''
      },
      deleteform: {
        id: '',
      },
      tableData:'',
      formLabelWidth: '120px',
      filterText: '',
      datatest:'',
      data: [{
        id: 1000,
        label: '农副产品',
        children: [{
          id: 10002,
          label: '小麦',
        }]
      }, {
        id: 2000,
        label: '能源煤炭',
        children: [{
          id: 20001,
          label: '焦炭'
        }, {
          id: 20002,
          label: '动力煤'
        }]
      }, {
        id: 3000,
        label: '石油化工',
        children: [{
          id: 30002,
          label: '甲醇'
        }, {
          id: 30004,
          label: '肥料'
        }]
      }, {
        id: 4000,
        label: '钢铁金属',
        children: [{
          id: 40002,
          label: '螺纹钢'
        }, {
          id: 40004,
          label: '贵金属'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
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
</style>
