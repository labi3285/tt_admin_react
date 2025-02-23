import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { App, theme, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import './app.scss'

interface Props {
    store: any,
    children: ReactNode
}
const Context = (props: Props) => {
    return (
        //<React.StrictMode>
        <ConfigProvider
            locale={zhCN}
            theme={{
                algorithm: theme.compactAlgorithm,
            }}
        >
            <ReduxProvider store={props.store}>
                <App>
                    {props.children}
                </App>
            </ReduxProvider>
        </ConfigProvider>
        //</React.StrictMode>
    )
}


export default Context