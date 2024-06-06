
import { ReactNode } from 'react'
import { Row } from 'antd'

export interface Props {
    children?: ReactNode
}
export default (props: Props) => {
    return (
        <Row>{props.children}</Row>
    )
}