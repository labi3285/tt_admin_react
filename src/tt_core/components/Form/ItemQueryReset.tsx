
import { ReactNode, useMemo, useContext, createContext } from 'react'
import { Form, Col, Flex, Button } from 'antd'
import { FormContext } from './Form'

export interface Props {
    fullWidth?: boolean
    loading?: boolean
    disabled?: boolean
}
const Component = (props: Props) => {
    const formContext = useContext(FormContext)
    const info = useMemo(() => {
        if (props.fullWidth) {
            return { span: 24, justify: 'center', marginLeft: 0 }
        } else {
            if (formContext.formWidth > 1600) {
                return { span: 6, justify: 'flex-start', marginLeft: '33.5%' }
            } else if (formContext.formWidth > 1200) {
                return { span: 8, justify: 'flex-start', marginLeft: '33.5%' }
            } else if (formContext.formWidth > 700) {
                return { span: 12, justify: 'flex-start', marginLeft: '33.5%' }
            } else {
                return { span: 24, justify: 'flex-end', marginLeft: 0 }
            }
        }
    }, [formContext.formWidth, props.fullWidth])

    return (
        <Col span={info.span}>
            <Form.Item
            >
                <Flex gap={10} justify={info.justify} >
                    <Button style={{ marginLeft: info.marginLeft }} disabled={props.disabled} loading={props.loading} type="primary" htmlType="submit">查询</Button>
                    <Button disabled={props.disabled} loading={props.loading} type="default" htmlType="reset">重置</Button>
                </Flex>
            </Form.Item>
        </Col>
    )
}

export default Component