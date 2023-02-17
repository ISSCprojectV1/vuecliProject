import request from "@/utils/request"

export function getDetectionOptions() {
    return request.get('/getDetectionOptions');
}

export function getAnomolyList(data) {
    return request({
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        data: data,
        url: '/detection'
    })
}

export function getInstitutes() {
    return request.get('/getInstitutes');
}

export function getGoodsByInstitutes(data) {
    return request.post('/getGoodsByInstitutes', data, { headers: { 'content-type': 'application/json' } })
}

export function getTradersByInstitutes(data) {
    return request.post('/getTradersByInstitutes', data, { headers: { 'content-type': 'application/json' } })
}

export function tradingDetection(data) {
    return request({
        method: 'POST',
        url: '/tradingDetection',
        data: data,
        headers: { 'content-type': 'application/json' },
        timeout: 60 * 60 * 1000,
    }) 
}

export function remoteTrader(data) {
    return request({
        method: 'POST',
        url: '/getTraderById',
        data: data,
        headers: { 'content-type': 'application/json' },
        timeout: 60 * 1000
    })
}



