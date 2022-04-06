import request from '@/utils/request';

export function getTxnOnlineById(id) {
  return request.get('/getTxnOnlineById?id=' + id);
}

export function getAllTxnOnlineId() {
  return request.get('/getAllTxnOnlineId');
}

export function getAllPurchasesById(id) {
  return request.get('/getAllPurchasesById?id=' + id);
}

export function getAllSalesById(id) {
  return request.get('/getAllSalesById?id=' + id);
}

export function getTxnOnlineByLevel(level) {
  return request.get('/getTxnOnlineByLevel?level=' + level);
}

export function getTxnOnlineCountPerLevel() {
  return request.get('/getTxnOnlineCountPerLevel');
}

export function calcTxnOnlineRisk() {
  return request.get('/calcTxnOnlineRisk');
}
