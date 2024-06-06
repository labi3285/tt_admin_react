
import settingsSlice from './settings'
import menusSlice from './menus'
import userSlice from './user'

export const Reducers = {
    systemUser: userSlice.reducer,
    systemSettings: settingsSlice.reducer,
    systemMenus: menusSlice.reducer,
}
