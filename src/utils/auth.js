import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
	setToken('847bcd6b61e04771bbf598eceb2e7d9c')
  	return Cookies.get(TokenKey)
}

export function setToken(token) {
  	return Cookies.set(TokenKey, token)
}

export function removeToken() {
  	return Cookies.remove(TokenKey)
}
