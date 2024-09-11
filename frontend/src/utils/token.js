import * as jwt_decode from 'jwt-decode'
const TOKENKEY = 'User'
function setToken (token) {
  sessionStorage.setItem(TOKENKEY, token)
}

function getToken () {
  return sessionStorage.getItem(TOKENKEY)
}

function removeToken () {
  sessionStorage.removeItem(TOKENKEY)
}

function decodedUser (token) {
  return jwt_decode.jwtDecode(token)
}

export {
  setToken,
  getToken,
  removeToken,
  decodedUser
}