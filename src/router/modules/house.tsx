import { Tab, RouteTab } from '@/tt_core/index'
import { QuestionCircleOutlined } from '@ant-design/icons'

export const houseTab: Tab = {
    title: '装配',
    path: '/house',
    menus: [
        {
            path: '/house',
            title: '装配管理',
            icon: <QuestionCircleOutlined />,
            children: [
                {
                    path: '/house',
                    title: '户型列表',
                    icon: <QuestionCircleOutlined />
                },
            ]
        },
    ]
}

export const houseRouteTab: RouteTab = {
    path: '/house',
    routes: [
      { path: '/house/house', page: () => import('@/pages/house/house') },
    ]
  }