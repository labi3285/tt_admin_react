

import { Tab } from '@/tt_core/index'

import { homeTab } from './modules/home'
// import { demoTab } from './modules/demo'
import { newsTab  } from './modules/news'
import { houseTab } from './modules/house'
import { marketingTab } from './modules/marketing'
import { systemTab } from './modules/system'

const tabs: Tab[] = [
    homeTab,
    newsTab,
    houseTab,
    marketingTab,
    systemTab,
]

export default tabs