<template>
    <div>
        favs
    </div>
</template>

<script>
    export default {
        name: "mainFavs",
        data(){
            return {
                tabName:"favs",
                tableData:[
                    {
                        data:1
                    },
                    {
                        data:2
                    }
                ]

            }
        },
        created(){
            this.$emit("label","favs")
        }
    }
</script>

<style scoped>

</style>
