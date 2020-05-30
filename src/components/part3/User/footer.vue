<template>
<div>
    <img :src="logo" style="height: 20px;weight:20px">
    东南大学DISC实验室
</div>
</template>

<script>
    import logo from "@/assets/part3/seu.png"
    export default {
        name: "Footer",
        data(){
            return{
                logo:logo
            }
        }
    }
</script>

<style scoped>

</style>
