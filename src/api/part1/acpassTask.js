import request from "@/utils/request";

export function activetask(currentPage, pageSize) {
    return request.get('/activetask?' + "currentPage=" + currentPage + "&pageSize=" + pageSize)
}

export function passivetradeaction(id, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            id: id,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/passivetradeaction',
    })
}

export function GetSpacetask(currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/spacetask',
    })
}

export function Louvainresult(id, limit) {
    return request({
        method: 'GET',
        params: {
            id: id,
            limit: limit
        },
        url: '/louvainresult',
    })
}

export function activetradeaction(id) {
    return request({
        method: 'GET',
        params: {id: id},
        url: '/activetradeaction',
    })
}

export function addactivetask(data) {
    return request({
        method: 'POST',
        data: data,
        url: '/addactivetask',
    })
}


export function activetradegroup(id, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            taskid: id,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/activetradegroup',
    })
}

export function activetaskgraph(id, limit) {
    return request({
        method: 'GET',
        params: {
            id: id,
            limit: limit
        },
        url: '/activetaskgraph',
    })
}

export function activetradedetailinfo(id, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            groupid: id,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/activetradedetailinfo',
    })
}

export function activetradegraph(id) {
    return request({
        method: 'GET',
        params: {id: id},
        url: '/activetradegraph',
    })
}

export function activegraph(company) {
    return request({
        method: 'GET',
        params: {
            company: company
        },
        url: '/activegraph'
    })
}

export function getAct(category, platform) {
    return request({
        method: 'GET',
        params: {
            category: category,
            platform: platform
        },
        url: '/getAct/'
    })
}

export function getActiveGroup(taskId, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            taskid: taskId,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getActiveGroup/'
    })
}

export function getActiveCompanyDetail(company, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            company: company,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getActiveCompanyDetail/'
    })
}

// start - 主被动模态与空间粒度 - tab - 空间粒度

export function getSpaceGranularity(taskId, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            taskid: taskId,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getSpaceans'
    })
}

export function getSpaceDetail(platform, category, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            platform: platform,
            category: category,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getSpaceDetail'
    })
}

// end - 主被动模态与空间粒度 - tab - 空间粒度

// start - 个人中心 - 明细管理 - 上传明细

export function getUploadDetail(currentPage, pageSize) {
    return request({
        method: 'GET',
        url: '/uploadDetails/' + currentPage + '/' + pageSize
    })
}

// end - 个人中心 - 明细管理 - 上传明细