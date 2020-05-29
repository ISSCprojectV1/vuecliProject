import request from '@/utils/request'
//import request from "@/utils/request";
//import {myresponseInterceptorservice} from "./utils/request";


export function register(data) {
    let param = new URLSearchParams()
    for(let key  in data){
        param.append(key, data[key])
    }
    return request.post('/register',param)
}

export function login(data) {
    let param = new URLSearchParams()
    for(let key  in data){
        param.append(key, data[key])
    }
    return request.post('/login',param)
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

