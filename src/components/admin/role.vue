<template>
  <div>
    <el-button type="primary" @click="dialogFormAddInit" class="button">新增</el-button>
    <el-table
        :data="tableData"
    >
      <el-table-column
          type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="角色编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="角色名称">
              <span>{{ props.row.roleName }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="编号"
          min-width="180"
          prop="id">
      </el-table-column>
      <el-table-column
          label="角色名称"
          min-width="180"
          prop="roleName">
      </el-table-column>
      <el-table-column
          label="操作"
          min-width="180">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click=dialogFormInit(scope.row)>修改
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="新增角色" :visible.sync="dialogFormAddVisible">
      <el-form :model="addRoleForm">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="addRoleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth">
          <el-tree
              :data="data"
              :props="{label:'name', children:'children'}"
              show-checkbox
              @check="handleCheckChange"
              ref="Tree"
              node-key="id"
              default-expand-all
              :check-strictly="true"
          ></el-tree>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddCancel">取 消</el-button>
        <el-button type="primary" @click="dialogFormAddConfirm(addRoleForm)">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="修改角色" :visible.sync="dialogFormUpdateVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" :label-width="formLabelWidth">
          <el-tree
              :data="data"
              :props="{label:'name', children:'children'}"
              show-checkbox
              ref="Tree"
              node-key="id"
              default-expand-all>
            <!--                            @check="handleCheckChange"-->
            <!--                            :check-strictly="true">-->

          </el-tree>
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
  adminAddMenu, adminAddRole,
  adminAddUser,
  adminDeleteRole,
  adminUpdateMenu, adminUpdateRole,
  getmenu,
  getMenuByRoleId,
  getroles
} from "@/api/part3";
import request from "@/utils/request";

export default {
  name: "role",
  data() {
    return {
      dialogFormUpdateVisible: false,
      dialogFormAddVisible: false,
      addRoleForm: {},
      form: {},
      formLabelWidth: '120px',
      tableData: [],
      data: [],
      parentObj: {},
    }
  },
  created() {
    this.init();
    console.log(this.parentObj);
  },
  methods: {
    init() {
      this.getrolesAPI();
      this.getMenuAPI();
    },
    getrolesAPI() {
      getroles().then(res => {
        console.log("请求角色列表api成功");
        console.log(res);
        this.tableData = res.data.roleList;
      }).catch(err => {
        console.log(err);
        console.log("请求角色列表api失败")
      })
    },

    getMenuAPI() {
      getmenu().then(res => {
        console.log("请求菜单列表api成功");
        console.log(res.data);
        this.handleName(res.data);
        console.log(res.data)
        this.data = res.data;
        this.recordParent();

      }).catch(err => {
        console.log(err);
        console.log("请求角色列表api失败")
      })
    },

    //给菜单提取name属性
    handleName(list) {
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          list[i].name = list[i].meta.title
          this.handleName(list[i].children)
        }
      }

    },
    handleMenuIdList(list) {
      let newList = []
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          newList.push(list[i].id);
          let child = this.handleMenuIdList(list[i].children)
          for (let i in child) {
            newList.push(child[i])
          }
        }
      }
      return newList;
    },


    dialogFormAddInit() {
      this.dialogFormAddVisible = true;
      setTimeout(() => {
        this.$refs.Tree.setCheckedKeys([]);
        this.addRoleForm = {};
      },)

    },

    dialogFormAddCancel() {
      this.dialogFormAddVisible = false

    },
    dialogFormAddConfirm(data) {
      this.dialogFormAddVisible = false
      let params = {}
      params.roleName = data.roleName
      params.menu = this.$refs.Tree.getCheckedKeys();
      console.log("检查上传的数据:");
      console.log(params)
      adminAddRole(params).then(res => {

        console.log("角色新增api成功");
        this.$message({
          showClose: true,
          message: '角色新增成功',
          type: 'success'
        });
        this.getrolesAPI();
      }).catch(err => {
        console.log("角色新增api失败");
        this.$message({
          showClose: true,
          message: '角色新增失败',
          type: 'error'
        });

      })
    },


    handleDelete(row) {
      this.$confirm('是否删除角色:' + row.roleName, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        adminDeleteRole(row.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getrolesAPI();
        }).catch(err => {
          console.log(err);
          this.$message({
            type: 'error',
            message: '删除失败!'
          });
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //检查节点选择的合理性
    IsChildNodeChecked(NodeChecked, TreeChecked) {
      if (NodeChecked.children.length > 0) {
        for (let i = 0; i < NodeChecked.children.length; i++) {
          if (TreeChecked.checkedKeys.includes(NodeChecked.children[i].id))
            return false;
          if (!this.IsChildNodeChecked(NodeChecked.children[i], TreeChecked))
            return false;
        }
      }
      return true;
    },

    _recordParent(obj) {
      if (obj.children.length > 0) {
        for (let i = 0; i < obj.children.length; i++) {
          this.parentObj[obj.children[i].id] = obj.id;
          this._recordParent(obj.children[i]);
        }
      }
    },

    ParentNodeChecked(NodeChecked) {
      let i = NodeChecked;
      while (i != 0) {
        console.log(i);
        this.$refs.Tree.setChecked(i, true, false);
        i = this.parentObj[i];
      }
    },


    handleCheckChange(NodeChecked, TreeChecked) {
      // console.log(this.$refs.tree.getCheckedKeys())
      // console.log(data, checked, indeterminate);
      //this.checkErr(TreeChecked);
      console.log(NodeChecked.id)
      console.log(TreeChecked.checkedKeys)
      if (TreeChecked.checkedKeys.includes(NodeChecked.id)) {
        this.ParentNodeChecked(NodeChecked.id);
        console.log("选中")
      } else {
        if (this.IsChildNodeChecked(NodeChecked, TreeChecked))
          console.log("取消正常")
        else {
          this.$refs.Tree.setChecked(NodeChecked.id, true, false)
          this.$message.error('取消失败！当前父节点包含已选子节点');
        }

      }
    },

    dialogFormInit(row) {
      this.dialogFormUpdateVisible = true
      this.form = row
      //this.$refs.tree.setCheckedKeys([3]);
      //let tree = document.getElementById("tree")
      //console.log(this.$refs['tree'])
      setTimeout(() => {
        getMenuByRoleId(row.id).then(res => {
          console.log("获取成功")
          console.log(this.handleMenuIdList(res.data))
          this.$refs.Tree.setCheckedKeys(this.handleMenuIdList(res.data))
        }).catch(err => {
          console.log("获取失败")
          this.$refs.Tree.setCheckedKeys([]);

        })
      },)

    },

    dialogFormUpdateCancel() {
      this.dialogFormUpdateVisible = false;
    },
    dialogFormUpdateConfirm(data) {
      let params = {}
      params.id = data.id
      params.roleName = data.roleName
      params.menu = this.$refs.Tree.getCheckedKeys();
      console.log("检查上传的数据:");
      console.log(params);
      this.dialogFormUpdateVisible = false;
      adminUpdateRole(params).then(res => {
        console.log("角色修改api成功");
        this.$message({
          showClose: true,
          message: '角色修改成功',
          type: 'success'
        });
        this.getrolesAPI();
      }).catch(err => {
        console.log("角色修改api失败");
        this.$message({
          showClose: true,
          message: '角色修改失败',
          type: 'error'
        });
      })
    },
    recordParent() {
      for (let i = 0; i < this.data.length; i++) {
        this.parentObj[this.data[i].id] = 0;
        this._recordParent(this.data[i]);
      }
      console.log(this.parentObj);
    }
  },
}
</script>

<style scoped lang="stylus">
.button
  margin-bottom 10px
</style>
