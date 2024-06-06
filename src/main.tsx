import { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes } from 'react-router-dom'

import store from './store/index.ts'
import { Provider as ReduxProvider } from 'react-redux'

import { App, theme, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import MyApp from './App.tsx'
import './index.scss'



const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  //<React.StrictMode>
    <ConfigProvider
          locale={zhCN}
          theme={{
            // algorithm: theme.defaultAlgorithm,
            // algorithm: theme.darkAlgorithm,
            algorithm: theme.compactAlgorithm,
            // token: {
            //   // Seed Token，影响范围大
            //   colorPrimary: '#00b96b',
            //   borderRadius: 2,
      
            //   // 派生变量，影响范围小
            //   colorBgContainer: '#f6ffed',
            // },
          }}
    >
      <ReduxProvider store={store}>
        <App>
          <MyApp></MyApp>
        </App>
      </ReduxProvider>
    </ConfigProvider>
  //</React.StrictMode>
)
