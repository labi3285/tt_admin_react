import { useState, useRef, useEffect } from 'react'
import { App, message, Popconfirm } from 'antd'

import { Action } from '../Table'

export default function OperationConfirm<T>(message: any, action: Action<T>, item: T, Button: any, rowIndex: number, columnIndex: number) {
    const POPCONFIRM_ID = `tt-table-popconfirm-${rowIndex}-${columnIndex}`
    return () => {
        const opening = useRef(false)
        const [open, setOpen] = useState(false)
        const [loading, setLoading] = useState(false)
        const onClick = () => {
            setOpen(true)
            opening.current = true
            setTimeout(() => {
                opening.current = false
            }, 100);
        }
        const onConfirm = () => {
            if (typeof action.onClick == 'function') {
                const res: any = action.onClick(item, rowIndex)
                if (res && res instanceof Promise) {
                    setLoading(true)
                    res.then(() => {
                        setOpen(false)
                    }).catch(err => {
                        if (!err.code || err.code > 0) {
                            message.error(err.message || '系统异常')
                        }
                    }).finally(() => {
                        setLoading(false)
                    })
                }
            } else {
                console.warn('[system table] onConfirm is not function.')
                setOpen(false)
            }
        }
        const onCancel = () => {
            setOpen(false)
        }
        useEffect(() => {
            const onOutsideClick = (event: any) => {
                const popup = document.getElementById(POPCONFIRM_ID)
                if (!opening.current && popup && !popup.contains(event.target)) {
                    setOpen(false)
                }
            }
            document.addEventListener('click', onOutsideClick)
            return () => {
                document.removeEventListener('click', onOutsideClick)
            }
        }, [])
        return (
            <Popconfirm
                id={POPCONFIRM_ID}
                key={columnIndex}
                title={action.confirm!.title || action.title}
                description={action.confirm!.message}
                open={open}
                okText={action.confirm!.confirmText || '确定'}
                cancelText={action.confirm!.cancelText || '取消'}
                onConfirm={onConfirm}
                onCancel={onCancel}
                okButtonProps={{ loading: loading }}
            >
                <Button onClick={onClick} />
            </Popconfirm>
        )
    }

}
