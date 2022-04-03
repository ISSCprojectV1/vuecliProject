import request from '@/utils/request';

export function getEntityCountPerLevel() {
  return request.get('/getEntityCountPerLevel');
}

export function getEntitiesByLevel(level) {
  return request.get('/getEntitiesByLevel?level=' + level);
}

export function getEntityByName(name) {
  return request.get('/getEntityByName?name=' + name);
}
