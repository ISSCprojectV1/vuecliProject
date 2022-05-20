import request from '@/utils/request'

//根据日期获取微博舆情数据
export function getWbInformationByDate(URL) {
    console.log("根据日期获取微博舆情数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

//根据日期获取微博舆情折线图数据
export function getWbLineGraphData(URL) {
    console.log("获取微博折线图数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

//根据日期获取微博舆情词云数据
export function getWbWordCloudData(URL) {
    console.log("获取微博词云数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

//根据日期获取桑基图数据
export function getWbSankeyGraphData(URL) {
    console.log("获取微博桑基图数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

//获取恶意用户详情
export function getMaliciousUserDetails(URL) {
    console.log("获取恶意用户详情:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}