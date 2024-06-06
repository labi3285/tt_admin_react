import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TokenInfo, UserInfo } from '../index'

const LOCAL_STORAGE_KEY__TOKEN_INFO = '__SYSTEM__USER__TOKEN_INFO__'
const LOCAL_STORAGE_KEY__USER_INFO =  '__SYSTEM__USER__INFO__'

export interface UserState {
  isLogin: boolean,
  tokenInfo: TokenInfo | null,
  userInfo: UserInfo | null,
}
const initialState: UserState = {
  isLogin: sessionStorage.getItem(LOCAL_STORAGE_KEY__TOKEN_INFO) != null,
  tokenInfo: (() => {
    const json = sessionStorage.getItem(LOCAL_STORAGE_KEY__TOKEN_INFO)
    if (json) {
      return JSON.parse(json)
    }
    return null
  })(),
  userInfo: (() => {
    const json = sessionStorage.getItem(LOCAL_STORAGE_KEY__USER_INFO)
    if (json) {
      return JSON.parse(json)
    }
    return null
  })()
}

export default createSlice({
  name: 'systemUser',
  initialState,
  reducers: {
    setLogin: (state, Action: PayloadAction<{ tokenInfo: TokenInfo, userInfo: UserInfo }>) => {
      state.isLogin = true
      state.tokenInfo = Action.payload.tokenInfo
      state.userInfo = Action.payload.userInfo
      sessionStorage.setItem(LOCAL_STORAGE_KEY__TOKEN_INFO, JSON.stringify(Action.payload.tokenInfo))
      sessionStorage.setItem(LOCAL_STORAGE_KEY__USER_INFO, JSON.stringify(Action.payload.userInfo))
    },
    setLogout: (state) => {
      state.isLogin = false
      state.tokenInfo = null
      state.userInfo = null
      sessionStorage.removeItem(LOCAL_STORAGE_KEY__TOKEN_INFO)
      sessionStorage.removeItem(LOCAL_STORAGE_KEY__USER_INFO)
    },
  },
})