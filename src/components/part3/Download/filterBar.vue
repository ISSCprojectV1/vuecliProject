<template>
    <div style="margin-top: 1rem; margin-bottom: 1rem">
        <span>已选条件： </span>
        <el-tag
                v-for="tag in tags"
                :key="tag.name"
                closable
                @close="tagClose(tag)"
                style="margin-right: 10px"
                type="info"
                effect="plain"
                >
            {{tag.name}}
        </el-tag>


    </div>

</template>

<script>
    export default {
        name: "filterBar",
        props:["addTab"],
        watch:{
            addTab:function () {
                this.tags.push({name:this.addTab})
            }
        },
        data(){
            return {
                tags:[
                    {
                        name:"钢铁"
                    },
                    {
                        name:"小麦"
                    },
                ]
            }
        },
        methods:
            {
                tagClose(tag){
                    this.tags.splice(this.tags.indexOf(tag), 1);
                    this.$emit("changefilter",this.tags)
                    console.log("filterBar:send")
                }
            }

    }
</script>

<style scoped>

</style>
