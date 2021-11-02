<template>
  <div id="app">
    <h1 class="t-center">政策-事件日历</h1>
    <vue-event-calendar class="cale" :events="demoEvents" @day-changed="handleDayChanged" @month-changed="handleMonthChanged">
    <template slot-scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item classItem" :key="index">
            <div class="reuse-head">
                <div class="reuse-title">{{index+1}}. {{event.title}}</div>
                <div class="reuse-date">{{event.date}}</div>
                <el-button @click="showDelete(event)" type="warning" round>查看</el-button>
            </div>
            <div class="reuse-foot">
                {{event.desc}}             
            </div>
        </div>
    </template>
    </vue-event-calendar>
  </div>
</template>

<script>
let today = new Date()
export default {
  name: 'app',
  data () {
    return {
      demoEvents: [{
        date: `${today.getFullYear()}/${today.getMonth() + 1}/15`,
        title: 'Title-1',
        desc: 'longlonglong description'
      },{
        date: `${today.getFullYear()}/${today.getMonth() + 1}/24`,
        title: 'Title-2'
      },{
        date: `${today.getFullYear()}/${today.getMonth() === 11 ? 1 : today.getMonth() - 2}/06`,
        title: 'Title-3',
        desc: 'description'
      }]
    }
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
    font-weight: 500;
}
.reuse-date {
    color: #999;
}
.reuse-foot {
  font-size: 18px;
  color: #999;
  padding-top: 8px;
  margin-bottom: 8px;
  border-top: 1px solid #ddd;
}
</style>