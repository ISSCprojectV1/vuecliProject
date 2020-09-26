
<template>

  <div>
    <div class="title">
      <div style="display: inline-block; margin-bottom:20px;font-size: 30px;" >  多模态多粒度监管与服务模式——主被动模态与空间粒度</div>
    </div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="空间粒度下任务详情" name="table">
      <el-table
          :data="tableData1"

          style="width: 100%">
        <el-table-column
            prop="id"
            label="编号"
            min-width="80">
        </el-table-column>

        <el-table-column
            prop="taskname"
            label="任务名称"
            min-width="80">
        </el-table-column>
        <el-table-column
            prop="orgintasknum"
            label="原任务数量"
            min-width="80">
        </el-table-column>
        <el-table-column
            prop="advicetasknum"
            label="推荐任务数量"
            min-width="100">
        </el-table-column>

        <el-table-column
            prop="orgintasksize"
            label="原空间粒度"
            min-width="180">
        </el-table-column>


        <el-table-column
            prop="advicetasksize"
            label="推荐空间粒度"
            min-width="200">
        </el-table-column>

        <el-table-column
            prop="introduction"
            label="介绍"
            min-width="180">
        </el-table-column>

        <el-table-column
            label="详细信息"
            fixed="right"
            min-width="180">
          <template slot-scope="scope">
            <el-button @click="gotoDetail(scope.row.id)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          ref="pagination"
          style="text-align: center"
          background
          layout="prev, pager, next"
          @current-change = "pageChange"
          :total="total"
      >
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script type="text/javascript">
    import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';
    import {GetSpacetask} from "@/api/part1/acpassTask";

    export default {
        name: "space_granularity",
        data() {
            return {
              activeName:"table",
              tableData1:[],
              Data:[],
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
created() {
  this.Spacetradegroup(1,10);
},


      methods: {
        Spacetradegroup(currentPage,pageSize){
          GetSpacetask  (currentPage,pageSize).then(res=>{
            console.log(res)
            this.tableData1 = res.data.data.reslist
        //    this.handleData(  this.tableData1);
          }).catch(err=>{
            console.log(err);
            console.log("出现错误")

          })

    },         gotoDetail(id){
          this.$router.push(`/trade/acpassTask/activetask/${id}`);
          console.log(id)
        },
        handleData(){
          let cnt=0;
          this.Data=[];

          console.log(this.tableData1.length)
          for(let i=0;i<this.tableData1.length;i++){

            for(let j=0;j<this.tableData1[i].length;j++){
              cnt++;
              this.tableData1[i][j]['group']=i+1;
              this.Data.push(this.tableData1[i][j])
            }
          }
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
