import React, { Suspense, useState } from 'react'
import { RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom'

import { theme, ConfigProvider, message, Button, Spin } from 'antd'

import router from './router/index'

import './App.scss'

const MyApp: React.FC = () => {

  console.log('app')

  return (
    <Suspense fallback={<Spin tip="加载中...." />}>
      <RouterProvider router={router} fallbackElement={<Spin tip="加载中...." />} />
    </Suspense>
  )
}

export default MyApp
