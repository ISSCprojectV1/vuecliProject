import request from '@/utils/request'
export function getEventCalendar() {
    return request({
        method: 'GET',
        url: '/getEventCalendar',
    })
}

export function getCommodityList() {
    return request({
        method: 'GET',
        url: '/getCommodityList',
    })
}


export function getMessByName(commodityInnerId) {
    return request({
        method: 'GET',
        params: {
            commodityInnerId: commodityInnerId
        },
        url: '/getMessByName',
    })
}

export function getCommAss(type,commodity) {
    return request({
        method: 'GET',
        params: {
            type: type,
            commodity: commodity
        },
        url: '/getCommAss',
    })
}

export function getGprChn() {
    return request({
        method: 'GET',
        url: '/getGprChn',
    })
}

export function getIndustryPolicy(currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getIndustryPolicy'
    })
}

export function getIndustryPolicyDetail(id) {
    return request({
        method: 'GET',
        params: {
            id: id
        },
        url: '/getIndustryPolicyDetail'
    })
}

export function getImpact(platform) {
    return request({
        method: 'GET',
        params: {
            platform: platform
        },
        url: '/getImpact'
    })
}

export function getImpactDetail(platform) {
    return request({
        method: 'GET',
        params: {
            platform: platform
        },
        url: '/getImpactDetail'
    })
}

export function getAssociated(currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getAssociated'
    })
}

export function getAssociatedDetail(industry, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            industry: industry,
            currentPage: currentPage,
            pageSize: pageSize
        },
        url: '/getAssociatedDetail'
    })
}