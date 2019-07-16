import Cookies from 'js-cookie'

const TokenKey_H5 = 'key_for_token_h5'
const TokenKey_360App = 'key_for_token_360App'

export function getToken_H5() {
  return Cookies.get(TokenKey_H5)
}

export function setToken_H5(token) {
  return Cookies.set(TokenKey_H5, token)
}

export function removeToken_H5() {
  return Cookies.remove(TokenKey_H5)
}


export function getToken_360App() {
  return Cookies.get(TokenKey_360App)
}

export function setToken_360App(token) {
  return Cookies.set(TokenKey_360App, token)
}

export function removeToken_360App() {
  return Cookies.remove(TokenKey_360App)
}