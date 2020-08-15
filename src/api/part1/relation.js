import request from "@/utils/request";
import qs from "qs";

export function usersupport(id) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({itemid:id}),
        url:'/usersupport',
    })
}

export function userrelation(id) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({itemid:id}),
        url:'/userrelation',
    })
}

export function tradesimilar(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/tradesimilar',
    })
}
