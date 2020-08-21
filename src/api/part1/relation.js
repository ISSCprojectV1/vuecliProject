import request from "@/utils/request";
import qs from "qs";

export function usersupport(data) {
    return request({
        method: 'POST',
        data: data,
        url:'/usersupport',
    })
}

export function userrelation(data) {
    return request({
        method: 'POST',
        data: data,
        url:'/userrelation',
    })
}

export function tradesimilar(data) {
    return request({
        method: 'POST',
        data: data,
        url:'/tradesimilar',
    })
}
