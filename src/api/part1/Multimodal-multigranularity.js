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
    return Axios.get('api/task')
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
  console.log("发送modalityInput_api请求")
    return request({
      url: '/modality',
      method: 'get'
        })
  }

  // 模态任务分配 
export function moAllocation() {
  console.log("moAllocation")
  return Axios.get('api/modalityAllocation')
  }

// 获得元任务列表 
export function taskExecutionQuery() {
  console.log("taskExecutionQuery")
  return Axios.get('api/taskExecution')
  }

 // 根据ID查询元任务 
 export function taskExecutionQueryByid(URL) {
  console.log("taskExecutionQueryByid" + URL)
  return Axios.get(URL)
  }

// 粒度调整执行 
export function granularityExecution_api(URL) {
  console.log("granularityExecution_api" + URL)
  return Axios.get(URL)
  }
