import { Reducers } from './store/index'
import { Router } from './pages/index'

export class Error {
    message: string
    code?: string | number
    info?: any
    constructor(message: string, code?: string | number, info?: any) {
        this.message = message
        this.code = code
        this.info = info
    }
}

export interface RouteTab {
    path: string
    routes: Route[]
}
export interface Route {
    path: string
    page: any
}

export interface Tab {
    title: string
    path: string
    menus?: Menu[]
}

export interface Menu {
    path: string
    title: string
    icon?: any
    children?: Menu[]
    permission?: string
}

export interface ActiveTab {
    fullPath: string
    title: string
}

export interface TokenInfo {
    accessToken: string
    refreshToken?: string
}

export interface UserInfo {
    avator?: string,
    account: string,
}

export { Reducers, Router }
