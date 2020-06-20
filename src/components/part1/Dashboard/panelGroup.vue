<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handlePeople()">
        <div class="card-panel-icon-wrapper icon-people">
             <i class="el-icon-user-solid" slot="reference"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            访问人数
           <el-button type="text" slot="reference"></el-button>
          </div>
          <count-to :start-val="0" :end-val="1210" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
           <i class="el-icon-success" ></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            平台数量
            <el-popover
           placement="bottom"
           title="平台数量详情"
           width="200"
           trigger="manual"
           v-model="visiblePlat">
           <ul class="tips-content">
                  <li>监管机构详情：
                    <a
                      href="跳转链接放在这里"
                      title=""
                      data-original-title="Email:admin@websmallrabbit.com"
                    >跳转链接</a>
                    </li>
                  <li>核心企业详情：
                    <a href="这里放跳转链接" title="http://websmallrabbit.github.io/" target="_blank">跳转链接</a>
                  </li>
                  <li>金融企业详情：
                    <a href="这里放跳转链接" title="http://websmallrabbit.github.io/" target="_blank">跳转链接</a>
                  </li>
                </ul>
            <el-button type="text" slot="reference" icon = "el-icon-caret-bottom" @click="visiblePlat = !visiblePlat"></el-button>
            </el-popover>
            
          </div>
          <count-to :start-val="0" :end-val="310" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <i class="el-icon-warning" ></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            危险平台
            <el-popover
           placement="bottom"
           title="风险平台详情"
           width="200"
           trigger="manual"
           v-model="visibleDanger"
           >
           <ul class="danger-content">
                  <li>风险平台详情：
                    <a
                      href="跳转链接放在这里"
                      title=""
                      data-original-title="Email:admin@websmallrabbit.com"
                    >跳转链接</a>
                    </li>
                  <li>风险数据分析：
                    <a href="这里放跳转链接" title="http://websmallrabbit.github.io/" target="_blank">跳转链接</a>
                  </li>
                </ul>
            <el-button type="text" slot="reference" icon = "el-icon-caret-bottom" @click="visibleDanger = !visibleDanger"></el-button>
            </el-popover>
          </div>
          <count-to :start-val="0" :end-val="15" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="el-icon-s-order" ></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            任务总数
            <el-popover
           placement="bottom"
           title="平台任务详情"
           width="200"
           trigger="manual"
           v-model="visibleTask"
           >
           <ul class="danger-content">
                  <li>xx任务：
                    <a
                      href="跳转链接放在这里"
                      title=""
                      data-original-title="Email:admin@websmallrabbit.com"
                    >跳转链接</a>
                    </li>
                  <li>xx任务：
                    <a href="这里放跳转链接" title="http://websmallrabbit.github.io/" target="_blank">跳转链接</a>
                  </li>
                </ul>
            <el-button type="text" slot="reference" icon = "el-icon-caret-bottom" @click="visibleTask = !visibleTask"></el-button>
            </el-popover>
          </div>
          <count-to :start-val="0" :end-val="320" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  data() {
      return {
        visiblePlat: false,
        visibleDanger:false,
        visibleTask:false
      };
    },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    handlePeople(){
      
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 18px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .el-icon-user-solid,.el-icon-success,.el-icon-warning,.el-icon-s-order{
      float: left;
      font-size: 56px;
    }
  
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
