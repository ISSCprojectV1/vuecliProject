import request from '@/utils/request'

export function getTraderById(data) {
    return request.post('/getTraderById', data, { headers: { 'content-type': 'application/json' } })
}