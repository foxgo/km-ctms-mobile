import request from '@/utils/request'

export function getSuggest(age, gender, period) {
  return request({
    url: '/api/Suggest' + '?age=' + age + '&gender=' + gender + '&period=' + period,
    method: 'get',
    params: {}
  })
}
