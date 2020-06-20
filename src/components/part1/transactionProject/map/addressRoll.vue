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
  console.log("发送请求前")
  var URL = 'lips/geocoding/v3/?address='+this.input+'&output=json&ak=RZmkBlXu9cw8fYl09epjMrCoqTuyd3kB';
  console.log("URL:"+URL)
  
  Axios.get(URL)
  .then((response) => {
    console.log("已经发送了请求"+response.data.result.location.lng)

    this.Execution = "x坐标："+response.data.result.location.lng+"y坐标："+response.data.result.location.lat;
  })
  .catch(function (error) {
    console.log(error);
  });
}

}
  }

</script>>