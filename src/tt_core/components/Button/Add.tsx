import { CSSProperties, ReactNode, MouseEvent } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export interface Props {
    onClick?: (event: MouseEvent<HTMLElement>) => void
    children?: ReactNode,
    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    return (
        <Button className={props.className} style={props.style} icon={<PlusOutlined />} onClick={props.onClick}>
            { props.children || '添加' }
        </Button>
    )
}

export default Component