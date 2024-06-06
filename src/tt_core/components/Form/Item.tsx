
import { ReactNode, useMemo, useContext, createContext } from 'react'
import { Form, Col } from 'antd'
import { FormContext } from './Form'

export const ItemContext = createContext({
    valueKey: ''
})

export interface Props {
    valueKey: string
    label?: string
    required?: boolean

    fullWidth?: boolean
    validator?: (value: any) => string | null

    children?: ReactNode
}
const Component = (props: Props) => {
    const formContext = useContext(FormContext)
    const rules = useMemo(() => {
        const arr: any[] = []
        if (props.required && !formContext.preview) {
            arr.push({ required: props.required, message: '不能为空' })
        }
        if (props.validator) {
            arr.push({
                validator: (_: any, value: any) => {
                    if (value === undefined || value === null || value === '') {
                        return Promise.resolve()
                    }
                    const err = props.validator!(value)
                    if (err) {
                        return Promise.reject(new Error(err))
                    } else {
                        return Promise.resolve()
                    }
                }
            })
        }
        return arr
    }, [props.required, formContext.preview])

    const info = useMemo(() => {
        if (props.fullWidth) {
            if (formContext.formWidth > 1600) {
                return { span: 24, labelSpan: 2 }
            } else if (formContext.formWidth > 1200) {
                return { span: 24, labelSpan: 3 }
            } else if (formContext.formWidth > 700) {
                return { span: 24, labelSpan: 4 }
            } else {
                return { span: 24, labelSpan: 8 }
            }
        } else {
            if (formContext.formWidth > 1600) {
                return { span: 6, labelSpan: 8 }
            } else if (formContext.formWidth > 1200) {
                return { span: 8, labelSpan: 9 }
            } else if (formContext.formWidth > 700) {
                return { span: 12, labelSpan: 8 }
            } else {
                return { span: 24, labelSpan: 8 }
            }
        }
    }, [formContext.formWidth, props.fullWidth])

    return (
        <ItemContext.Provider value={{ valueKey: props.valueKey }}>
            <Col span={info.span}>
                <Form.Item
                    label={props.label}
                    labelCol={{ span: info.labelSpan }}
                    name={props.valueKey}
                    rules={rules}>
                    {props.children}

                </Form.Item>
            </Col>
        </ItemContext.Provider>
    )
}

export default Component