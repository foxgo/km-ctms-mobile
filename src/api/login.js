import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }

  return request({
    url: '/home/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/home/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/home/getUserByToken',
    method: 'get',
    params: { token }
  })
}

