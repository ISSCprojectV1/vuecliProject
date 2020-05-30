<template>
    <div>
        <div>
            <el-button @click=mock>go to mocktest</el-button>
        </div>
        <div v-infinite-scroll="load" style="overflow:scroll ; height:180px ; border: 1px solid #ccc;" >
            <ul class="infinite-list" >
                <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {mocktest} from '@/api/part3'
    export default {
        data () {
            return {
                count:0,
            }
        },
        methods: {
            load () {
                this.count += 2;
            },
            mock(){
                axios.get("https://apiv2.shiguangsenlin.com/mocktest/").then(res=> {
                    console.log(res.data);
                }
                );
                mocktest().then(res=>{
                    console.log(res)
                }).catch(e=>{
                    console.log(e)
                })

    },

        },
    }
</script>

<style scoped>

</style>
