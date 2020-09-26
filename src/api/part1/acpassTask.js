import request from "@/utils/request";

export function activetask(currentPage,pageSize) {
    return request.get('/activetask?'+"currentPage="+currentPage+"&pageSize="+pageSize)
}

export function passivetradeaction(id,currentPage,pageSize) {
    return request({
        method: 'GET',
        params: {
            id:id,
            currentPage:currentPage,
            pageSize:pageSize
        },
        url:'/passivetradeaction',
    })
}
export function GetSpacetask(currentPage,pageSize) {
    return request({
        method: 'GET',
        params: {
            currentPage:currentPage,
            pageSize:pageSize
        },
        url:'/spacetask',
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



export function activetradegroup(id,currentPage,pageSize) {
    return request({
        method: 'GET',
        params: {
            taskid:id,
            currentPage:currentPage,
            pageSize:pageSize
        },
        url:'/activetradegroup',
    })
}

export function activetaskgraph(id,limit) {
    return request({
        method: 'GET',
        params: {
            id:id,
            limit:limit
        },
        url:'/activetaskgraph',
    })
}

export function activetradedetailinfo(id,currentPage,pageSize) {
    return request({
        method: 'GET',
        params: {
            groupid:id,
            currentPage:currentPage,
            pageSize:pageSize
        },
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
