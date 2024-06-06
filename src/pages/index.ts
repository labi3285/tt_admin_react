import { lazy } from 'react'

const Login = lazy(() => import('../tt_core/layout'))
const MainView = lazy(() => import('../tt_core/layout'))

export {
    Login,
    MainView
}