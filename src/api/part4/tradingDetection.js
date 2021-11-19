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



