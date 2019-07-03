import request from '@/utils/request'

export function fetchMap(query) {
  return request({
    url: '/api/dict/map',
    method: 'get',
    params: query
  })
}
