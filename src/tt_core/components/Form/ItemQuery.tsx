
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

    width: number

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

    return (
        <Form.Item
            style={{ width: props.width + 'px' }}
            name={props.valueKey}
            rules={rules}>
            {props.children}
        </Form.Item>
    )
}

export default Component