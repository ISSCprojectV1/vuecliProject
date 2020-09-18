<template>
  <div id="app">
    <router-view v-if = "isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  /*
  created(){
    if (!this.$store.state.isLogin)
    {
      this.$router.push('/login');
    }
  },
   */
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  components: {
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  },
  computed:{
    grades(){
      return this.$store.state.grades;
    },
    subjects(){
      return this.$store.state.subjects;
    }
  },
}

</script>

<style lang="stylus">
  #app
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    border: 1px solid #dcdfe6;
    text-align: center;
    color: #2c3e50;
    background-color: #f5f6f7;
    position:relative;

  html {
    min-height: 100%;
    _height:100%;
    height:100%;
  }

</style>
