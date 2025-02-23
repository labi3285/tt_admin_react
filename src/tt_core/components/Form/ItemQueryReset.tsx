
import { ReactNode, useMemo, useContext, createContext } from 'react'
import { Form, Col, Flex, Button } from 'antd'
import { FormContext } from './Form'

export interface Props {
    fullWidth?: boolean
    loading?: boolean
    disabled?: boolean
}
const Component = (props: Props) => {
    return (
        <Form.Item
        >
            <Flex gap={10}>
                <Button disabled={props.disabled} loading={props.loading} type="primary" htmlType="submit">查询</Button>
                <Button disabled={props.disabled} loading={props.loading} type="default" htmlType="reset">重置</Button>
            </Flex>
        </Form.Item>
    )
}

export default Component