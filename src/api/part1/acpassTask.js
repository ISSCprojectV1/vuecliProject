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



export function activetradegroup(id) {
    return request({
        method: 'GET',
        params: {taskid:id},
        url:'/activetradegroup',
    })
}

export function activetaskgraph(id) {
    return request({
        method: 'GET',
        params: {id:id},
        url:'/activetaskgraph',
    })
}

export function activetradedetailinfo(id) {
    return request({
        method: 'GET',
        params: {groupid:id},
        url:'/activetradedetailinfo',
    })
}

export function activetradegraph(id) {
    return request({
        method: 'GET',
        params: {id:id},
        url:'/activetradegraph',
    })
}
