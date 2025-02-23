import { Tab, RouteTab } from '@/tt_core/index'
import { QuestionCircleOutlined } from '@ant-design/icons'

export const marketingTab: Tab = {
    title: '营销',
    path: '/marketing',
    menus: [
        {
            path: '/order',
            title: '订单管理',
            icon: <QuestionCircleOutlined />,
            children: [
                {
                    path: '/orders',
                    title: '订单列表',
                    icon: <QuestionCircleOutlined />
                },
            ]
        },
    ]
}

export const marketingRouteTab: RouteTab = {
    path: '/marketing',
    routes: [
      { path: '/order/orders', page: () => import('@/pages/marketing/orders') },
    ]
  }