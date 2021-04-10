import Cookies from 'js-cookie'

const tokenKey = "UserId"
const tokenRole = 'Role'
const cookieUserTrue = "UserTrue"
const cookieAdminTrue = "AdminTrue"

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}

export function getRole() {
  return Cookies.get(tokenRole)
}

export function setRole(token) {
  return Cookies.set(tokenRole, token)
}

export function removeRole() {
  return Cookies.remove(tokenRole)
}

export function getUserTrue() {
  return Cookies.get(cookieUserTrue)
}

export function setUserTrue(token) {
  return Cookies.set(cookieUserTrue, token)
}

export function removeUserTrue() {
  return Cookies.remove(cookieUserTrue)
}

export function getAdminTrue() {
  return Cookies.get(cookieAdminTrue)
}

export function setAdminTrue(token) {
  return Cookies.set(cookieAdminTrue, token)
}

export function removeAdminTrue() {
  return Cookies.remove(cookieAdminTrue)
}
