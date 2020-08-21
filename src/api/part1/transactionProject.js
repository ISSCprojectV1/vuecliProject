import request from '@/utils/request'
import Axios from 'axios';

    // 获取省份信息 
export function Provinces() {
  console.log("获取getshengshiApi表格数据 步骤二 发送taskQuery请求 ")
    return request({
      url: '/HMM/getShengshi',
      method: 'get'
        })
  }
  // 获取白名单列表  
  export function getAllWhiteApi() {
    console.log("获取getAllWhiteApi表格数据 步骤二 发送getAllWhiteApi请求 ")
      return request({
        url: '/HMM/getAllWhite',
        method: 'get'
          })
    }

      // 获取清管所列表  
  export function getAllQingApi() {
    console.log("获取getAllQing表格数据 步骤二 发送getAllQing请求 ")
      return request({
        url: '/HMM/getAllQing',
        method: 'get'
          })
    }

    // 获得任务流程图
    export function getTaskApi() {
      console.log("获取getTaskApi数据")
        return request({
          url: '/task',
          method: 'get'
            })
      }

      // 获得任务分解图
    export function getTaskDecompositionApi() {
      console.log("获取getTaskDecompositionApi数据")
        return request({
          url: '/taskDecomposition',
          method: 'get'
            })
      }

// 获得分解任务
export function postTaskDecompositionApi(data) {
  console.log("发送postTaskDecompositionApi请求")
    return request({
      url: '/taskDecompositionInput',
      method: 'post',
      data
        })
  }
// 获得联盟图
export function getbendiApi() {
  console.log("发送getbendiApi请求")
    return request({
      url: '/hantina/getbendi',
      method: 'get'
        })
  }