<template>
  <div>
    <el-row>
      <!--lg: laptop at 150%-->
      <el-col :xs="14" :sm="15" :md="16" :lg="18" :xl="18">
        <el-menu :router="true" class="el-menu" mode="horizontal"
                 @select="handleSelect"
                 background-color="#00659B"
                 text-color="#FFFFFF"
                 active-text-color="#ffd04b">
          <el-menu-item index="/trade/Dashboard" style="font-size: 18px;padding: 0">
            <img :src="logoImg" class="userprofile" alt="image" style="width: 45px;height: 45px">
            大宗商品交易市场监管服务模式与资源调配系统（{{ this.role }}）
          </el-menu-item>
        </el-menu>

      </el-col>
      <el-col :xs="10" :sm="9" :md="8" :lg="6" :xl="6">
        <el-menu :router="true"
                 class="el-menu"
                 mode="horizontal"
                 background-color="#00659B"
                 text-color="#FFFFFF"
                 active-text-color="#ffd04b">
          <el-menu-item index="/trade/Dashboard">工作台</el-menu-item>
          <el-menu-item index="/console/index">个人中心</el-menu-item>
          <el-submenu index="/console/index">
            <template slot="title"><img :src="userImg" class="img userprofile" alt="image"></template>
            <el-menu-item index="/console/index">
              个人中心
            </el-menu-item>
            <el-menu-item @click="logOut">
              登出
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import logoImg from "@/assets/part3/seu.png"
import userprofile from "@/assets/part3/userprofile.jpg"
import {getRole, removeAdminTrue, removeRole, removeToken} from "@/utils/auth"

export default {
  name: "Header",
  data() {
    return {
      logoImg: logoImg,
      userImg: userprofile,
      role: ''
    }
  },
  created() {
    this.role = getRole();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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

<style scoped lang="stylus">
.img {
  height 59px;
  width 50px;
}

.userprofile {
  border-radius: 50%;
  height 20px;
  width 20px;
}


</style>
