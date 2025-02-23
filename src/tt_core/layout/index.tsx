import { useState, useEffect, ReactElement, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { App } from 'antd'

import { Outlet as RouterOutlet } from 'react-router-dom'

import './index.scss'
import NavigationBar, { getTabIndex } from './navigation-bar.tsx'
import _Menu from './menu.tsx'
import ActiveTabs from './active-tabs.tsx'
import Collapser from './collapser.tsx'
import Footer from './footer.tsx'

import { getPathComponents } from '../utils/path.ts'

import tabs from '@/router/menus.tsx'

import { useSelector, useDispatch } from '@/store/index'
import menusSlice from '../store/menus.ts'

import { Menu } from '../index.ts'

export default (props: {
  children?: ReactElement
}) => {
  const dispatch = useDispatch()

  const systemUser = useSelector((state) => state.systemUser)

  const navigate = useNavigate()
  const location = useLocation()

  location.pathname

  useEffect(() => {
    if (!systemUser.isLogin) {
      navigate('/login', { replace: true })
    }
  }, [systemUser.isLogin])

  const [tabIndex, setTabIndex] = useState<number>(-1)
  const [menus, setMenus] = useState<Menu[]>([])
  const [isMenuShow, setIsMenuShow] = useState<boolean>(false)
  const [isActiveTabsShow, setIsActiveTabsShow] = useState<boolean>(false)

  const [winWidth, setWinWidth] = useState(window.innerWidth)
  const isMobile = useMemo(() => {
    return winWidth < 600
  }, [winWidth])
 
  useEffect(() => {
    const onWinResize = () => setWinWidth(window.innerWidth)
    window.addEventListener('resize', onWinResize);
    return () => window.removeEventListener('resize', onWinResize);
  }, [])

  useEffect(() => {
    const i = getTabIndex(tabs, location.pathname) || 0
    setTabIndex(i)
    const tab = tabs[i]
    setMenus(tab.menus || [])
    setIsMenuShow(tab.menus != undefined && tab.menus.length > 0)    
    setIsActiveTabsShow(getPathComponents(location.pathname).length > 2)
  }, [location])

  const onTab = async (i: number) => {
    const tab = tabs[i]
    dispatch(menusSlice.actions.cleanTabs());
    navigate(tab.path)
  }

  const [isMenuCollapsed, setIsMenuCollapsed] = useState<boolean>(false)
  const onMenuCollapse = () => {
    setIsMenuCollapsed(!isMenuCollapsed)
  }

  return (
    <>
      <div className='tt-layout'>
        <NavigationBar tabs={tabs} tabIndex={tabIndex || 0} isMobile={isMobile} isMenuCollapsed={isMenuCollapsed} onTab={onTab} />
        {isMenuShow ? <_Menu tab={tabs[tabIndex]} menus={menus} isMobile={isMobile} isCollapsed={isMenuCollapsed} /> : ''}
        {isMenuShow ? <Collapser isMobile={isMobile} isCollapsed={isMenuCollapsed} onClick={onMenuCollapse} /> : ''}
        <div className={'tt-layout__content tt-layout__content-status-' + (isMenuShow ? ((isMobile || isMenuCollapsed) ? '2' : '1') : '0')}>
          {(!isMobile && isActiveTabsShow) ? <ActiveTabs /> : ''}
          <div className={'tt-layout__workspace tt-layout__workspace-height-' + ((!isMobile && isActiveTabsShow) ? '1' : '0')}>
            {props.children ? <props.children.type /> : <RouterOutlet />}
          </div>
          <Footer />
        </div>
      </div>
      <div id='tt-popup-container'></div>
    </>
  )
}