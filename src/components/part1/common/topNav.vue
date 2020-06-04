<template>
    <div>
        <el-row>
            <el-col :span="16">
                <el-menu :router="true" class="el-menu" mode="horizontal">
                    <el-menu-item index="0"><img :src="logoimg" class="img"></el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">数据共享</template>
                        <el-menu-item index="/console/uploadResources">上传数据</el-menu-item>
                        <el-menu-item index="/download">下载数据</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/console">激励机制</el-menu-item>
                    <el-menu-item index="/riskPrediction/riskPrediction">风险评估</el-menu-item>
                </el-menu>

            </el-col>
            <el-col :span="8" >
                <el-menu :router="true" class="el-menu" mode="horizontal">
                    <el-menu-item>
                        <el-row class="demo-autocomplete">
                            <el-col :span="40">
                                <el-autocomplete
                                        class="inline-input"
                                        placeholder="请输入内容"
                                >
                                    <i class="el-icon-search el-input__icon" slot="suffix"></i>
                                </el-autocomplete>
                            </el-col>
                        </el-row>
                    </el-menu-item>

                    <el-submenu index="">
                        <template slot="title"><i class="el-icon-bell"></i><el-badge class="mark" is-dot /></template>
                        <el-menu-item index="2-1">
                            选项1<el-badge class="mark" :value="1" />
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            选项2<el-badge class="mark" :value="12" :max="10" />
                        </el-menu-item>
                        <el-menu-item index="2-3">
                            选项3<el-badge class="mark" :value="1" />
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/userinfo"><img :src="userimg" class="img userprofile"></el-menu-item>
                </el-menu>
            </el-col>
        </el-row>



    </div>
</template>

<script>
    import logoimg from "@/assets/part3/seu.png"
    import userprofile from "@/assets/part3/userprofile.jpg"
    export default {
        name: "Header",
        data() {
            return {
                logoimg: logoimg,
                userimg: userprofile
            }
        }
    }
</script>

<style scoped lang="stylus">
    .img{
        height 40px;
        width 40px;
    }
    .userprofile{
        border-radius:50%;
        height 20px;
        width 20px;
    }


</style>
