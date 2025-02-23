import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Menu, ActiveTab, Tab } from '../index'

const LOCAL_STORAGE_KEY__ACTIVE_TABS = '__SYSTEM__SETTINGS__ACTIVE_TABS__'

interface MenusState {
  activeTabs: ActiveTab[],
}
const initialState: MenusState = {
  activeTabs: (() => {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY__ACTIVE_TABS)
    if (json) {
      return JSON.parse(json)
    }
    return []
  })(),
}
export default createSlice({
  name: 'systemMenus',
  initialState,
  reducers: {
    checkOrAddActiveTab: (state, Action: PayloadAction<ActiveTab>) => {
      const arr = state.activeTabs || []
      let find = false
      for (let i = 0; i < arr.length; i ++) {
        if (Action.payload.fullPath == arr[i].fullPath) {
          find = true
          break
        }
      }
      if (!find) {
        arr.push(Action.payload)
        state.activeTabs = arr
        localStorage.setItem(LOCAL_STORAGE_KEY__ACTIVE_TABS, JSON.stringify(arr))
      }
    },
    checkOrRemoveActiveTab: (state, Action: PayloadAction<ActiveTab>) => {
      const arr = state.activeTabs || []
      for (let i = 0; i < arr.length; i ++) {
        if (Action.payload.fullPath == arr[i].fullPath) {
          arr.splice(i, 1)
          state.activeTabs = arr
          localStorage.setItem(LOCAL_STORAGE_KEY__ACTIVE_TABS, JSON.stringify(arr))
          break
        }
      }
    },
    cleanTabs: (state) => {
      state.activeTabs = []
      localStorage.setItem(LOCAL_STORAGE_KEY__ACTIVE_TABS, JSON.stringify([]))
    },
    setActiveTabs: (state, Action: PayloadAction<ActiveTab[]>) => {
      state.activeTabs = Action.payload
      if (Action.payload) {
        localStorage.setItem(LOCAL_STORAGE_KEY__ACTIVE_TABS, JSON.stringify(Action.payload))
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY__ACTIVE_TABS)
      }
    }
  },
})