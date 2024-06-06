import { useDispatch as useReduxDispatch, useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { Reducers } from '@/tt_core/index'

const store = configureStore({
  reducer: {
    ...Reducers
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch

export const useDispatch: () => Dispatch = useReduxDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector