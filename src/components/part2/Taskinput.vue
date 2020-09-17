<template>
  <div style="width: 100%;height: 800px">
    <h2 class="red"> 商品品类维护 </h2>
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
      <el-button type="primary" @click="dialogFormVisible = true">添加新品类</el-button>
      <el-dialog title="添加新品类" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form">
          <el-form-item label="品名名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="品名代码">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="品名单位">
            <el-input v-model="form.unit"></el-input>
          </el-form-item>
          <el-form-item label="分类代码">
            <el-input v-model="form.idcate"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    </el-aside>
    <el-container style="height: 800px; border: 10px solid #eee">
      <el-header style="text-align: center">
        <h2>(该商品的名字)</h2>
      </el-header>

      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="name" label="分类代码">
          </el-table-column>
          <el-table-column prop="name" label="分类名称">
          </el-table-column>
          <el-table-column prop="date" label="品名名称">
          </el-table-column>
          <el-table-column prop="name" label="品名代码">
          </el-table-column>
          <el-table-column prop="name" label="品名单位">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Taskinput',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  props: {

  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        id: '',
        idcate:'',
        unit:'',
      },
      formLabelWidth: '120px',
      filterText: '',
      data: [{
        id: 1000,
        label: '农副产品',
        children: [{
          id: 10002,
          label: '小麦',
          children: [{
            id: '10002S2018',
            label: '春小麦'
          }, {
            id: '10002W2019',
            label: '冬小麦'
          }]
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
