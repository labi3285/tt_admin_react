

import { Tab } from '@/tt_core/index'

import { homeTab } from './modules/home'
import { demoTab } from './modules/demo'
import { systemManageTab  } from './modules/user'

const tabs: Tab[] = [
    homeTab,
    systemManageTab,
    demoTab,
]

export default tabs