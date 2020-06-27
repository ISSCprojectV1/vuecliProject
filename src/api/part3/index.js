import request from '@/utils/request'
import qs from 'qs';



export function register(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/register',
    })
}

export function login(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/login',
    })
}

export function getuserinfo() {
    return request.get('/profile')
}

export function updateuserinfo(data) {
    let param = new URLSearchParams()
    for(let key  in data){
        param.append(key, data[key])
    }
    return request.post('/profile',param)
}

export function getfile(data) {
    let param = new URLSearchParams()
    for(let key  in data){
        param.append(key, data[key])
    }
    return request.post('/getfile',param)
}

export function getfileDetail(id) {
    return request.get('/getfile/'+id);
}

export function updateFile(data) {
    let param = new URLSearchParams()
    for(let key  in data){
        param.append(key, data[key])
    }
    return request.post('/updatefile',param)
}

export function buyData(id) {
    return request.get('/buydata/'+id);
}

export function getGroup() {
    return request.get("/group");
}

export function  getGrades() {
    return request.get('/grades/')
}

export function getSubjects() {
    return request.get('/subjects/')
}

export function getTutorList(params) {
    return request.get('/tutor-profiles/', { params })
}

export function mocktest() {
    return request.get('/mocktest/')
}

