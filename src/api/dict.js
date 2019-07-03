import request from '@/utils/request'

export function fetchMap(query) {
  return request({
    url: '/api/dict/map',
    method: 'get',
    params: query
  })
}

//首页咨询列表
export function getHomeNewsWithImg(count) {
  return request({
    url: '/api/News/GetHomeNewsWithImg',
    method: 'get',
    params: { 'count':count }
  })
}