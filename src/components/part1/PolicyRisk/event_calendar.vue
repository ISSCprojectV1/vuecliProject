<template>
  <div id="app">
    <h1 class="t-center">政策-事件日历</h1>
    <vue-event-calendar locale= 'ch' class="cale" :events="demoEvents" @day-changed="handleDayChanged" @month-changed="handleMonthChanged">
    <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item classItem" :key="index">
            <div class="reuse-head">
                <div class="reuse-title">{{index+1}}. {{event.title}}</div>
                <div class="reuse-date">{{event.date}}</div>
                <!--el-button @click="showDelete(event)" type="warning" round>查看</el-button-->
            </div>
            <el-link :href ="event.linkplace" class="reuse-foot" target="_blank">
                <i class="el-icon-view el-icon--left"></i>{{event.desc}}             
            </el-link>
        </div>
    </template>
    </vue-event-calendar>
  </div>
</template>

<script>
import {getEventCalendar} from "@/api/part1/policyRisk";
let today = new Date()
export default {
  name: 'app',
  data () {
    return {
      demoData: [],
      demoEvents: []
    }
  },
  created(){
    getEventCalendar().then(res=>{
      console.log(res.data.data)
      this.demoEvents=[];
      this.demoData = res.data.data
      for (let i = 0; i < this.demoData.length; i++){
        let nowday = new Date(Date.parse(this.demoData[i].date));
        let day=`${nowday.getFullYear()}/${nowday.getMonth()+1}/${nowday.getDate()}`;
        this.demoEvents.push({
          date:day,
          title:this.demoData[i].title,
          desc:this.demoData[i].description,
          linkplace:this.demoData[i].linkplace
        })
      }
    }).catch(err=>{
      console.log(err);
      console.log("出现错误")
    })
  },
  methods: {
    handleDayChanged (data) {
      console.log('date-changed', data)
    },
    handleMonthChanged (data) {
      console.log('month-changed', data)
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 30px;
}
h1{
  font-weight: normal;
  margin: 0;
  padding: 0;
}
/deep/ .__vev_calendar-wrapper{
    max-width: 1500px; //可以调大整个
    .events-wrapper{
      .date{
        visibility: hidden;
      }
      .date:after{
        content:'政策-事件';
        visibility: visible;
        display: block;
        margin-block-start: 0.1em;
        margin-block-end: 0.1em;
        text-align: center;
      }
    }
    .cal-wrapper{
      padding: 100px 10px;
      .cal-header{
        &>div{
        line-height: 20px; //调左边白色面板的高度
        }
        .title{
          font-size: 1.4rem;//标题日期字体大小
        }
      }
      .cal-body{
        .weeks{
          font-size: 1.4rem;//星期日期字体大小
          .item{
            line-height: 60px;
          }
        }
        .dates{
          .item{
            .date-num{
              font-size: 1.2rem;//具体日期字体大小
            }
          }
        }
      }
      .date-num{
        line-height: 65px; 
      }
    }  
    .events-wrapper{
      padding: 45px 45px;
      .date{
        font-size: 30px;
      }
    }
}
.t-center{
    font-size: 35px;
    text-align: center;
    margin: 20px;
}
.reuse-head {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.reuse-title {
    font-weight: bolder;
}
.reuse-date {
  font-size: 18px;
  color: #999;
  margin-top: 10px
}
.reuse-foot {
  font-size: 20px;
  padding-top: 8px;
  margin-bottom: 8px;
  color: black;
  border-top: 1px solid #ddd;
}
</style>