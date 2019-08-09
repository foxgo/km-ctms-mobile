import request from '@/utils/request'

// 获取该家庭成员的个人档案和问卷完整度
export function getHealthArchivesInfo(memberId) {
  return request({
    method: 'get',
    url: '/api/Person/GetPersonCompleteInfo',
    params: { 'memberId': memberId }
  })
}

// 判断该家庭成员的个人档案完整度
export function checkMenberNecessaryInfo(personData) {
  if (personData.UserName.length === 0 || parseInt(personData.Sex) === 9 || personData.Birthday.length === 0 || personData.Birthday === '0001-01-01 00:00:00' ) {
    return false
  }
  return true
}

// 上传问题id，获取答案选项栏
export function getQuestionSelections(data) {
  return request({
    method: 'post',
    url: '/api/Component/GetDictionary',
    data
  })
}

// 获取该家庭成员的个人基础信息
export function getBasicHealthArchivesInfo(memberId) {
  return request({
    method: 'get',
    url: '/api/Person/GetPersonInfo',
    params: { 'memberId': memberId }
  })
}
// 上传该家庭成员的个人基础档案
export function postBasicHealthArchivesInfo(data) {
  return request({
    method: 'post',
    url: '/api/Person',
    data
  })
}

// 获取该家庭成员的生活习惯调查问卷填写完整度
export function getLifeHabitsInfo(memberId) {
  return request({
    method: 'get',
    url: '/api/Person/GetLifeComplete',
    params: { 'memberId': memberId }
  })
}

// 获取该家庭成员的饮食习惯
export function getPersonEatHabit(memberId) {
  return request({
    method: 'get',
    url: '/api/LifeStyle/GetPersonEatHabit',
    params: { 'memberId': memberId }
  })
}
// 上传该家庭成员的饮食习惯
export function postPersonEatHabit(data) {
  return request({
    method: 'post',
    url: '/api/LifeStyle/SavePersonEatHabit',
    data
  })
}

// 获取该家庭成员的体力活动和运动信息
export function getPersonSport(memberId) {
  return request({
    method: 'get',
    url: '/api/LifeStyle/GetPersonSport',
    params: { 'memberId': memberId }
  })
}
// 上传该家庭成员的体力活动和运动信息
export function postPersonSport(data) {
  return request({
    method: 'post',
    url: '/api/LifeStyle/SavePersonSport',
    data
  })
}

// 获取该家庭成员的吸烟饮酒信息
export function getPersonSmokeDrink(memberId) {
  return request({
    method: 'get',
    url: '/api/LifeStyle/GetPersonSmokeDrink',
    params: { 'memberId': memberId }
  })
}
// 上传该家庭成员的吸烟饮酒信息
export function postPersonSmokeDrink(data) {
  return request({
    method: 'post',
    url: '/api/LifeStyle/SavePersonSmokeDrink',
    data
  })
}

// 获取该家庭成员的疾病类型
export function getHealthTypes(memberId) {
  return request({
    method: 'get',
    url: '/api/HealthType',
    params: { 'memberId': memberId }
  })
}

// 获取该家庭成员的健康史信息
export function getHealthHistory(memberId) {
  return request({
    method: 'get',
    url: '/api/HealthHistory',
    params: { 'memberId': memberId }
  })
}
// 上传该家庭成员的健康史信息
export function postHealthHistory(data) {
  return request({
    method: 'post',
    url: '/api/HealthHistory',
    data
  })
}
