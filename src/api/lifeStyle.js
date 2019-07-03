import request from '@/utils/request'

export function getSport() {
  return request({
    url: '/api/lifeStyle/getPersonSport',
    method: 'get',
    params: {}
  })
}

export function saveSport(data) {
  return request({
    url: '/api/lifeStyle/savePersonSport',
    method: 'post',
    data
  })
}

export function getEatHabit() {
  return request({
    url: '/api/lifeStyle/getPersonEatHabit',
    method: 'get',
    params: {}
  })
}
export function saveEatHabit(data) {
  return request({
    url: '/api/lifeStyle/savePersonEatHabit',
    method: 'post',
    data
  })
}

export function getSmokeDrink() {
  return request({
    url: '/api/lifeStyle/getPersonSmokeDrink',
    method: 'get',
    params: {}
  })
}
export function saveSmokeDrink(data) {
  return request({
    url: '/api/lifeStyle/savePersonSmokeDrink',
    method: 'post',
    data
  })
}

export function getHealthHistory() {
  return request({
    url: '/api/HealthHistory',
    method: 'get',
    params: {}
  })
}
export function saveHealthHistory(data) {
  return request({
    url: '/api/HealthHistory',
    method: 'post',
    data
  })
}
