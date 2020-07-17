<template>
<div>
<el-input v-model="input" placeholder="需要转换的地址"></el-input>
<el-button @click="postAddress">发送请求</el-button>
<el-table-column type="expand">
        <template>
          <el-form label-position="left" inline class="demo-table-expand">

            <el-form-item label="X Y坐标">
    <el-input type="textarea" v-model="Execution" width="845px" :rows="4"></el-input>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
</div>
</template>>
<script>
import Axios from 'axios';
export default {
data() {
    return {
      input: '',
      Execution:''
    }
  },
methods:{
postAddress(){
  var location = [];
  console.log("请求清管所名单 步骤一：")
Axios.get('moc/HMM/getAllQing')
  .then((response) => {
    console.log("已经发送了 moc/HMM/getAllWhite 请求 步骤一"+response.data.data[0].name);
    for (var i = 0; i<response.data.data.length;i++){
    location[i] = response.data.data[i].name;
    }
      console.log("请求清管所名单 请求结果location："+ location[7])
      console.log("发送 请求百度API 步骤一")
      this.getBaiduApi(location)
  })
  .catch(function (error) {
    console.log(error);
  });
  
},

getBaiduApi(location){
  var result = []
   var xAddress,yAddress=[];
  for (var i = 0;i<location.length;i++){
  var URL = 'lips/geocoding/v3/?address='+location[i]+'&output=json&ak=RZmkBlXu9cw8fYl09epjMrCoqTuyd3kB';
  console.log("地址"+URL)
  Axios.get(URL)
  .then((response) => {
    console.log(URL+"X坐标："+response.data.result.location.lng + "Y坐标" + response.data.result.location.lat)
  })
  .catch(function (error) {
    console.log(error);
  });
  }
}
}
  }

</script>>