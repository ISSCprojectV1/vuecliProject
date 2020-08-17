import request from '@/utils/request'
import Axios from 'axios';

// 新建任务
export function taskInput(data) {
  console.log("发送taskInput请求")
    return request({
      url: '/task',
      method: 'post',
      data
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