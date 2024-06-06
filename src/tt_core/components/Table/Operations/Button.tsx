import { MouseEvent, useState } from 'react'
import { Button } from 'antd'

import { Action } from '../Table'

export default function OperationButton<T>(message: any, action: Action<T>, item: T, i: number) {
    return (props: {
        onClick?: (event: MouseEvent<HTMLElement>) => void
    }) => {
        const [loading, setLoading] = useState(false)
        const onClick = (event: MouseEvent<HTMLElement>) => {
            if (action.confirm) {
                props.onClick && props.onClick(event)
            } else {
                if (action.onClick) {
                    if (typeof action.onClick == 'function') {
                        const res: any = action.onClick(item, i)
                        if (res && res instanceof Promise) {
                            setLoading(true)
                            res.then(() => {
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
                    }
                }
            }
        }
        return (
            <Button
                size='middle'
                type={action.type}
                loading={loading}
                danger={action.danger}
                icon={action.icon}
                onClick={onClick}
                >{action.title}</Button>
        )
    }
}