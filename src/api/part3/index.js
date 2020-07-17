import request from '@/utils/request'
import qs from 'qs';

export function login(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/login',
    })
}

export function register(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/register',
    })
}

export function getRouters(UserId) {
    return request.get('getMenusByUserId/'+UserId);
}




export function getroles(){
    return request.get('/admin/getroles');
}

export function getUsers(page,pageSize=10) {
    return request.get('admin/getAllUsers/'+page+'/'+pageSize)
}

export function getmenu(){
    return request.get('/admin/getmenu');
}

export function getMenuByRoleId(id) {
    return request.get('/admin/getmenu/'+id);
}

export function getUserinfoByUserId(id) {
    return request.get('/admin/getuserinfobyuserid/'+id);
}

export function UserchangeRole(data){
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/admin/setuserrole',
    })

}


export function adminUpdateUser(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/admin/updateuser',
    })

}

export function adminAddUser(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url:'/admin/adduser',
    })

}

export function adminDeleteUser(id) {
    return request.get('/admin/deleteuser/'+id);
}



export function adminUpdateMenu(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/admin/updatemenu',
    })

}

export function adminAddMenu(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url:'/admin/addmenu',
    })

}

export function adminDeleteMenu(id) {
    return request.get('/admin/deletemenu/'+id);
}





export function adminAddRole(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/json'  },
        data: data,
        url:'/admin/addrole',
    })

}

export function adminDeleteRole(id) {
    return request.get('/admin/deleterole/'+id);
}

export function adminUpdateRole(data) {
    return request({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url:'/admin/updaterole',
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

