import { ReactNode } from 'react'
import { Form, Button, Col } from 'antd'

export interface Props {
    loading?: boolean
    title?: string
    disabled?: boolean
    span?: number
    offset?: number
}
export default (props: Props) => {
    return (
        <Form.Item wrapperCol={{ offset: props.offset, span: props.span }}>
            <Button disabled={props.disabled} loading={props.loading} htmlType="reset">{props.title || '重置'}</Button>
        </Form.Item>
    )
}