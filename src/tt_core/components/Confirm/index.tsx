import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { App, Modal } from 'antd'

import { createPopupDom } from '../../layout/popup-dom'

const Confirm = ((props: {
    open: boolean
    title: string
    message?: string
    onConfirm?: (() => void) | (() => Promise<void>)
    width?: string | number
    onClose?: () => void
    cancelText?: string
    confirmText?: string
}) => {
    //@ts-ignore
    const message = window.tt_message

    const [loading, setLoading] = useState(false)
    const onConfirm = () => {
        if (props.onConfirm) {
            if (typeof props.onConfirm === "function") {
                const res: any = props.onConfirm()
                console.log(res)
                if (res && res instanceof Promise) {
                    setLoading(true)
                    res.then(() => {
                        props.onClose && props.onClose()
                    }).catch(err => {
                        if (!err.code || err.code > 0) {
                            message.error(err.message || '系统异常')
                        }
                    }).finally(() => {
                        setLoading(false)
                    })
                } else {
                    props.onClose && props.onClose()
                }
            } else {
                console.warn('[system confirm] onConfirm is not function.')
            }
        } else {
            props.onClose && props.onClose()
        }
    }
    const onCancel = () => {
        if (loading) {
            return
        }
        props.onClose && props.onClose()
    }
    return (
        <Modal
            title={props.title}
            open={props.open}
            width={props.width}
            confirmLoading={loading}
            okText={props.confirmText || '确定'}
            cancelText={props.cancelText || '取消'}
            onOk={onConfirm}
            onCancel={onCancel}>
            {props.message ? <p>{props.message}</p> : ''}
        </Modal>
    )
})

export default Confirm

export function confirm(props: {
    title: string
    message?: string
    onConfirm?: (() => void) | (() => Promise<void>)
    onCancel?: () => void
    width?: number
}) {
    const dom = createPopupDom()
    const root = createRoot(dom)
    const onClose = () => {
        root.unmount()
        dom.remove()
    }
    root.render(
        <Confirm open={true} title={props.title} onConfirm={props.onConfirm} onClose={onClose} />,
    )
}