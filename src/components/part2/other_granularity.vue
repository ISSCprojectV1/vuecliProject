<template>
    <div style="width: 100%;height: 800px">
        <h2> 其他粒度 </h2>
        <div class="block" style="height:80px;text-align:left">
            <span class="demonstration">选择商品类别</span>
            <i class="el-icon-right"></i>
            <el-cascader class="kind"
                    placeholder="试试搜索：能源化工"
                    :options="options"
                    :props="{ multiple: true }"
                    filterable></el-cascader>
            <i class="el-icon-right"></i>
            <el-button class="btn1" type="primary" round>提交</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "other_granularity",
        data() {
            return {
                options: [{
                    value: 'EnergyChemicalIndustry',
                    label: '能源化工类',
                    children: [{
                        value: 'nengyuanshangpin',
                        label: '能源商品',
                        children: [{
                            value: 'yuanyou',
                            label: '原油'
                        },{
                            value: 'meitan',
                            label: '煤炭'
                        },{
                            value: 'tianranqi',
                            label: '天然气'
                        },{
                            value: 'yehuatianranqi',
                            label: '液化天然气'
                        }, {
                            value: 'other',
                            label: '其他'
                        }]
                    }, {
                        value: 'huagongshangpin',
                        label: '化工商品',
                        children: [{
                            value: 'qiyou',
                            label: '汽油'
                        }, {
                            value: 'chaiyou',
                            label: '柴油'
                        },{
                            value: 'jiaotan',
                            label: '焦炭'
                        },{
                            value: 'suliao',
                            label: '塑料'
                        },{
                            value: 'huaxian',
                            label: '化纤'
                        },{
                            value: 'gongyeyan',
                            label: '工业盐'
                        },{
                            value: 'huafei',
                            label: '化肥'
                        },{
                            value: 'shimo',
                            label: '石墨'
                        },{
                            value: 'runhuayou',
                            label: '润滑油'
                        },{
                            value: 'jiachun',
                            label: '甲醇'
                        },{
                            value: 'other',
                            label: '其他'
                        }]
                    }]
                },
                    {
                    value: 'nonglinyumu',
                    label: '农林渔牧类',
                    children: [
                        {
                        value: 'nongshangpin',
                        label: '农商品',
                        children: [{
                            value: 'xiaomai',
                            label: '小麦'
                        },{
                            value: 'yumi',
                            label: '玉米'
                        },{
                            value: 'dami',
                            label: '大米'
                        },{
                            value: 'dadou',
                            label: '大豆'
                        },{
                            value: 'mianhua',
                            label: '棉花'
                        },{
                            value: 'tang',
                            label: '糖'
                        },{
                            value: 'keke',
                            label: '可可'
                        },{
                            value: 'chaye',
                            label: '茶叶'
                        },{
                            value: 'huasheng',
                            label: '花生'
                        },{
                            value: 'shiyongyou',
                            label: '食用油'
                        },{
                            value: 'xiangjiao',
                            label: '橡胶'
                        },{
                            value: 'yancao',
                            label: '烟草'
                        },{
                            value: 'dasuan',
                            label: '大蒜'
                        },{
                            value: 'pingguo',
                            label: '苹果'
                        },{
                            value: 'lajiao',
                            label: '辣椒'
                        },{
                            value: 'jiulei',
                            label: '酒类'
                        },{
                            value: 'zhongzi',
                            label: '种子'
                        },{
                            value: 'other',
                            label: '其他'
                        }]
                    },
                        {
                        value: 'linchanpin',
                        label: '林产品',
                        children: [{
                            value: 'yuanmu',
                            label: '原木'
                        },{
                            value: 'jumu',
                            label: '锯木'
                        },{
                            value: 'jiaoheban',
                            label: '胶合板'
                        },{
                            value: 'mujiang',
                            label: '木浆'
                        },{
                            value: 'xianweiban',
                            label: '纤维板'
                        },{
                            value: 'zhijiang',
                            label: '纸浆'
                        },{
                            value: 'other',
                            label: '其他'
                        }]
                    },
                        {
                            value: 'chuqinchanpin',
                            label: '畜禽产品',
                            children: [{
                                value: 'niurou',
                                label: '牛肉'
                            },{
                                value: 'yangrou',
                                label: '羊肉'
                            },{
                                value: 'zhurou',
                                label: '猪肉'
                            },{
                                value: 'jirou',
                                label: '鸡肉'
                            },{
                                value: 'jidan',
                                label: '鸡蛋'
                            },{
                                value: 'niunai',
                                label: '牛奶'
                            },{
                                value: 'yangrong',
                                label: '羊绒'
                            },{
                                value: 'yarong',
                                label: '鸭绒'
                            },{
                                value: 'canjian',
                                label: '蚕茧'
                            },{
                                value: 'fengmi',
                                label: '蜂蜜'
                            },{
                                value: 'other',
                                label: '其他'
                            }]
                        },{
                            value: 'yuchanpin',
                            label: '渔产品',
                            children: [{
                                value: 'yulei',
                                label: '鱼类'
                            },{
                                value: 'xialei',
                                label: '虾类'
                            },{
                                value: 'xielei',
                                label: '蟹类'
                            },{
                                value: 'beilei',
                                label: '贝类'
                            },{
                                value: 'other',
                                label: '其他'
                            }]
                        }]
                },
                 {
                    value: 'jinshukuangchanlei',
                    label: '金属矿产类',
                    children: [{
                        value: 'heisejinshushangpin',
                        label: '黑色金属商品',
                        children: [{
                            value: 'gangcai',
                            label: '钢材'
                        },{
                            value: 'shengtie',
                            label: '生铁'
                        },{
                            value: 'tie',
                            label: '铁'
                        },{
                            value: 'meng',
                            label: '锰'
                        },{
                            value: 'ge',
                            label: '铬'
                        },{
                            value: 'other',
                            label: '其他'
                        }]
                    },
                     {
                        value: 'yousejinshu',
                        label: '有色金属',
                        children: [{
                            value: 'tong',
                            label: '铜'
                        }, {
                            value: 'lv',
                            label: '铝'
                        }, {
                            value: 'xin',
                            label: '锌'
                        }, {
                            value: 'nie',
                            label: '镍'
                        }, {
                            value: 'xi',
                            label: '锡'
                        }, {
                            value: 'jia',
                            label: '钾'
                        }, {
                            value: 'na',
                            label: '钠'
                        }, {
                            value: 'mei',
                            label: '镁'
                        }, {
                            value: 'gai',
                            label: '钙'
                        }, {
                            value: 'other',
                            label: '其他'
                        }]
                    },
                        {
                            value: 'feijiujinshushangpin',
                            label: '废旧金属商品',
                            children: [{
                                value: 'feigang',
                                label: '废钢'
                            }, {
                                value: 'feitong',
                                label: '废铜'
                            }, {
                                value: 'feilv',
                                label: '废铝'
                            },{
                                value: 'other',
                                label: '其他'
                            }]
                        },
                        {
                            value: 'kuangchanshangpin',
                            label: '矿产商品',
                            children: [{
                                value: 'tiekuangshi',
                                label: '铁矿石'
                            }, {
                                value: 'xitu',
                                label: '稀土'
                            }, {
                                value: 'shuini',
                                label: '水泥'
                            }, {
                                value: 'boli',
                                label: '玻璃'
                            },{
                                value: 'other',
                                label: '其他'
                            }]
                        }]
                 },
                    {
                    value: 'xiguijinshulei',
                    label: '稀贵金属类',
                    children: [{
                        value: 'xiyoujinshushangpin',
                        label: '稀有金属商品',
                        children:[{
                            value: 'wu',
                            label: '钨'
                        },{
                            value: 'mu',
                            label: '钼'
                        },{
                            value: 'zhe',
                            label: '锗'
                        },{
                            value: 'li',
                            label: '锂'
                        },{
                            value: 'fan',
                            label: '钒'
                        },{
                            value: 'tai',
                            label: '钛'
                        },{
                            value: 'tan',
                            label: '钽'
                        },{
                            value: 'yin',
                            label: '铟'
                        },{
                            value: 'other',
                            label: '其他'
                        }]
                    },
                    {
                        value: 'guijinshushangpin',
                        label: '贵金属商品',
                        children:[{
                            value: 'huangjin',
                            label: '黄金'
                        },{
                            value: 'baiyin',
                            label: '白银'
                        },{
                            value: 'bozujinshu',
                            label: '铂族金属（铂、铑、铱）'
                        },{
                            value: 'li',
                            label: '锂'
                        },{
                            value: 'other',
                            label: '其他'
                        }]
                    }]
                }]
            };
            },
        }

</script>

<style scoped>
    @import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
.kind{
    text-align: left;
}
.demonstration{
    color: #0009ff;
    text-align: left;
}
</style>
