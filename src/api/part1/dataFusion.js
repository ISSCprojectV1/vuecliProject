import request from "@/utils/request";


export function getRelevantEntity(name, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            name: name,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getRelevantEntity',
    })
}

export function getRelevantArray() {
    console.log("getRelevantArrayList")
    return request({
        url: '/getRelevantArray',
        method: 'get',
    })
}


export function companydataname(name) {
    return request({
        method: 'GET',
        params: {name:name},
        url:'/companydataname',
    })
}

export function companydatataxnum(name) {
    return request({
        method: 'GET',
        params: {name:name},
        url:'/companydatataxnum',
    })
}


export function multibyname(name) {
    return request({
        method: 'GET',
        params: {name:name},
        url:'/multibyname',
    })
}

export function multidatagraph(name) {
    return request({
        method: 'GET',
        params: {name:name},
        url:'/multidatagraph',
    })
}
