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

export function riskAlarmService() {
    return request({
        method: 'GET',
        url: '/risk/alarm'
    })
}