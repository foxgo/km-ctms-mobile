import request from '@/utils/request'

export function fetchMap(query) {
  return request({
    url: '/dict/map',
    method: 'get',
    params: query
  })
}

export function fetchList(data) {
  return request({
    url: '/api/Component/getDict',
    method: 'post',
    data
  })
}
