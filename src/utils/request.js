import Axios from 'axios';

const baseURL = process.env.NODE_ENV === "development" ? "/api" : '/api';

export {baseURL}

const service = Axios.create({
  baseURL: "http://172.16.7.11:18860/regulator-service/resourceAllocation/",
  timeout: 10000,
  //headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
});

// Add a request interceptor
/*
const myrequestInterceptor = service.interceptors.request.use(
    config=>{
        // Do something before request is sent
        config.headers['token'] = '1j3i4a5j6i7a8o';
        return config
    },error => {
        // Do something with request error
        return Promise.reject(error);
    }
);


const myresponseInterceptorservice=service.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export {myrequestInterceptor,myresponseInterceptorservice};



const myrequestInterceptor = service.interceptors.request.use(
    config=>{
        // Do something before request is sent
        return config
    },error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

const myresponseInterceptorservice=service.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export {myrequestInterceptor,myresponseInterceptorservice};
*/
export default service;
