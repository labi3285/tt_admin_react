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
            <Button disabled={props.disabled} loading={props.loading} type="primary" htmlType="submit">{props.title || '提交'}</Button>
        </Form.Item>
    )
}