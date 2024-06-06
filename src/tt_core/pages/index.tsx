import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/index'
import { RouteTab } from '../index'
import { checkSamePath, pathJoin } from '../utils/path'
import Placeholder from './placeholder'
import Error404 from './error/404'

//@ts-ignore
import loadable from '@loadable/component'
import { Spin } from 'antd'

function loadableComponent(page: any) {
    return loadable(page, { fallback: <Spin /> })
}

export function Router(routeTabs: RouteTab[]) {
    return createBrowserRouter([
        {
            path: '/login',
            Component: loadableComponent(() => import('./login/index')),
        },
        {
            path: '/*',
            element: <Layout><Error404 /></Layout>,
        },
        ...routeTabs.map(tab => {
            const children = tab.routes.map(route => {
                return {
                    path: pathJoin(tab.path, route.path),
                    Component: loadableComponent(route.page),
                }
            })
            let find = false
            for (const e of children) {
                if (checkSamePath(e.path, '/')) {
                    find = true
                }
            }
            if (!find) {
                children.splice(0, 0, {
                    path: tab.path,
                    Component: loadableComponent(() => import('./placeholder/index')),
                })
            }
            return {
                path: tab.path,
                Component: Layout,
                children: [
                    ...children
                ]
            }
        })
    ])
}