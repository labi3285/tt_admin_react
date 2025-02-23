import { Tab, RouteTab } from '@/tt_core/index'
import { QuestionCircleOutlined } from '@ant-design/icons'

export const newsTab: Tab = {
    title: '资讯',
    path: '/news',
    menus: [
        {
            path: '/news',
            title: '资讯',
            icon: <QuestionCircleOutlined />,
            children: [
                {
                    path: '/news',
                    title: '资讯',
                    icon: <QuestionCircleOutlined />
                },
            ]
        },
    ]
}

export const newsRouteTab: RouteTab = {
    path: '/news',
    routes: [
      { path: '/news/news', page: () => import('@/pages/news/news') },
    ]
  }