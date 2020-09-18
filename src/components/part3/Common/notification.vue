<template>
    <div>
        {{notification}}
    </div>
</template>

<script>
    import {getAuctionRule} from "@/api/part3/auction";

    export default {
        name: "notification",
        created(){
            getAuctionRule.then(res=>{
                this.notification = res.data
            }).catch(err=>{
                console.log(err)
            })
        },
      mounted() {
        this.notification+="";
    //  console.log(notification)
          },
      data(){

        }
    }
</script>

<style scoped>

</style>
