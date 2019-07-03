import request from '@/utils/request'

export function getHealthEvaluateInfo() {
  return request({
    url: '/api/HealthEvaluate/GetHealthEvaluateInfo',
    method: 'get',
  })
}