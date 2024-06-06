
import { ReactNode } from 'react'
import { Flex } from 'antd'

export interface Props {
    children?: ReactNode
}
export default (props: Props) => {
    return (
        <Flex style={{ padding: '10px 0' }} wrap="wrap" gap='middle' justify='center' >
            {props.children}
        </Flex>
    )
}