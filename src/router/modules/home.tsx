import { Tab, RouteTab } from '@/tt_core/index'

export const homeTab: Tab = {
    title: '首页',
    path: '/'
}

export const homeRouteTab: RouteTab = {
    path: '/',
    routes: [
      { path: '/', page: () => import('@/pages/home') },
    ]
}