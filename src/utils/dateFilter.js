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

  /* 日期字符串 格式化*/
export function getFormatDate(dateString, fmt) {
    dateString = dateString || ''
    if (dateString === '' || dateString == null || dateString === '0001-01-01T00:00:00') {
      return ''
    }
  
    return formatDate(handleDateString(dateString), fmt)
  }
  
  /* 日期 格式化*/
  export function formatDate(date, fmt) {
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
  
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
  
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
  
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
  
    return fmt
  }
  
  // 处理时间戳以适配safari浏览器
  function handleDateString(str) {
    if (str.indexOf('T') > 0) {
      str = str.split('T')
    }
    else {
      str = str.split(' ')
    }
    var date = new Date()
    var dateArr = str[0].split('-')
    var timeArr = [0, 0, 0]
    if (str.length === 2) {
      timeArr = str[1].split(':')
    }
    date.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2])
    date.setHours(timeArr[0], timeArr[1], timeArr[2], 0)
    return date
  }
  
  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
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