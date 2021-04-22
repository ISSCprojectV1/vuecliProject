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