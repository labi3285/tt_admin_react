import { useEffect, useState, useRef, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { checkOrRemoveStartString, checkSamePath, pathJoin } from '../utils/path.ts'

import { Menu as AntdMenu } from 'antd'
import type { MenuProps } from 'antd'
type MenuItem = Required<MenuProps>['items'][number]

import { Menu, Tab, ActiveTab } from '../index.ts'

import menusSlice from '../store/menus.ts'
import { useDispatch } from '@/store/index'

function checkPermission(menu: Menu) {
    return true
    // const roleType = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).role.type;
    // // 过滤没有权限的页面
    // if (!permission || permission === roleType) {
    // 	return true;
    // }
    // return false;
};

function checkOrLoadItems(menus: Menu[] | null | undefined, parentPath: string | null) {
    if (menus === undefined || menus === null || menus.length == 0) {
        return undefined
    }
    const arr: MenuItem[] = []
    for (const menu of menus) {
        if (checkPermission(menu)) {
            arr.push({
                key: parentPath ? pathJoin(parentPath, menu.path) : menu.path,
                icon: menu.icon,
                label: menu.title,
                children: checkOrLoadItems(menu.children, menu.path),
            })
        }
    }
    return arr
}
function checkoutActiveTab(menu: Menu, parentPath: string, key: string): ActiveTab | null {
    const path = pathJoin(parentPath, menu.path)
    if (menu.children && menu.children.length > 0) {
        for (const e of menu.children) {
            const menu = checkoutActiveTab(e, path, key)
            if (menu != null) {
                return menu
            }
        }
        return null
    } else {
        if (checkSamePath(path, key)) {
            return {
                title: menu.title,
                fullPath: key,
            }
        } else {
            return null
        }
    }
}

function getSelectKey(path: string, tabPath: string) {
    return checkOrRemoveStartString(path, tabPath)
}
function getOpenKey(select: string) {
    return `/${select.split('/')[1]}`
}

export default memo((props: {
    isMobile: boolean,
    isCollapsed: boolean,
    tab: Tab,
    menus: Menu[]
}) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setMenuItems(checkOrLoadItems(props.menus, null) || [])
    }, [props.menus])

    const [menuItems, setMenuItems] = useState<MenuItem[]>(checkOrLoadItems(props.menus, null) || [])
    const defaultMenuSelectedRef = useRef('')
    const defaultMenuOpenedRef = useRef('')
    if (defaultMenuSelectedRef.current === '') {
        const menuSelected = getSelectKey(location.pathname, props.tab.path)
        defaultMenuSelectedRef.current = menuSelected
        defaultMenuOpenedRef.current = getOpenKey(menuSelected)
    }

    const onItemClick = (item: MenuItem) => {
        if (item && item.key) {
            const path = pathJoin(props.tab.path, item.key as string)
            navigate(path)

            let activeTab = null
            for (const e of props.menus) {
                const tab = checkoutActiveTab(e, props.tab.path, path)
                if (tab) {
                    activeTab = tab
                    break
                }
            }
            if (activeTab) {
                dispatch(menusSlice.actions.checkOrAddActiveTab(activeTab))
            } else {
                console.warn('system: menu not found ', item)
            }
        }
    }

    return (
        <div className='tt-layout__side-menu'>
            <AntdMenu
                theme='dark'
                className='tt-layout__side-menu__menu'
                inlineCollapsed={props.isMobile || props.isCollapsed}
                mode="inline"
                inlineIndent={10}
                items={menuItems}
                defaultOpenKeys={[defaultMenuOpenedRef.current]}
                defaultSelectedKeys={[defaultMenuSelectedRef.current]}
                onClick={onItemClick}
            />
        </div>
    )
})
