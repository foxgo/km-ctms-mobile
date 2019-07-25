import request from '@/utils/request'

export function fetchMap(query) {
  return request({
    url: '/dict/map',
    method: 'get',
    params: query
  })
}

export function fetchList(data) {
  const url = `/api/Component?Data.ItemTypes=${data.ids}`
  return request({
    url: url,
    method: 'get',
    data
  })
}
