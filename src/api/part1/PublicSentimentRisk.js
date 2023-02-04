import request from '@/utils/request'

//根据日期获取微博舆情数据
export function getWbInformationByDate(URL) {
    console.log("根据日期获取微博舆情数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

/***
 * 获取舆情总数、重要舆情数
 * @param URL
 * @returns {*}
 */
export function getOpinionsNum(URL) {
    console.log("获取舆情总数和重要舆情数:"+URL)
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

/***
 * 获取词云数据
 * @param URL
 * @returns {*}
 */
export function getWordsCloudData_WB(URL) {
    console.log("获取微博词云数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

/***
 * 获取饼图数据
 * @param URL
 * @returns {*}
 */
export function getPieGraphData_WB(URL) {
    console.log("获取微博饼图数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

/***
 * 获取柱状图数据
 * @param URL
 * @returns {*}
 */
export function getBarGraphData_WB(URL) {
    console.log("获取微博柱状图数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

/***
 * 获取搜索框柱状图数据
 * @param URL
 * @returns {*}
 */
export function getSearchBarGraphData_WB(URL) {
    console.log("获取搜索框柱状图数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

/**
 * 获取详情表格数据
 * @param URL
 * @returns {*}
 */
export function getDetailTableData(URL) {
    console.log("获取详情表格数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

/**
 * 获取搜索框详情表格数据
 * @param URL
 * @returns {*}
 */
export function getSearchTableData(URL) {
    console.log("获取搜索框详情表格数据:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}

/***
 * 获取风险评估数据信息
 * @param URL
 * @returns {*}
 */
export function getRiskAssessmentData(URL) {
    console.log("获取风险评估数据信息:"+URL)
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

//获取风险评估详情
export function getRiskDetails(URL) {
    console.log("获取风险评估详情:"+URL)
    return request({
        url: URL,
        method: 'get'
    })
}