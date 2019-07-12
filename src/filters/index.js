/* eslint-disable no-array-constructor */
// set function parseTime,formatTime to filter
import { parseTime, formatTime } from '@/utils'

/** 拼接时间字符串 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * 多久以前
 * @param {long int || string} time 时间戳
 * @returns {string} 日时分秒的字符串
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/* zhumeng 日期格式转换*/
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  const o = {

    'M+': date.getMonth() + 1,

    'd+': date.getDate(),

    'h+': date.getHours(),

    'm+': date.getMinutes(),

    's+': date.getSeconds()

  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''

      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }

  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/* zhumeng 日期格式转换*/
export function dateFormat(value, fmt) {
  const getDate = new Date(value)
  const o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * 解析时间对象，获取年月日时分秒星期
 * @param {Date||null} current
 */
export function getTime(current) {
  if (!current) {
    current = new Date() // 获取系统当前时间
  }

  const year = this.formatTime(current.getFullYear())
  const month = this.formatTime(current.getMonth() + 1)
  const date = this.formatTime(current.getDate())
  const hours = this.formatTime(current.getHours()) // 时
  const minutes = this.formatTime(current.getMinutes()) // 分
  const seconds = this.formatTime(current.getSeconds()) // 秒
  const day = current.getDay()

  const weekday = {
    '0': '天',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }

  return {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    day: `星期${weekday[day]}`
  }
}

/**
 * 手机号码验证
 * @param {string} phoneString
 */
export function isPhoneNo(phoneString) {
  const reg = /^1[3456789]\d{9}$/
  return reg.test(phoneString)
}

/**
 * 身份证号码验证(不严谨版)
 * @param {string} cardString
 * 校验规则-18位：
 *    1.地址码：长6位，以数字1-9开头，后5位为0-9的数字 `/^[1-9]\d{5}/`
 *    2.年份码：长4位，以数字19或20开头，剩余两位为0-9的数字 `/(19|20)\d{2}/`
 *    3.月份码：长2位，第一位数字为0，第二位数字为1-9或者第一位数字为1，第二位数字为0-2 `/((0[1-9])|(1[0-2]))/`
 *    4.日期码：长2位，第一位数字为0-2，第二位数字为1-9，或者是10，20，30，31 `/(([0-2][1-9])|10|20|30|31)/`
 *    5.顺序码：长3位 `/\d{3}/`
 *    6.校验码：长1位 `/[0-9Xx]/`
 *    表达式：/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
 */
export function isCardNo(cardString) {
  // const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  const reg = /(^\d{15}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/
  return reg.test(cardString)
}

/**
 * 身份证号码验证(严谨版)
 * @param {string} cardString
 * 校验用例18位： 11010519491231002X(true) 110105194902310026(false)
 * 校验用例15位： 320311770706001(true) 320311770706002(true)
 */
export function isCardNoStrict(cardString) {
  // 身份证号长度校验
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(cardString)) {
    return false
  }

  // 15位身份证号转18位身份证号
  var transNo15ToNo18 = function(val) {
    var card18 = ''
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
    var cardTemp = 0
    var i

    card18 = cardString.substr(0, 6) + '19' + cardString.substr(6, cardString.length - 6)
    for (i = 0; i < 17; i++) {
      cardTemp += card18.substr(i, 1) * arrInt[i]
    }
    card18 += arrCh[cardTemp % 11]
    return card18
  }

  // 省级地址码校验
  var checkProvince = function(val) {
    var pattern = /^[1-9][0-9]/
    var provs = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35:' 福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门' }
    if (pattern.test(val)) {
      if (provs[val]) {
        return true
      }
    }
    return false
  }
  // 出生日期码校验
  var checkBirthDate = function(val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
      var year = val.substring(0, 4)
      var month = val.substring(4, 6)
      var date = val.substring(6, 8)
      var date2 = new Date(year + '-' + month + '-' + date)
      if (date2 && date2.getMonth() === (parseInt(month) - 1)) {
        return true
      }
    }
    return false
  }
  // 校验码校验
  var checkCode = function(val) {
    // 加权因子
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var sum = 0
    for (var i = 0; i < 17; i++) {
      sum += val[i] * factor[i]
    }
    // 校验位是X，则表示10
    if (val[17] === 'X' || val[17] === 'x') {
      sum += 10
    } else {
      sum += parseInt(val[17])
    }
    // 如果除11模1，则校验通过
    return sum % 11 === 1
  }

  // 执行检测代码
  const isCard = (function(val) {
    if (val.length === 15) {
      const card18 = transNo15ToNo18(val)
      var date = card18.substring(6, 14)
      if (checkBirthDate(date)) {
        if (checkProvince(card18.substring(0, 2))) {
          return true
        }
      }
      return false
    } else {
      if (checkCode(val)) {
        const date = val.substring(6, 14)
        if (checkBirthDate(date)) {
          if (checkProvince(val.substring(0, 2))) {
            return true
          }
        }
      }
      return false
    }
  })(cardString)

  return isCard
}

/**
 * 限制字符串长度
 * @param {string} val
 * @param {int} length
 */
export function limitStringLength(val, length) {
  if (!!val && val.length > length) { return val.substring(0, length) }
  return val
}
