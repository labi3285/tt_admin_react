import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { App, Spin } from 'antd'

import './app.scss'

interface Props {
    router: any
}
const TTApp = (props: Props) => {
    const { message } = App.useApp()
    //@ts-ignore
    window.tt_message = message
    
    return (
        <Suspense fallback={<Spin tip="加载中...." />}>
            <RouterProvider router={props.router} fallbackElement={<Spin tip="加载中...." />} />
        </Suspense>
    )
}

export default TTApp
