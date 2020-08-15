import request from "@/utils/request";

export function activetask() {
    return request.get('/activetask')
}

export function passivetradeaction(id) {
    return request({
        method: 'GET',
        params: {id:id},
        url:'/passivetradeaction',
    })
}

export function activetradeaction(id) {
    return request({
        method: 'GET',
        params: {id:id},
        url:'/activetradeaction',
    })
}

export function addactivetask(data) {
    return request({
        method: 'POST',
        data: data,
        url:'/addactivetask',
    })
}



