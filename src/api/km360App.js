import request from '@/utils/request'

// 首页咨询列表
export function getHomeNewsWithImg(count) {
  return request({
    url: '/api/News/GetHomeNewsWithImg',
    method: 'get',
    is360AppAPI: true,
    count
  })
}

// 获取资讯URL
export function getHomeNewsDetail(newsID) {
  return request({
    url: '/api/News/GetNewsDetail',
    method: 'get',
    is360AppAPI: true,
    'id': newsID
  })
}

// 获取成员信息
export function getPersonInfo() {
  /* -3过期 -2-不合法 -1-异常发生 0-成功 3-错误 */
  return request({
    url: '/api/Patient/Info',
    method: 'get'
  })
}

// 更新成员信息
export function updatePerson(data) {
  return request({
    url: '/person/update',
    method: 'post',
    data
  })
}

// 删除家庭成员
export function deleteperson(id) {
  return request({
    url: '/person/delete/',
    method: 'get',
    params: { id }
  })
}
