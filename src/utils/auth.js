import Cookies from 'js-cookie'

const TokenKey_H5 = 'token_H5'
const TokenKey_360App = 'token_360App'

export function getToken_H5() {
  return localStorage.getItem(TokenKey_H5)
  // return Cookies.get(TokenKey_H5)
}

export function setToken_H5(token) {
  localStorage.setItem(TokenKey_H5, token)
  // return Cookies.set(TokenKey_H5, token)
}

export function removeToken_H5() {
  localStorage.removeItem(TokenKey_H5)
  // return Cookies.remove(TokenKey_H5)
}

export function getToken_360App() {
  return localStorage.getItem(TokenKey_360App)
  // return Cookies.get(TokenKey_360App)
}

export function setToken_360App(token) {
  localStorage.setItem(TokenKey_360App, token)
  // return Cookies.set(TokenKey_360App, token)
}

export function removeToken_360App() {
  localStorage.removeItem(TokenKey_360App)
  // return Cookies.remove(TokenKey_360App)
}
