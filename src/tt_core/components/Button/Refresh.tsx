import { CSSProperties, ReactNode, MouseEvent } from 'react'
import { Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

export interface Props {
    onClick?: (event: MouseEvent<HTMLElement>) => void
    children?: ReactNode,
    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    return (
        <Button className={props.className} style={props.style} icon={<ReloadOutlined />} onClick={props.onClick} />
    )
}

export default Component