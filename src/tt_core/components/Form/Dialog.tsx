import { ReactNode, useState } from 'react'
import { createRoot } from 'react-dom/client'

import { App, FormInstance } from 'antd'
import { createPopupDom } from '../../layout/popup-dom'

import Dialog from '../Dialog/index'
import Form from './Form'

import { Error } from '../../index'

export interface Props {
    title: string
    initData?: Record<string, any>
    width?: string

    cancelText?: string
    confirmText?: string
    otherHandler?:  ReactNode

    onConfirm?: ((form: Record<string, any>) => void) | (() => Promise<void>)
    onCancel?: () => void

    // onSubmit?: (form: Record<string, any>) => void


    children?: ReactNode
}
 const Component = (props: Props) => {
    
    const [form, setForm] = useState<FormInstance>()
    const [loading, setLoading] = useState(false)

    const onConfirm = async () => {
        try {
            await form!.validateFields()
        } catch (err) {
            throw new Error('验证失败', -1, err)
        }
        const vals = form!.getFieldsValue();
        if (props.onConfirm) {
            const res: any = props.onConfirm(vals)
            if (res && res instanceof Promise) {
                try {
                    setLoading(true)
                    await res
                } finally {
                    setLoading(false)
                }
            }
        }
    }
    return (
        <Dialog
            width={props.width}
            open={true}
            title={props.title}
            cancelText={props.cancelText}
            confirmText={props.confirmText}

            onConfirm={onConfirm}
            onClose={props.onCancel}>
            <Form disabled={loading} initData={props.initData} onReady={(e) => {
                setForm(e)
            }}>
                {props.children}
            </Form>
        </Dialog>
    )
}

export default Component

export function dialog(options: {
    title: string
    initData?: Record<string, any>
    width?: string

    cancelText?: string
    confirmText?: string

    onConfirm?: ((form: Record<string, any>) => void) | (() => Promise<void>)
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
        <Component
            width={options.width}
            title={options.title}
            initData={options.initData}
            cancelText={options.cancelText}
            confirmText={options.confirmText}

            onConfirm={options.onConfirm}
            onCancel={onClose}
            >
            {options.children}
        </Component>
    )
}