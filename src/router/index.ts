import { } from 'react'
import { Router } from '@/tt_core'

import { homeRouteTab } from './modules/home'
import { demoRouteTab } from './modules/demo'
import { systemManageRouteTab } from './modules/user'

export default Router([
  homeRouteTab,
  demoRouteTab,
  systemManageRouteTab,
])


