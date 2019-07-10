import request from '@/utils/request'

/**
 * 家庭成员管理相关接口
 */

/** 接口调用流程
 * 1.进入首页
 *     i.调用`km360App.js->getPersonInfo`(康美360的接口)获取`康美360`当前用户信息。
 *       获取信息后缓存信息！！！，用以每次点击按钮调用相关功能时判断用户信息是否完整，不完整都需要跳转到完善信息页面
 *    ii.调用`healthArchives.js->getBasicHealthArchivesInfo`(康美360H5的接口)获取`康美360H5`当前家庭成员的个人基础档案。
 *
 * 2.点击切换成员：
 *     i.调用`getFamilyMemberList`(康美360H5的接口)获取家庭成员列表，弹出成员选择sheet
 *    ii.选中成员后调用`getSwitchFamilyMember`(康美360H5的接口)切换成员
 *   iii.切换成员后调用`healthArchives.js->getBasicHealthArchivesInfo`(康美360H5的接口)获取当前家庭成员的个人基础档案，其中的手机号、生日、地址等需要用到
 *
 */

// 切换家庭成员
export function getSwitchFamilyMember(memberID) {
  return request({
    url: '/api/PersonFamily/SwitchFamilyMember',
    method: 'get',
    params: { memberID }
  })
}

// 获取家庭成员列表
export function getFamilyMemberList() {
  return request({
    method: 'get',
    url: '/api/PersonFamily/GetFamilyMemberList'
  })
}

/**
 * 新建家庭成员
 * @参数 data 新建成员所需数据对象
 * @业务流程 asd
 */
export function createFamilyMember(data) {
  return request({
    url: '/api/Person',
    method: 'post',
    data
  })
}

/** 判断手机号码或者身份证在家庭成员中是否存在
 * AccountType 1-手机号  2-身份证
 * AccountName 手机号或者身份证的值
 */
export function getFamilyMemberIsExists(accountType, accountName) {
  return request({
    method: 'get',
    url: '/api/PersonFamily/ExistsFamilyMember',
    params: { 'AccountType': accountType, 'AccountName': accountName }
  })
}

/** 判断档案是否存在
 * AccountType 1-手机号  2-身份证
 * AccountName 手机号或者身份证的值
 */
export function getFamilyMemberAccountIsExists(accountType, accountName, personID) {
  return request({
    method: 'get',
    url: '/api/Person/ExistsAccount',
    params: { 'AccountType': accountType, 'AccountName': accountName, 'PersonID': personID}
  })
}