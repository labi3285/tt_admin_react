import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const LOCAL_STORAGE_KEY__IS_MENU_COLLAPSED = '__SYSTEM__SETTINGS__IS_MENU_COLLAPSED__'
const LOCAL_STORAGE_KEY__IS_ACCOUNT_REMEMBERED = '__SYSTEM__SETTINGS__IS_ACCOUNT_REMEMBERED__'
const LOCAL_STORAGE_KEY__REMEMBERED_ACCOUNT = '__SYSTEM__SETTINGS__REMEMBERED_ACCOUNT__'

interface SettingsState {
  isMenuCollapsed: boolean
  isAccountRemember: boolean,
  rememberedAccount: string | null,
}

const initialState: SettingsState = {
  isMenuCollapsed: localStorage.getItem(LOCAL_STORAGE_KEY__IS_MENU_COLLAPSED) == 'TRUE',
  isAccountRemember: localStorage.getItem(LOCAL_STORAGE_KEY__IS_ACCOUNT_REMEMBERED) == 'TRUE',
  rememberedAccount: localStorage.getItem(LOCAL_STORAGE_KEY__REMEMBERED_ACCOUNT),
}

export default createSlice({
  name: 'systemSettings',
  initialState,
  reducers: {
    setIsMenuCollapsed: (state, Action: PayloadAction<boolean>) => {
      state.isMenuCollapsed = Action.payload
      localStorage.setItem(LOCAL_STORAGE_KEY__IS_MENU_COLLAPSED, Action.payload ? 'TRUE' : 'FALSE')
    },
    setIsAccountRemember: (state, Action: PayloadAction<boolean>) => {
      state.isAccountRemember = Action.payload
      localStorage.setItem(LOCAL_STORAGE_KEY__IS_ACCOUNT_REMEMBERED, Action.payload ? 'TRUE' : 'FALSE')
    },
    setRememberedAccount: (state, Action: PayloadAction<string | null>) => {
      state.rememberedAccount = Action.payload
      if (Action.payload) {
        localStorage.setItem(LOCAL_STORAGE_KEY__REMEMBERED_ACCOUNT, Action.payload)
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY__REMEMBERED_ACCOUNT)
      }
    },
  },
})
