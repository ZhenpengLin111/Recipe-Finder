import { createSlice } from '@reduxjs/toolkit'
import { getUser, verifyUser } from '../../apis/users'
import { getToken, setToken as _setToken, removeToken } from '../../utils'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      _setToken(action.payload)
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state, action) {
      state.userInfo = {}
      state.token = ''
      removeToken()
    }
  }
})

const {setToken, setUserInfo, clearUserInfo} = userStore.actions

// async function, get otken after login successfully
const fetchLogin = (token) => {
  return async (dispatch) => {
    // const res = await verifyUser(user)
    dispatch(setToken(token))
  }
}
// Get userInfo
const fetchUserInfo = (id) => {
  return async (dispatch) => {
    const res = await getUser(id)
    dispatch(setUserInfo(res))
  }
}

export {
  setToken,
  clearUserInfo,
  fetchLogin,
  fetchUserInfo
}
const userReducer = userStore.reducer
export default userReducer