<template>
  <div class="header">
    <div class="header-menu" style="display: flex; align-items: center;">
      <img :src="logo" class="round-img" alt="logo" style="width: 1.8em; height: 1.8em">
      <el-link style="font-size: 1.2em !important; color: white; font-weight: 400" :underline="false"
               @click="goToDashboard">
        大宗商品交易市场监管服务模式与资源调配系统
      </el-link>
    </div>

    <div>
      <el-menu
          :router="true"
          mode="horizontal"
          class="header-menu"
          background-color="#00659B"
          text-color="white"
          active-text-color="#ffd04b">
        <el-menu-item index="/trade/Dashboard">工作台</el-menu-item>
        <el-menu-item index="/console/index">个人中心</el-menu-item>
        <el-submenu index="/console/index">
          <template slot="title">
            <img :src="avatar" class="img round-img" alt="image">
            {{ role }}
          </template>
          <el-menu-item index="/console/index">
            个人中心
          </el-menu-item>
          <el-menu-item @click="logOut">
            退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import logo from "@/assets/part3/seu.png"
import avatar from "@/assets/part3/userprofile.jpg"
import {getRole, removeAdminTrue, removeRole, removeToken} from "@/utils/auth"

export default {
  name: "Header",
  data() {
    return {
      logo: logo,
      avatar: avatar,
      role: ''
    }
  },
  created() {
    let role = getRole();
    switch (role) {
      case 'admin':
        this.role = '管理员';
        break;
      case 'RSS':
        this.role = '监管机构端';
        break;
      case 'TPS':
        this.role = '交易平台端';
        break;
      case 'OMS':
        this.role = '运营管理端';
        break;
      default:
        this.role = '普通用户';
        break;
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push("/trade/Dashboard")
    },
    logOut() {
      removeToken();
      removeAdminTrue();
      removeRole();
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.round-img {
  border-radius: 50%;
  height: 20px;
  width: 20px;
  padding: 0 0.5em;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00659B;
}

.header-menu {
  border: 0;
  color: white;
}
</style>
