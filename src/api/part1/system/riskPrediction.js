import request from '@/utils/request'

export function getriskHistoryData() {
  console.log("发送getPredictionData请求")
    return request({
      url: '/riskHistoryData',
      method: 'get',
      param:{t:new Date()}
    })
  }

export function getriskPredictionData() {
    console.log("发送getPredictionData请求")
    return request({
      url: '/pridection',
      method: 'get',
      param:{t:new Date()}
    })
  }
