import { Form, Button, Col } from 'antd'
import { ButtonType } from '../index'

export interface Props {
    type?: ButtonType
    loading?: boolean
    title: string
    disabled?: boolean
    span?: number
    offset?: number
    action?: () => void
}
export default (props: Props) => {
    return (
        <Form.Item wrapperCol={{ offset: props.offset, span: props.span }}>
            <Button disabled={props.disabled} loading={props.loading} type={props.type} htmlType="button" onClick={props.action}>{props.title}</Button>
        </Form.Item>
    )
}