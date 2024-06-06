
import { CSSProperties, ReactNode } from 'react'
import { Flex, Space } from 'antd'

export interface Props {
    children: ReactNode,
    className?: string
    style?: CSSProperties
}
 const Component = (props: Props) => {

    return (
        <div style={{
            marginBottom: '10px',
            ...props.style
            }
        }>
            <Flex justify='flex-start' wrap='wrap' gap={5}>
                { props.children }
            </Flex>
        </div>
    )
}

export default Component