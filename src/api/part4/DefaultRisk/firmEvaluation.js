import request from '@/utils/request';

export function getIdByName(name) {
  return request.get('/getIdByName?name=' + name);
}

export function getEntityCountPerLevel() {
  return request.get('/getEntityCountPerLevel');
}

export function getEntitiesByLevel(level) {
  return request.get('/getEntitiesByLevel?level=' + level);
}

export function getEntityByName(name) {
  return request.get('/getEntityByName?name=' + name);
}

export function getAllPurchasesById(id) {
  return request.get('/getAllPurchasesById?id=' + id);
}

export function getAllSalesById(id) {
  return request.get('/getAllSalesById?id=' + id);
}
