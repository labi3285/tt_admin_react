
import { ReactNode, useMemo, useContext } from 'react'
import { Form } from 'antd'
import { FormContext } from './Form'
import { ItemContext } from './Item'

export interface Props {
    index: number

    fullWidth?: boolean
    validator?: (value: any) => string | null

    children?: ReactNode
}
 const Component = (props: Props) => {
    // const formContext = useContext(FormContext)
    const itemContext = useContext(ItemContext)

    const rules = useMemo(() => {
        const arr: any[] = []
        if (props.validator) {
            arr.push({ validator: (_: any, value: any) => {
                if (value === undefined || value === null || value === '') {
                    return Promise.resolve()
                }
                const err = props.validator!(value)
                if (err) {
                    return Promise.reject(new Error(err))
                } else {
                    return Promise.resolve()
                }
            } })
        }
        return arr
    }, [])
    
    return (
        <Form.Item
            name={[itemContext.valueKey, props.index]}
            rules={rules}>
                {props.children}
        </Form.Item>
    )
}

export default Component