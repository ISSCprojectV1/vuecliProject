import request from '@/utils/request'

export function getriskHistoryData() {
    console.log("发送getPredictionData请求")
    return request({
        url: '/HMM/price/search',
        method: 'get',
        param: {t: new Date()}
    })
}

export function getriskPredictionData() {
    console.log("发送getPredictionData请求")
    return request({
        url: '/HMM/nextDay/price',
        method: 'get',
        param: {t: new Date()}
    })
}



export function getModeSwitch() {
  console.log("发送ModeSwitch请求")
  return request({
    url: '/getModeSwitch',
    method: 'get',
  })
}

export function getModeSwitchById(id) {
  return request({
    method: 'GET',
    params: {
      taskid: id
    },
    url: '/getModeSwitch',
  })
}

export function getVarDiff() {
    return request({
        url: '/VaR/diff',
        method: 'get',
    })
}

export function getVarVolatility() {
    return request({
        url: '/VaR/volatility',
        method: 'get',
    })
}

export function getVarPredictVol() {
    return request({
        url: '/VaR/predictVol',
        method: 'get',
    })
}

// riskSurveillance start
export function updateRiskInfo(data) {
    return request({
        method: 'POST',
        data: data,
        url: '/monitor/update'
    })
}

export function getRiskInfoByStatus(status) {
    return request({
        method: 'GET',
        url: '/monitor/status/' + status
    })
}
// riskSurveillance end

// risk chart start
export function riskAlarmService() {
    return request({
        method: 'GET',
        url: '/risk/alarm'
    })
}

export function getDataRiskChart(name) {
    return request({
        method: 'GET',
        url: 'risk/name/' + name
    })
}

// 优化前端：
export function getForecastHistoryRisk(name){

    console.log(name)
    return request({
        method: 'GET',
        url: 'risk/forecast/name/'+name
    })
}

// 优化前端：根据状态获取forecast
export function getForecastNewRiskByStatus(status) {
    return request({
        method: 'GET',
        url: 'risk/forecast/status/' + status
    })
}

// 优化前端：获取forecastNewRisk 即状态值为0和1的
export function getAllForecastNewRisk() {
    return request({
        method: 'GET',
        url: 'risk/forecast/allrisk'
    })
}

// 优化前端：修改风险预警等级
export function updateForecastNewRisk(data) {
    return request({
        method: 'POST',
        data: data,
        url: '/risk/forecast/update'
    })
}

// 优化前端：获取风险频率
export function getForecastFrequency(nums) {
    return request({
        method: 'GET',
        url: 'risk/forecast/frequency/'+nums
    })
}




// risk chart end
// riskvolumn start

export function getVolumeAll() {
  return request({
    method: 'GET',
    url: '/volume/all'
  })
}

export function getVolumeInfoByStatus(status) {
  return request({
    method: 'GET',
    url: '/volume/status/' + status
  })
}



export function updateVolumeInfo(data) {

  return request({
    method: 'POST',
    data: data,
    url: '/volume/update'
  })
}


export function getVolumeRiskChart(name) {
  return request({
    method: 'GET',
    url: '/volume/name/' + name
  })
}
// riskvolumn end

// 风险传播
export function getAllPropagation() {
    return request({
        method: 'GET',
        url: 'propagation/getAllPropagation'
    })
}

export function getPropagationByName(name) {
    return request({
        method: 'GET',
        url: 'propagation/getPropagationByName/'+name
    })
}

export function getHistoryPriceByName(name){
    return request({
        method: 'GET',
        url: 'propagation/getHistoryPrice/'+name
    })
}