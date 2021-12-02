import request from '@/utils/request'
export function getEventCalendar() {
    return request({
        method: 'GET',
        url: '/getEventCalendar',
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

export function getIndustryPolicyDetail(transactionMode) {
    return request({
        method: 'GET',
        params: {
            transactionMode: transactionMode
        },
        url: '/getIndustryPolicyDetail'
    })
}

export function getImpact(platform, currentPage, pageSize) {
    return request({
        method: 'GET',
        params: {
            platform: platform,
            currentPage: currentPage,
            pageSize: pageSize
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