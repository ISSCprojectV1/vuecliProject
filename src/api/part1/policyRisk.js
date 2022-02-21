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

export function getIndustryPolicyDetail(id) {
    return request({
        method: 'GET',
        params: {
            id: id
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