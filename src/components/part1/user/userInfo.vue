<template>
<div class = "user-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
        <el-avatar src="userimg"></el-avatar>
        <div>
            <ui>
                <li>
                    <i class="el-icon-user">用户名</i>
                </li>
            </ui>
        </div>

        </el-card>
      </el-col>
    </el-row>
</div>
</template>
<script>
import userImg from "@/assets/part1/userImg.jpg"

  export default {
data() {
      return {
        userimg:userImg,
      };
    },
  }
</script>
<style scoped lang="stylus">
    .image{
        height 100px;
        width 100px;
    }
    .userAccount{
      float: right;
      color:#fff;
    }

</style>