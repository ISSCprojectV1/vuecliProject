import request from '@/utils/request'

  // 获取交易信息 表格查询	
  export function getTansactionData() {
    console.log("发送getTansactionData请求")
    return request({
      url: '/getTansactionData',
      method: 'get',
      param:{t:new Date()}
    })
  }
   // 获取交易信息 传入gexf图谱
   export function getGexfData() {
    console.log("发送getGexfData请求")
    return request({
      url: '/hantina/getAllGexf ',
      method: 'get',
      param:{t:new Date()}
    })
  }