import { useState, useEffect, MouseEvent, KeyboardEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from '@/store/index'

import { Tabs } from 'antd'
import menusSlice from '../store/menus.ts'

type TargetKey = MouseEvent | KeyboardEvent | string

export default () => {
    const systemMenus = useSelector((state) => state.systemMenus)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    const [items, setItems] = useState<{ label: string, key: string }[]>([])
    const [activeKey, setActiveKey] = useState('')

    useEffect(() => {
        const arr = (systemMenus.activeTabs || []).map(e => {
            return {
                label: e.title,
                key: e.fullPath
            }
        })
        setItems(arr)
    }, [systemMenus.activeTabs])

    useEffect(() => {
        setActiveKey(location.pathname)
    }, [location.pathname])

    const onEdit = (key: TargetKey, Action: 'add' | 'remove') => {
        if (Action == 'remove') {
            const i = items.findIndex(e => e.key == key)
            const others = items.filter(e => e.key != key)
            if (others.length) {
                if (key == activeKey) {
                    const _i = i == others.length ? i - 1 : i
                    const { key } = others[_i]
                    setActiveKey(key)
                    navigate(key)
                }
            } else {
                navigate('/')
            }
            const item = items[i]
            setItems(others)
            dispatch(menusSlice.actions.checkOrRemoveActiveTab({
                title: item.label,
                fullPath: item.key
            }))
        }
    }

    const onChange = (key: string) => {
        setActiveKey(key)
        navigate(key)
    }

    return (
        <div className='tt-layout__active-tabs'>
            <Tabs
                hideAdd
                onChange={onChange}
                activeKey={activeKey}
                type="editable-card"
                onEdit={onEdit}
                items={items}
            />
        </div>
    )
}
