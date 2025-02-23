import { } from 'react'
import { Router } from '@/tt_core'

import { homeRouteTab } from './modules/home'
import { newsRouteTab } from './modules/news'
import { houseRouteTab } from './modules/house'
import { marketingRouteTab } from './modules/marketing'
import { systemRouteTab } from './modules/system'

export default Router([
  homeRouteTab,
  newsRouteTab,
  houseRouteTab,
  marketingRouteTab,
  systemRouteTab,
])


