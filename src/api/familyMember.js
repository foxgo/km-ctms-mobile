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
 * @业务流程
 *    1.手机号码、身份证号码输入，同步检测输入合法性
 *    2.手机号码、身份证号码输入合法后开始检测手机号和身份证号是否在家庭成员中已经存在 `ExistsFamilyMember`
 *       i.存在该成员：清空输入框
 *      ii.不存在该成员：检测是否存在该手机号和身份证号对应的账号 `ExistsAccount`
 *          a.存在账号：弹出确认框，是否选择合并档案
 *              i."手机号已存在档案，姓名%@，手机号%@保存修改将合并档案！是否确定修改"
 *             ii."身份证号已存在档案，姓名%@，身份证号%@保存修改将合并档案！是否确定修改"
 *          b.不存在账号：正常到下一步骤
 *    3.点击确定新增按钮，提示"身份证号一经保存不可修改，请检查填写正确"('取消'、'保存')，点击保存调用该接口
 *
 * @data {Object}  新建成员所需数据对象
          PersonID: 18082,
          Name: "开发",//姓名
          Gender: "1",//性别1男，2女
          Birthdate: "1977-05-12T00:00:00",//出生日期
          MarriageStatus: "10",//婚姻史
          Height: null,//身体
          Weight: null,//体重
          IMEI: "",//IMEI号
          PersonNo: "510105197705120066",//身份证
          IsLH: false,//是否是乐活app
          Address: {
            PersonAreaID: 67,//ID
            PersonID: 18082,
            ProvinceID: 110000000000,//省份ID
            CityID: 110100000000,//市ID
            CountyID: 110101000000,//三级市ID
            TownID: 110101001000,//镇ID
            DetailedAddress: null,//详细地址
          },
          Phone: "17688715132",//手机号
          NickName: null    //昵称
 */
export function createFamilyMember(data) {
  return request({
    url: '/api/Person',
    method: 'post',
    data
  })
}

/** 判断手机号码或身份证号在家庭成员中是否存在
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

/** 判断手机号码或身份证号的档案是否存在
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
