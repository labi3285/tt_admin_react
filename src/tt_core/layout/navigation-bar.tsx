import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { Tab } from '../index.ts'

import { getPathComponents, checkSamePath } from '../utils/path.ts'

export function getTabIndex(tabs: Tab[], path: string) {
    if (path == '/') {
        for (let i = 0; i < tabs.length; i ++) {
            if (tabs[i].menus === undefined || tabs[i].menus === null) {
                return i
            }
        }
    } else {
        console.log(tabs)

        const firstPath = getPathComponents(path)[0]
        for (let i = 0; i < tabs.length; i ++) {
            const tab = tabs[i]
            if (checkSamePath(tab.path, firstPath)) {
                return i
            }
            let find = false
            here: if (tab.menus != undefined && tab.menus != null) {
                for (let j = 0; j < tab.menus.length; j ++) {
                    const menu = tab.menus[j]
                    console.log(menu.path, firstPath)
                    if (checkSamePath(menu.path, firstPath)) {
                        find = true
                        break here
                    }
                }
            }

            if (find) {
                return i
            }
        }
    }
    return null
}

export default (props: {
    isMobile: boolean
    isMenuCollapsed: boolean
    tabs: Tab[]
    tabIndex: number
    onTab: (i: number) => void
}) => {
    const navigate = useNavigate()
    const onTabClick = (i: number) => {
        if (i == props.tabIndex) {
            return
        }
        props.onTab(i)
    }
    const renderTabItems = []
    for (let i = 0; i < props.tabs.length; i ++) {
        const e = props.tabs[i]
        renderTabItems.push(
            <div className='tt-layout__navigation-bar__tabs__item' key={i} onClick={() => { onTabClick(i) }}>
                <div className='tt-layout__navigation-bar__tabs__item__text'>{ e.title }</div>
                <div style={{ opacity: props.tabIndex == i ? 1 : 0 }} className='tt-layout__navigation-bar__tabs__item__line'></div>
            </div>
        )
    }
    return (
        <div className="tt-layout__navigation-bar">
            <div className='tt-layout__navigation-bar__logo'>
                <svg className="tt-layout__navigation-bar__logo__icon" fill='#ffffff' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20277"><path d="M929.6 70.61333333H93.12c-32.96 0-59.73333333 26.77333333-59.73333333 59.73333334v646.50666666c0 32.96 26.77333333 59.73333333 59.73333333 59.73333334h238.93333333v59.73333333c0 32.96 26.77333333 59.73333333 59.73333334 59.73333333h238.93333333c32.96 0 59.73333333-26.77333333 59.73333333-59.73333333v-59.73333333h238.93333334c32.96 0 59.73333333-26.77333333 59.73333333-59.73333334V130.34666667c0.21333333-33.06666667-26.56-59.73333333-59.52-59.73333334z m-1.92 691.62666667H100.90666667V145.6h820.37333333l6.4 616.64zM570.98666667 314.34666667h-328.53333334c-16.42666667 0-29.86666667-13.44-29.86666666-29.86666667s13.44-29.86666667 29.86666666-29.86666667h328.53333334c16.42666667 0 29.86666667 13.44 29.86666666 29.86666667s-13.44 29.86666667-29.86666666 29.86666667z m59.73333333 158.82666666h-388.26666667c-16.42666667 0-29.86666667-13.44-29.86666666-29.86666666s13.44-29.86666667 29.86666666-29.86666667h388.26666667c16.42666667 0 29.86666667 13.44 29.86666667 29.86666667s-13.44 29.86666667-29.86666667 29.86666666z m149.33333333 158.93333334h-537.6c-16.42666667 0-29.86666667-13.44-29.86666666-29.86666667s13.44-29.86666667 29.86666666-29.86666667h537.6c16.42666667 0 29.86666667 13.44 29.86666667 29.86666667s-13.44 29.86666667-29.86666667 29.86666667z" p-id="20278"></path></svg>
                {props.isMobile ? '' : <div className={'tt-layout__navigation-bar__logo__name ' + (props.isMenuCollapsed ? 'tt-layout__navigation-bar__logo__name-collapse-1' : 'tt-layout__navigation-bar__logo__name-collapse-0') }>管理系统</div>}
            </div>
            <div className='tt-layout__navigation-bar__tabs'>
                { renderTabItems }
            </div>
            <div className='tt-layout__navigation-bar__info'>
                <Avatar className='tt-layout__navigation-bar__info__user' size={40} icon={<UserOutlined />} />
            </div>
        </div>
    )
}