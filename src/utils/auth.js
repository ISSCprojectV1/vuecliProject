import Cookies from 'js-cookie'

const cookieKey = "UserId"
const cookieUserTrue="UserTrue"
const cookieAdminTrue="AdminTrue"
export function getToken() {
    return Cookies.get(cookieKey);
}

export function setToken(token) {
    return Cookies.set(cookieKey,token)
}

export function removeToken() {
    return Cookies.remove(cookieKey)
}

export function getUserTrue() {
    return Cookies.get(cookieUserTrue);
}

export function setUserTrue(token) {
    return Cookies.set(cookieUserTrue,token)
}

export function removeUserTrue() {
    return Cookies.remove(cookieUserTrue)
}

export function getAdminTrue() {
    return Cookies.get(cookieAdminTrue);
}

export function setAdminTrue(token) {
    return Cookies.set(cookieAdminTrue,token)
}

export function removeAdminTrue() {
    return Cookies.remove(cookieAdminTrue)
}
