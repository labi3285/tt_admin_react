import { ReactNode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Modal, Button } from 'antd'
import { ButtonType } from '../index'
import { createPopupDom } from '../../layout/popup-dom'

export interface Operation {
    title: string
    type?: ButtonType
    icon?: ReactNode
    danger?: boolean
    onClick?: (() => void) | (() => Promise<void>)
    show?: () => boolean
}

const Dialog = ((props: {
    open: boolean
    title?: string
    width?: string | number

    cancelText?: string
    confirmText?: string

    onConfirm?: (() => void) | (() => Promise<void>)
    onClose?: () => void

    children?: ReactNode
}) => {
    //@ts-ignore
    const message = window.tt_message

    const [loading, setLoading] = useState(false)
    const onConfirm = () => {
        if (props.onConfirm) {
            if (typeof props.onConfirm === "function") {
                const res: any = props.onConfirm()
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
                console.warn('[system dialog] onConfirm is not function.')
            }
        } else {
            props.onClose && props.onClose()
        }
    }
    const onCancel = () => {
        if (loading) {
            return
        }
        onClose()
    }
    const onClose = () => {
        props.onClose && props.onClose()
    }
    return (
        <Modal
            title={props.title}
            open={props.open}
            style={{minWidth: '300px'}}
            width={props.width}
            confirmLoading={loading}
            onCancel={onClose}
            footer={(
                <>
                    <Button onClick={onCancel}  key='cancel' type='default'>{props.cancelText || '取消'}</Button>
                    <Button onClick={onConfirm} loading={loading} key='confirm' type='primary'>{props.confirmText || '确定'}</Button>
                </>
            )}
        >
            {props.children}
        </Modal>
    )
})

export default Dialog

export function dialog(options: {
    title: string
    message?: string
    width?: string

    cancelText?: string
    confirmText?: string
    otherHandler?:  ReactNode

    onConfirm?: (() => void) | (() => Promise<void>)
    onCancel?: () => void

    children?: ReactNode
}) {
    const dom = createPopupDom()
    const root = createRoot(dom)
    const onClose = () => {
        root.unmount()
        dom.remove()
    }
    root.render(
        <Dialog
            width={options.width}
            open={true}
            title={options.title}
            cancelText={options.cancelText}
            confirmText={options.confirmText}
            onConfirm={options.onConfirm}
            onClose={onClose}>
            {options.children ? options.children : options.message}
        </Dialog>
    )
}

