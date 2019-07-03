import request from '@/utils/request'

export function fetchPerson(id) {
  return request({
    url: '/person/detail',
    method: 'get',
    params: { id }
  })
}

export function updatePerson(data) {
  return request({
    url: '/person/update',
    method: 'post',
    data
  })
}
//切换家庭成员
export function getSwitchFamilyMember(memberID) {
  return request({
    method: 'get',
    url: '/api/PersonFamily/SwitchFamilyMember',
    params: { memberID }
  })
}

// export function fetchList(query) {
//   return request({
//     url: '/person/list',
//     method: 'get',
//     params: query
//   })
// }
//
// export function createperson(data) {
//   return request({
//     url: '/person/create',
//     method: 'post',
//     data
//   })
// }
//
//
//
// export function deleteperson(id) {
//   return request({
//     url: '/person/delete/',
//     method: 'get',
//     params: { id }
//   })
// }

