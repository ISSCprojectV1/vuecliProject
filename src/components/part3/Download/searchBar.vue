<template>
    <div class="searchBar">
        <el-row>
            <el-col :span="24">
                <div>
                    <ul>
                        <span>分类:</span>
                        <li v-for="item in category" :key="item.name">
                            <el-link @click="addFilter(item)">{{item.name}}</el-link>
                        </li>
                    </ul>

                </div>
            </el-col>
                <el-divider></el-divider>
                <el-col>
                <el-form :inline="true" :model="searchWord" class="demo-form-inline" size="small">
                    <el-form-item label="关键词:">
                        <el-input v-model="searchWord.keyword" class="input el-input"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="small" style="background: #ca0c16;border:#ca0c16">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "searchBar",
        data(){
            return {
                searchWord:{
                    keyword:""
                },
                category:[
                    {
                        name:"全部",
                        url:"/download"
                    },
                    {
                        name:"钢铁",
                        url:"/download"
                    },
                    {
                        name:"棉花",
                        url:"/download"
                    },
                    {
                        name:"小麦",
                        url:"/download"
                    },
                    {
                        name:"玉米",
                        url:"/download"
                    },
                    {
                        name:"猪肉",
                        url:"/download"
                    },


                ]
            }
        },
        methods:{
            onSubmit(){
                console.log("submit")
            },
            addFilter(item){
                this.$emit("addFilter",item.name)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .searchBar
        background-color white
        margin-bottom 10px
        border: 1px solid #DCDFE6
        text-align left
        padding 10px
    li
        display inline-block
        margin-right 10px
    .input
        width: 700px
        background: #f7f8f9;


</style>
