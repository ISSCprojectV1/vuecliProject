<template>
  <div>
    <el-button type="primary" @click="dialogFormAddInit" class="button">新增</el-button>
    <el-table
        ref="userTable"
        :data="tableData"
        highlight-current-row
        @cell-dblclick="handleCelldbClink"
    >
      <el-table-column
          v-for="(value,name,index) in tableData[0]"
          :label=dealWithChinese(name)
          min-width="100"
          :prop=name
          :key=index>
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click=dialogFormUpdateInit(scope.row)>修改
          </el-button>
          <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确定删除该用户吗？"
              @onConfirm="handleDelete(scope.row.id)"
          >
            <el-button size="mini" type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        style="text-align: center"
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="total">
    </el-pagination>

    <el-dialog title="新增用户" :visible.sync="dialogFormAddVisible">
      <el-form :model="addUserform">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addUserform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="addUserform.accountId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addUserform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="addUserform.roleId" clearable placeholder="请选择">
            <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormAddConfirm(addUserform)">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改用户信息" :visible.sync="dialogFormUpdateVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.accountId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="积分" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名声" :label-width="formLabelWidth">
          <el-input v-model="form.reputation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleId" clearable placeholder="请选择">
            <el-option
                v-for="item in roleOptions"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="changeRole(form)" class="button">修改角色</el-button>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormUpdateCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormUpdateConfirm(form)">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import {
  getUsers,
  getroles,
  adminUpdateUser,
  adminAddUser,
  adminDeleteUser,
  getUserinfoByUserId,
  UserchangeRole
} from "@/api/part3";

export default {
  name: "user",


  created() {
    this.init();
  },
  data() {
    return {
      form: {
        id: "",
        accountId: "",
        name: "",
        email: "",
        score: "",
        reputation: "",
        roleId: ""
      },

      dialogFormUpdateVisible: false,
      dialogFormAddVisible: false,
      formLabelWidth: '120px',
      total: 0,//用户总数


      roleOptions: [
        {
          id: 1,
          roleName: '管理员'
        },
        {
          id: 2,
          roleName: '普通用户'
        },
      ],
      tableData: [
        // {
        //     "id": 4,
        //     "accountId": "333",
        //     "password": "8c389b98e0e361813d9a10c373c7738a",
        //     "name": "yyy",
        //     "gmtCreate": 1589860197682,
        //     "gmtModified": 1589860197682,
        //     "score": 1,
        //     "reputation": 0,
        //     "email": null,
        //     "role": 1
        // },
      ],
      addUserform: {
        name: "",
        accountId: "",
        password: "",
        roleId: ""
      }
    }
  },
  methods: {
    dealWithChinese(name)
    {
      if(name=="email"){
        name="邮箱"
      }
      if(name=="id"){
        name="编号"
      }
      if(name=="accountId"){
        name="账号"
      }         if(name=="password"){
      name="密码"
    }         if(name=="id"){
      name="编号"
    }         if(name=="score"){
      name="分数"
    }         if(name=="name"){
      name="用户名"
    }         if(name=="gmtCreate"){
      name="创建时间"
    }
      if(name=="gmtModified"){
        name="修改时间"
      }
      if(name=="reputation"){
        name="信誉"
      }
      return name
      //


    },
    getUsersAPI() {
      getUsers(1).then(res => {
        console.log("请求用户列表api成功")
        console.log(res.data)
        this.tableData = res.data.list
        this.total = res.data.total;
      }).catch(err => {
        console.log(err);
        console.log("请求用户列表api失败")
      });
    },
    getrolesAPI() {
      getroles().then(res => {
        console.log("请求角色列表api成功");
        console.log(res);
        this.roleOptions = res.data.roleList;
      }).catch(err => {
        console.log(err);
        console.log("请求角色列表api失败")
      })
    },
    getUserDetailAPI(id) {
      getUserinfoByUserId(id).then(res => {
        console.log("请求用户详情api成功");
        console.log(res);
        let user = res.data.user
        let role = res.data.role
        this.form.id = user.id
        this.form.accountId = user.accountId
        this.form.name = user.name
        this.form.email = user.email
        this.form.score = user.score
        this.form.reputation = user.reputation
        this.form.roleId = role.id
      }).catch(err => {
        console.log(err);
        console.log("请求用户详情api失败")
      })
    },
    changeRole(form) {

      console.log(form.id)
      console.log(form.roleId)
      let params = {}
      params.userId = form.id
      params.roleId = form.roleId
      UserchangeRole(params).then(res => {
        console.log("角色修改成功");
        this.$message({
          showClose: true,
          message: '角色修改成功',
          type: 'success'
        });
        this.getUsersAPI();//刷新
      }).catch(err => {
        console.log("角色修改失败");
        this.$message({
          showClose: true,
          message: '角色修改失败',
          type: 'error'
        });
      })
    },


    init() {
      this.getUsersAPI();
      this.getrolesAPI();
    },

    handleDelete(id) {
      adminDeleteUser(id).then(res => {
        console.log("用户删除api成功");
        this.$message({
          showClose: true,
          message: '用户删除成功',
          type: 'success'
        });
        this.getUsersAPI();//刷新
      }).catch(err => {
        console.log("用户删除api失败");
        this.$message({
          showClose: true,
          message: '用户删除失败',
          type: 'error'
        });
      })
    },


    handleCelldbClink(row) {
      this.dialogFormUpdateInit(row);
    },


    handleCheckChange(data, checked, indeterminate) {
      console.log(this.$refs.tree.getCheckedKeys())
      console.log(data, checked, indeterminate);
    },
    dialogFormUpdateInit(row) {
      this.dialogFormUpdateVisible = true
      console.log(row)
      this.getUserDetailAPI(row.id)
    },
    dialogFormUpdateCancel() {
      this.dialogFormUpdateVisible = false

    },
    dialogFormUpdateConfirm(data) {
      let params = {}
      params.name = data.name
      params.accountId = data.accountId
      params.email = data.email
      params.score = data.score
      params.reputation = data.reputation

      this.dialogFormUpdateVisible = false
      adminUpdateUser(params).then(res => {
        console.log("用户修改api成功");
        this.$message({
          showClose: true,
          message: '用户信息修改成功',
          type: 'success'
        });
        this.getUsersAPI();
      }).catch(err => {
        console.log("用户修改api失败");
        this.$message({
          showClose: true,
          message: '用户信息修改失败',
          type: 'error'
        });

      })
    },

    dialogFormAddInit() {
      this.dialogFormAddVisible = true;
      this.addUserform = {}
    },
    dialogFormAddCancel() {
      this.dialogFormAddVisible = false

    },
    dialogFormAddConfirm(data) {
      this.dialogFormAddVisible = false
      adminAddUser(data).then(res => {
        console.log("用户新增api成功");
        this.$message({
          showClose: true,
          message: '用户新增成功',
          type: 'success'
        });
        this.getUsersAPI();//页面更新
      }).catch(err => {
        console.log("用户新增api失败");
        this.$message({
          showClose: true,
          message: '用户新增失败',
          type: 'error'
        });

      })
    },


    //换页请求
    pageChange(page) {
      console.log(page)
    },
    // prevClick(page){
    //     console.log("当前页"+page)
    // },
    // nextClick(page){
    //     console.log("当前页"+page)
    // },
  }
}
</script>

<style scoped lang="stylus">
.button
  margin-bottom 10px
</style>
