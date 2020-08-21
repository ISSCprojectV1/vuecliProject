import request from "@/utils/request";

export function getAllAuctions(currentPage,pageSize) {
    return request.get('/admin/getAllAuctions/'+currentPage+'/'+pageSize);
}

export function addAuction(data) {
    return request({
        method: 'POST',
        data: data,
        url: '/admin/addAuction',
    })
}
export function updateAuction(data) {
    return request({
        method: 'POST',
        data: data,
        url:'/admin/updateAuction',
    })
}


export function deleteAuction(id) {
    return request.get('/admin/deleteAuction/'+id);
}

export function getAuctions(currentPage,pageSize) {
    return request.get('/getAuctions/'+currentPage+'/'+pageSize);
}

export function getAuction(auctionId) {
    return request.get('/getAuction/'+auctionId);
}

export function doAuction(auctionId,price) {
    return request.get('/doAuction/'+auctionId+'/'+price);
}

export function getAuctionNames() {
    return request.get('/getAuctionNames');
}

export function getAuctionRule() {
    return request.get('/getAuctionRule');
}




