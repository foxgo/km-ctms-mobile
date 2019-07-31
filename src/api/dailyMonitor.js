import request from '@/utils/request'

export function getBloodPressureRecord() {
  return request({
    url: '/api/DailyMonitor/GetBloodPressureRecord',
    method: 'get',
    params: {}
  })
}
export function getBloodSugarRecord() {
  return request({
    url: '/api/DailyMonitor/GetBloodSugarRecord',
    method: 'get',
    params: {}
  })
}
export function getHeartRateRecord() {
  return request({
    url: '/api/DailyMonitor/GetHeartRateRecord',
    method: 'get',
    params: {}
  })
}
export function getStepReocrd() {
  return request({
    url: '/api/DailyMonitor/GetStepReocrd',
    method: 'get',
    params: {}
  })
}
export function getBloodOxygenRecord() {
  return request({
    url: '/api/DailyMonitor/GetBloodOxygenRecord',
    method: 'get',
    params: {}
  })
}
export function getVitalCapacityRecord() {
  return request({
    url: '/api/DailyMonitor/GetVitalCapacityRecord',
    method: 'get',
    params: {}
  })
}
export function getTCRecord() {
  return request({
    url: '/api/DailyMonitor/GetTCRecord',
    method: 'get',
    params: {}
  })
}

export function getLastBloodPressure() {
  return request({
    url: '/api/DailyMonitor/GetLastBloodPressure',
    method: 'get',
    params: {}
  })
}

export function getLastBloodSugar() {
  return request({
    url: '/api/DailyMonitor/GetLastBloodSugar',
    method: 'get',
    params: {}
  })
}

export function saveBloodSugar(data) {
  return request({
    url: '/api/DailyMonitor/SaveBloodSugar',
    method: 'post',
    data
  })
}
export function saveBloodPressure(data) {
  return request({
    url: '/api/DailyMonitor/SaveBloodPressure',
    method: 'post',
    data
  })
}

export function saveBloodOxygenRecord(data) {
  return request({
    url: '/api/DailyMonitor/SaveBloodOxygenRecord',
    method: 'post',
    data
  })
}

export function saveHeartRate(data) {
  return request({
    url: '/api/DailyMonitor/SaveHeartRate',
    method: 'post',
    data
  })
}

export function saveStepRecord(data) {
  return request({
    url: '/api/DailyMonitor/SaveStepRecord',
    method: 'post',
    data
  })
}

export function saveVitalCapacityRecord(data) {
  return request({
    url: '/api/DailyMonitor/SaveVitalCapacityRecord',
    method: 'post',
    data
  })
}

export function saveTCRecord(data) {
  return request({
    url: '/api/DailyMonitor/SaveTCRecord',
    method: 'post',
    data
  })
}

export function getBloodPressureReport(type) {
  return request({
    url: '/api/DailyMonitor/GetBloodPressureReport' + '?reportTimeType=' + type,
    method: 'get',
    params: {}
  })
}

export function getBloodSugarReport(type) {
  return request({
    url: '/api/DailyMonitor/GetBloodSugarReport' + '?reportTimeType=' + type,
    method: 'get',
    params: {}
  })
}
