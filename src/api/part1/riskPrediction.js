import request from '@/utils/request'

export function getriskHistoryData() {
  console.log("发送getPredictionData请求")
    return request({
      url: '/HMM/price/search',
      method: 'get',
      param:{t:new Date()}
    })
  }

export function getriskPredictionData() {
    console.log("发送getPredictionData请求")
    return request({
      url: '/HMM/nextDay/price',
      method: 'get',
      param:{t:new Date()}
    })
  }
