<template>
<div>
<div class = "task-input-box">
<div class="block">
    <el-carousel width ='1000px' height="700px">
      <el-carousel-item  v-for="item in imagesbox" :key="item.id">
        <h3 class="small">{{ item.id }}</h3>
        <img width ='900px' height="500px" :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>
  </div>
<el-button type="success" @click="postAddress">立即创建</el-button>
<el-button type="info" @click="abortForm">取消创建</el-button>

</div>

</div>
</template>>
<script>

export default {
data() {
    return {
      imagesbox:
      [{id:'新建监管任务',idView:require("@/assets/part1/user_1.png")}, 
       {id:'分配监管任务',idView:require("@/assets/part1/user_4.jpg")},     
      {id:'表格视图',idView:require("@/assets/part1/user_2.jpg")},
      {id:'流程图视图',idView:require("@/assets/part1/user_3.jpg")}]
    }
  },
      created(){
    },
methods:{

}
  }

</script>
<style lang="scss" scoped>

</style>