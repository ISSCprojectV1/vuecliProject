<template>
  <div>
  <h2 class="red"> 任务属性 {{msg}}</h2>
  <div>
  <!-- 任务输入表格区 -->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" height: 800px>
            <el-form-item label="任务ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="任务名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="任务优先级">
              <span>{{ props.row.priority }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.gmt_create }}</span>
            </el-form-item>
            <el-form-item label="修改时间">
              <span>{{ props.row.gmt_modified }}</span>
            </el-form-item>
            <el-form-item label="商品信息">
              <span>{{ props.row.commodity_id }}</span>
            </el-form-item>
            <el-form-item label="监管目标">
              <span>{{ props.row.target_id }}</span>
            </el-form-item>
            <el-form-item label="起始时间">
              <span>{{ props.row.start_time }}</span>
            </el-form-item>
            <el-form-item label="结束时间">
              <span>{{ props.row.end_time }}</span>
            </el-form-item>
            <el-form-item label="人模态分配">
              <span>{{ props.row.human_use }}</span>
            </el-form-item>
            <el-form-item label="机器模态分配数">
              <span>{{ props.row.agent_num }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="任务ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="任务名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="任务优先级"
        prop="priority">
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Taskinput',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  methods: {

  },
  data () {
    return {
      tableData: [{
        id: '10001', // 任务代码
        name: '检测山西煤炭持仓量', // 任务名称
        priority: '1', // 任务优先级，越高资源分配比例越高，后期可以设置算法求得
        gmt_create: '2020/4/16 10:27:25', // 创建时间
        gmt_modified: '2020/4/16 10:27:25', // 修改时间
        commodity_id: '10002', // 商品信息 对应品种信息表ID（dv_tb_ commodity）
        target_id: '0001', // 监管目标,对应品种属性关联表ID（dv_tb_ target）
        start_time: '2020/4/16 10:27:25', // 起始时间
        end_time: '2020/4/16 10:27:35', // 结束时间
        human_use: 'True', // 是否由人来执行任务
        agent_num: '5' // 机器模态分配数
      },
      {
        id: '10002', // 任务代码
        name: '检测浙江煤炭持仓量', // 任务名称
        priority: '2', // 任务优先级，越高资源分配比例越高，后期可以设置算法求得
        gmt_create: '2020/4/16 10:27:25', // 创建时间
        gmt_modified: '2020/4/16 10:27:25', // 修改时间
        commodity_id: '10002', // 商品信息 对应品种信息表ID（dv_tb_ commodity）
        target_id: '0001', // 监管目标,对应品种属性关联表ID（dv_tb_ target）
        start_time: '2020/4/16 10:27:25', // 起始时间
        end_time: '2020/4/16 10:27:35', // 结束时间
        human_use: 'True', // 是否由人来执行任务
        agent_num: '5' // 机器模态分配数
      },
      {
        id: '10003', // 任务代码
        name: '检测山东煤炭持仓量', // 任务名称
        priority: '3', // 任务优先级，越高资源分配比例越高，后期可以设置算法求得
        gmt_create: '2020/4/16 10:27:25', // 创建时间
        gmt_modified: '2020/4/16 10:27:25', // 修改时间
        commodity_id: '10002', // 商品信息 对应品种信息表ID（dv_tb_ commodity）
        target_id: '0001', // 监管目标,对应品种属性关联表ID（dv_tb_ target）
        start_time: '2020/4/16 10:27:25', // 起始时间
        end_time: '2020/4/16 10:27:35', // 结束时间
        human_use: 'True', // 是否由人来执行任务
        agent_num: '5' // 机器模态分配数
      },
      {
        id: '10004', // 任务代码
        name: '检测江苏煤炭持仓量', // 任务名称
        priority: '4', // 任务优先级，越高资源分配比例越高，后期可以设置算法求得
        gmt_create: '2020/4/16 10:27:25', // 创建时间
        gmt_modified: '2020/4/16 10:27:25', // 修改时间
        commodity_id: '10002', // 商品信息 对应品种信息表ID（dv_tb_ commodity）
        target_id: '0001', // 监管目标,对应品种属性关联表ID（dv_tb_ target）
        start_time: '2020/4/16 10:27:25', // 起始时间
        end_time: '2020/4/16 10:27:35', // 结束时间
        human_use: 'True', // 是否由人来执行任务
        agent_num: '5' // 机器模态分配数
      }
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
  
  }
.demo-table-expand {
  font-size: 0;
   width: 100%;
  height: 800px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
