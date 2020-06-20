<template>
    <div style="width: 100%;height: 800px">
        <h2> 空间粒度 </h2>
        <div class="three">
            <span class="imp">监控区域选择   </span>
            <el-cascader
                    size="large"
                    class="long"
                    :options="regionDataPlus"
                    v-model="selectedOptions4"
                    @change="handleChange">
            </el-cascader>
            <i class="el-icon-right"></i>
            <el-button class="btn1" type="primary" round>提交</el-button>
        </div>
        <div class="bind">
            <div>绑定值：{{selectedOptions4}}</div>
            <div>区域码转汉字：{{CodeToText[selectedOptions4[0]]}},{{CodeToText[selectedOptions4[1]]}},{{CodeToText[selectedOptions4[2]]}}</div>
            <div>汉字转区域码：{{convertTextToCode(CodeToText[selectedOptions4[0]], CodeToText[selectedOptions4[1]], CodeToText[selectedOptions4[2]])}}</div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';

    export default {
        name: "space_granularity",
        data() {
            return {
                CodeToText,
                TextToCode,
                BeiJing: CodeToText["110000"],
                provinceAndCityData,
                provinceAndCityDataPlus,
                regionData,
                regionDataPlus,
                selectedOptions4: ["110000", "110100", ""]
            };
        },

        methods: {
            handleChange(value) {
                console.log(value);
            },
            convertTextToCode(provinceText, cityText, regionText) {
                let code = "";
                if (provinceText && this.TextToCode[provinceText]) {
                    const province = this.TextToCode[provinceText];
                    code += province.code + ", ";
                    if (cityText && province[cityText]) {
                        const city = province[cityText];
                        code += city.code + ", ";
                        if (regionText && city[regionText]) {
                            code += city[regionText].code;
                        }
                    }
                }
                return code;
            }
        },

        mounted() {
            console.log(this.TextToCode["北京市"].code);
            console.log(this.TextToCode["北京市"]["市辖区"].code);
            console.log(this.TextToCode["北京市"]["市辖区"]["朝阳区"].code);
        }
    };

</script>

<style scoped>
    .long {
        width: 250px;
    }
    .three {
        text-align:left;
    }
    .bind {
        margin-top: 20px;
        line-height: 40px;
        text-indent: 15px;
        text-align:left;
    }
    .imp {
        color: #409eff;
    }
</style>
