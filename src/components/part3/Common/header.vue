<template>
    <div>
        <el-row>
            <el-col :xs="8" :sm="10" :md="12" :lg="14" :xl="16">
                <el-menu :router="true" class="el-menu" mode="horizontal"
                 @select="handleSelect"
                 background-color="#00659B"
                 text-color="#FFFFFF"
                 active-text-color="#ffd04b">
                    <el-menu-item index="/trade/Dashboard" style="font-size: 18px;padding: 0">
                        <img :src="logoimg" class="userprofile" style="width: 45px;height: 45px">
                        大宗商品交易市场监管服务模式与资源调配系统
                    </el-menu-item>

<!--                    <el-submenu index="2">-->
<!--                        <template slot="title">拍卖中心</template>-->
<!--                        <el-menu-item index="/auction">下载数据</el-menu-item>-->
<!--                        <el-menu-item index="/console/uploadResources">上传数据</el-menu-item>-->
<!--                    </el-submenu>-->
                </el-menu>

            </el-col>
            <el-col :xs="16" :sm="14" :md="12" :lg="10" :xl="8">
            <el-menu :router="true"
                     class="el-menu"
                     mode="horizontal"
                     background-color="#00659B"
                     text-color="#FFFFFF"
                     active-text-color="#ffd04b">
<!--                <el-menu-item >-->
<!--                    <el-row class="demo-autocomplete">-->
<!--                        <el-col :span="40">-->
<!--                            <el-autocomplete-->
<!--                                    class="inline-input"-->
<!--                                    placeholder="请输入内容"-->
<!--                            >-->
<!--                                <i class="el-icon-search el-input__icon" slot="suffix"></i>-->
<!--                            </el-autocomplete>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                                </el-menu-item>-->

<!--                <el-submenu index="">-->
<!--                    <template slot="title"><i class="el-icon-bell"></i><el-badge class="mark" is-dot /></template>-->
<!--                    <el-menu-item index="2-1">-->
<!--                        选项1<el-badge class="mark" :value="1" />-->
<!--                    </el-menu-item>-->
<!--                    <el-menu-item index="2-2">-->
<!--                        选项2<el-badge class="mark" :value="12" :max="10" />-->
<!--                    </el-menu-item>-->
<!--                    <el-menu-item index="2-3">-->
<!--                        选项3<el-badge class="mark" :value="1" />-->
<!--                    </el-menu-item>-->
<!--                </el-submenu>-->
              <el-menu-item>
                <el-autocomplete
                    id="search-input"
                    :fetch-suggestions="querySearch"
                    v-model="state"
                    placeholder="请输入模块名称"
                    @select="handleInputSelect"
                    @keyup.enter.native="handleEnter">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="handleEnter"></i>
                </el-autocomplete>
              </el-menu-item>
                <el-menu-item index="/trade/Dashboard">工作台</el-menu-item>
                <el-menu-item index="/console/index">个人中心</el-menu-item>
                <el-menu-item index="/auction">拍卖中心</el-menu-item>
                <el-submenu index="/console/index">
                 <template slot="title"><img :src="userimg" class="img userprofile"></template>
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
    import  logoimg from "@/assets/part3/seu.png"
    import userprofile from "@/assets/part3/userprofile.jpg"
    import {removeToken} from "@/utils/auth"

    export default {
        name: "Header",
        data() {
            return {
                components: [],
                logoimg: logoimg,
                state:'',
                userimg: userprofile
            }
        },
        methods: {
            handleEnter () {
              let results = this.components.filter(this.createFilter(this.state));
              console.log(results);
              if(results.length !== 0) {
                this.$router.push(results[0].index);
                this.state = '';
                return;
              }
              alert("没有找到相关的模块。请尝试重新搜索！");
              this.state = '';
            },
            handleInputSelect(component) {
              this.$router.push(component.index);
              this.state = '';
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logOut(){
                removeToken();
                this.$router.push("/login")
            },
            querySearch(queryString, cb) {
              let components = this.components;
              let results = queryString ? components.filter(this.createFilter(queryString)) : components;
              cb(results);
            },
            createFilter(queryString) {
              return (components) => {
                return (components.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
              }
            },
            loadAll() {
              return [
                {"value":"地图功能","index":"/trade/transactionProject/map"},
                {"value":"联盟形成","index":"/trade/transactionProject/userTaskInput"},
                {"value":"价格波动风险演化", "index":"/trade/riskPrediction/riskPage"},
                {"value":"可用资源展示", "index":"/trade/Multimodal-multigranularity/resourceShow"},
                {"value":"空间粒度", "index":"/trade/Multimodal-multigranularity/spaceGranularity"},
                {"value":"在线与离线模态","index":"/trade/Multimodal-multigranularity/taskQuery"},
                {"value":"人机资源管理","index":"/trade/Multimodal-multigranularity/modalityQuery"},
                {"value":"主动与被动模态","index":"/trade/Multimodal-multigranularity/acpassTask"},
                {"value":"商品类别粒度","index":"/trade/Multimodal-multigranularity/goodsgranularity"},
                {"value":"时间粒度","index":"/trade/Multimodal-multigranularity/time_advise"},
                {"value":"关联查询", "index":"/trade/relationAnalysis/relationQuery"},
                {"value":"交易频次查询", "index":"/trade/relationAnalysis/transactionFrequency"},
                {"value":"数据查询", "index":"/trade/dataFusion/dataquery"}
              ]
            }
        },
        mounted() {
          this.components = this.loadAll();
        }
    }
</script>

<style scoped lang="stylus">
    .img{
        height 59px;
        width 50px;
    }
    .userprofile{
        border-radius:50%;
        height 20px;
        width 20px;
    }


</style>
