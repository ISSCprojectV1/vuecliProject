import request from '@/utils/request'
import Axios from 'axios';

// 模态力度
export function spaceResult() {
  console.log("spaceResult")
  return request({
    url: '/spaceresult',
    method: 'get',

  })
}
// 新建任务
export function taskInput(data) {
  console.log("发送taskInput请求")
    return request({
      url: '/task',
      method: 'post',
      data
        })
  }

// 获得所有
export function bourseget(data) {
  console.log("发送bourseget请求")
  return request({
    url: '/getAllbourse',
    method: 'get',
  })
}
// 修改状态
export function changeTaskStatus(data) {
  console.log("发送changeTaskStatus请求")
  return request({
    url: '/taskOperateStatus',
    method: 'post',
    data
  })
}
export function teamform() {
    console.log("发送teamform请求")
    return request({
        url: '/yu/coalitonByHungary',
        method: 'get',
    })
}


// 搜索任务
export function searchTask(data) {
  console.log("发送searchTask请求")
    return request({
      url: '/taskQuery',
      method: 'post',
      data
        })
  }
// 搜索任务
export function changetimeadvise() {
  console.log("发送时间粒度请求")
  return request({
    url: '/getTimeadvise',
    method: 'get',
  })
}
  // 分配任务
export function taskAllocation() {
  console.log("发送taskAllocation 请求")
    return request({
      url: '/taskAllocation',
      method: 'get'
        })
  }

    // 获取任务列表
export function taskQuery() {
  console.log("获取taskQuery表格数据 步骤二 发送taskQuery请求 ")
    return request({
      url: '/task',
      method: 'get'
        })
  }
// 添加新模态  api
export function modalityInput_api(data) {
  console.log("发送modalityInput_api请求")
    return request({
      url: '/modality',
      method: 'post',
      data
        })
  }

// 获得模态任务列表
export function modalityQuery() {
  console.log("获取modalityQuery表格数据 步骤二 发送modalityQuery请求 ")
    return request({
      url: '/modality',
      method: 'get'
        })
  }

  // 获得模态任务分配列表
export function moAllocation() {
  console.log("获取moAllocation表格数据 步骤二 发送modalityAllocation请求 ")
    return request({
      url: '/modalityAllocation',
      method: 'get'
        })
  }

// 获得元任务列表
export function ExecutionQuery() {
  console.log("获取taskExecutionQuery表格数据 步骤二 发送taskExecutionQuery请求 ")
    return request({
      url: '/taskExecution',
      method: 'get'
        })
  }

// 元任务查询（BY ID)
export function taskExecutionQueryByid(URL) {
  console.log("获取taskExecutionQueryByid表格数据 步骤二 发送taskExecutionQueryByid请求 ")
    return request({
      url: URL,
      method: 'get'
        })
  }

// 粒度调整执行
export function granularityExecution_api(URL) {
  console.log("获取granularityExecution_api表格数据 步骤二 发送granularityExecution_api请求 ")
    return request({
      url: URL,
      method: 'get'
        })
  }

// 获得商品信息
export function getcommodityInfomation() {
  console.log("获取商品信息表格数据！！！")
  return request({
    url: '/getcommodityInfomation',
    method: 'get'
  })
}

// 添加商品信息
export function addcommodityInfomation(data) {
  console.log("添加商品信息数据！！！")
  return request({
    url: '/addcommodityInfomation',
    method: 'post',
    data
  })
}

// 删除商品
export function deletecommodityInfomation(URL) {
  console.log("删除商品！！！")
  return request({
    url: URL,
    method: 'get'
  })
}

// 获得品类信息
export function getcommodityVariety() {
  console.log("获取品类表格数据！！！")
  return request({
    url: '/getcommodityVariety',
    method: 'get'
  })
}

// 添加新品类
export function addcommodityVariety(data) {
  console.log("添加品类！！！")
  return request({
    url: '/addcommodityVariety',
    method: 'post',
    data
  })
}

// 删除品类
export function deletecommodityVariety(URL) {
  console.log("删除品类！！！")
  return request({
    url: URL,
    method: 'get'
  })
}

// 修改品类
export function updatecommodityVariety(data) {
  console.log("删除品类！！！")
  return request({
    url: '/updatecommodityVariety',
    method: 'put',
    data
  })
}

// 获得商品历史价格信息。
export function getcommodityHistorydayprice() {
  console.log("获取商品历史价格信息表格数据！！！")
  return request({
    url: '/getcommodityHistorydayprice',
    method: 'get'
  })
}

// 根据商品名称 获得商品历史价格信息。
export function getcommodityHistorydaypricebyname(URL) {
  console.log("根据商品名称 获得商品历史价格信息！！！")
  return request({
    url: URL,
    method: 'get'
  })
}

// 获得 商品交易数据集。
export function getcommodityTransaction() {
  console.log("获得 商品交易数据集。！！！")
  return request({
    url: '/getcommodityTransaction',
    method: 'get'
  })
}

// 获得 关联商品数据集。
export function getcommodityRelation() {
  console.log("获得 关联商品数据集！！！")
  return request({
    url: '/getcommodityRelation',
    method: 'get'
  })
}

// 获得 关联商品。
export function getcommodityRelation2() {
  console.log("获得 关联商品数据集！！！")
  return request({
    url: '/getcommodityTransaction2',
    method: 'get'
  })
}
