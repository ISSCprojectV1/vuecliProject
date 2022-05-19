import request from '@/utils/request'

export function getTraderById(data) {
    return request.post('/getTraderById', data, { headers: { 'content-type': 'application/json' } })
}

export function getNetworkNodes() {
    return request.get('/getNetworkNodes', { headers: {'content-type': 'application/json'}})
}

export function getNetworkEdges() {
    return request.get('/getNetworkEdges', {headers: {'content-type': 'application/json'}})
}