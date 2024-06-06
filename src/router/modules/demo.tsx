import { Tab, RouteTab } from '@/tt_core/index'
import { QuestionCircleOutlined } from '@ant-design/icons'

export const demoTab: Tab = {
    title: '示例',
    path: '/demo',
    menus: [
        {
            path: '/demo',
            title: '示例',
            icon: <QuestionCircleOutlined />,
            children: [
                {
                    path: '/TypicalPage',
                    title: '典型页面',
                    // icon: <svg fill='#ffffff' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15032" width="20" height="20"><path d="M936.279146 418.705152c-62.643303-29.044009-128.994775 4.923754-163.620003-41.057174-39.76934-52.804826-21.046069-136.154629 45.355977-186.163428 0.180622-0.135466 7.083993-15.560581 7.168885-15.768296 23.656056-58.066343-163.421318-167.720121-198.274129-93.094357-33.655287 72.059125-35.889581 153.19631-99.89658 153.301071-61.328376 0.102955-93.190087-98.298076-156.250627-139.05-53.874108-34.81488-180.358238 44.944159-142.207271 94.779561 73.39934 95.877742 113.526312 131.929882 77.699949 183.322244-36.991375 53.064922-120.738546-7.564447-194.251678 25.695278-28.021689 12.677854-42.276373 55.508737-42.276373 87.552876 0 41.658646-3.000131 95.260014 38.705477 116.114624 11.467687 5.734747 26.419572 3.007355 27.23779 2.866471 83.143894-14.335964 141.735847-27.380481 176.187677 29.040396 33.944282 55.591823-57.139753 97.396772-63.015385 178.638717-4.48123 61.967777 104.899808 124.860339 154.776752 84.877865 0.442524-0.354019 2.889951-5.163981 2.866471-5.73294-3.220489-83.068033 54.842242-145.556002 120.899299-148.09374 66.060671-2.537738 116.898524 60.269931 135.535096 141.979687 0.462392 2.028384 11.236491 18.855125 12.901826 20.068904 42.146325 30.700312 111.786923-31.050719 112.467867-81.996944 1.092763-82.136024-80.528489-135.863828-39.017952-186.575246 38.633228-47.18929 104.981088 1.116244 175.54105-22.881188 42.97538-14.615928 51.607302-49.553631 51.607303-97.478052-0.001806-32.464989-11.883118-87.244012-40.141421-100.346329zM546.067105 602.15022c-66.501388 0-120.413427-53.912039-120.413426-120.415233 0-66.501388 53.912039-120.413427 120.413426-120.413427 66.505001 0 120.417039 53.912039 120.417039 120.413427 0 66.503194-53.912039 120.415233-120.417039 120.415233z" p-id="15033"></path></svg>
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Dialog',
                    title: '提交表单',
                    icon: <QuestionCircleOutlined />
                },
            ]
        },
        {
            path: '/components',
            title: '控件',
            icon: <QuestionCircleOutlined />,
            children: [
                {
                    path: '/Test',
                    title: 'Test',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Button',
                    title: 'Button',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Image',
                    title: 'Image',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Edit',
                    title: 'Edit',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Table',
                    title: 'Table',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Confirm',
                    title: 'Confirm',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Form',
                    title: 'Form',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Form-Preview',
                    title: 'Form-Preview',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/Dialog',
                    title: 'Dialog',
                    icon: <QuestionCircleOutlined />
                },
                {
                    path: '/PageTable',
                    title: 'PageTable',
                    icon: <QuestionCircleOutlined />
                },
            ]
        },
    ]
}

export const demoRouteTab: RouteTab = {
    path: '/demo',
    routes: [
      { path: '/demo/TypicalPage', page: () => import('@/pages/demo/demo/typical_page') },
      { path: '/demo/Dialog', page: () => import('@/pages/demo/demo/dialog') },

      { path: '/components/Test', page: () => import('@/pages/demo/components/Test') },
      { path: '/components/Button', page: () => import('@/pages/demo/components/Button') },
      { path: '/components/Image', page: () => import('@/pages/demo/components/Image') },
      { path: '/components/Table', page: () => import('@/pages/demo/components/Table') },
      { path: '/components/Confirm', page: () => import('@/pages/demo/components/Confirm') },
      
      { path: '/components/Edit', page: () => import('@/pages/demo/components/Edit') },
      { path: '/components/Form', page: () => import('@/pages/demo/components/Form') },
      { path: '/components/Form-Preview', page: () => import('@/pages/demo/components/Form-Preview') },
      { path: '/components/Dialog', page: () => import('@/pages/demo/components/Dialog') },
      { path: '/components/PageTable', page: () => import('@/pages/demo/components/PageTable') },

    ]
  }