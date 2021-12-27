
import request from '@/utils/request'

export function getOpinionsWbInformation(URL) {
    console.log("getOpinionsWbInformation")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getOpinionsTbInformation(URL) {
    console.log("getOpinionsTbInformation")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getOpinionsXwInformation(URL) {
    console.log("getOpinionsXwInformation")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getOpinionsLtInformation(URL) {
    console.log("getOpinionsLtInformation")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getWbInformationByKeyWords(URL) {
    console.log("getWbInformationByKeyWords")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getLtInformationByKeyWords(URL) {
    console.log("getLtInformationByKeyWords")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getTbInformationByKeyWords(URL) {
    console.log("getTbInformationByKeyWords")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getXwInformationByKeyWords(URL) {
    console.log("getXwInformationByKeyWords")
    return request({
        url: URL,
        method: 'get'
    })
}

export function createWbForwardInformation(data) {
    console.log("createWbForwardInformation")
    return request({
        url: '/createWbForwardInformation',
        method: 'post',
        data
    })
}

export function getWbForwardInformation() {
    console.log("getWbForwardInformation")
    return request({
        url: '/getWbForwardInformation',
        method: 'get'
    })
}

export function getNetworkFeatures() {
    console.log("getNetworkFeatures")
    return request({
        url: '/getNetworkFeatures',
        method: 'get'
    })
}

export function getNodeFeatures() {
    console.log("getNodeFeatures")
    return request({
        url: '/getNodeFeatures',
        method: 'get'
    })
}

export function getOpinionsRiskLevelInformation() {
    console.log("getOpinionsRiskLevelInformation")
    return request({
        url: '/getOpinionsRiskLevelInformation',
        method: 'get'
    })
}

export function getOpinionsForwardImportantNodes() {
    console.log("getOpinionsForwardImportantNodes")
    return request({
        url: '/getOpinionsForwardImportantNodes',
        method: 'get'
    })
}

export function crawlWbInformation(data) {
    console.log("crawlWbInformation")
    return request({
        url: '/crawlWbInformation',
        method: 'post',
        data
    })
}

export function getSearchStatus() {
    console.log("getSearchStatus")
    return request({
        url: '/getSearchStatus',
        method: 'get'
    })
}

export function getWbUpdateStatus() {
    console.log("getWbUpdateStatus")
    return request({
        url: '/getWbUpdateStatus',
        method: 'get'
    })
}

export function getXwUpdateStatus() {
    console.log("getXwUpdateStatus")
    return request({
        url: '/getXwUpdateStatus',
        method: 'get'
    })
}

export function getTbUpdateStatus() {
    console.log("getTbUpdateStatus")
    return request({
        url: '/getTbUpdateStatus',
        method: 'get'
    })
}

export function getWbNewestInformation() {
    console.log("getWbNewestInformation")
    return request({
        url: '/getWbNewestInformation',
        method: 'get'
    })
}

export function getXwNewestInformation() {
    console.log("getXwNewestInformation")
    return request({
        url: '/getXwNewestInformation',
        method: 'get'
    })
}

export function getTbNewestInformation() {
    console.log("getTbNewestInformation")
    return request({
        url: '/getTbNewestInformation',
        method: 'get'
    })
}

export function getExchangeNameData() {
    console.log("getExchangeNameData")
    return request({
        url: '/getExchangeNameData',
        method: 'get'
    })
}


export function getWbWordsCloudData(URL) {
    console.log("getWbWordsCloudData")
    return request({
        url: URL,
        method: 'get'
    })
}
export function getTbWordsCloudData(URL) {
    console.log("getTbWordsCloudData")
    return request({
        url: URL,
        method: 'get'
    })
}
export function getXwWordsCloudData(URL) {
    console.log("getXwWordsCloudData")
    return request({
        url: URL,
        method: 'get'
    })
}
export function getLtWordsCloudData(URL) {
    console.log("getLtWordsCloudData")
    return request({
        url: URL,
        method: 'get'
    })
}

export function getNetworkPath() {
    console.log("getNetworkPath")
    return request({
        url:'/getNetworkPath',
        method: 'get'
    })
}
