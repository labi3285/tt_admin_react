
import { CSSProperties, ReactNode, useMemo } from 'react'
import { Flex } from 'antd'
import { Option } from '../index'
import Tag from '../Tag/index'

export interface Props<T extends number | string> {
    value?: T,
    options?: Option<T>[]

    className?: string
    style?: CSSProperties
}
const Component = <T extends number | string>(props: Props<T>) => {
    const node = useMemo(() => {
        if (props.options) {
            if (props.value) {
                if (Array.isArray(props.value) && props.value.length > 0) {
                    const tags: ReactNode[] = []
                    props.value.forEach((v, i) => {
                        tags.push(<Tag key={i} value={v} options={props.options} />)
                    })
                    return <Flex gap='4px 2px' wrap='wrap'>{tags}</Flex>
                } else {
                    return <Tag value={props.value} options={props.options} />
                }
            }
            return ''
        } else {
            return props.value ? <Tag value={props.value} /> : ''
        }
    }, [props.value, props.options])
    return (
        <div
            className={props.className}
            style={props.style}
        >{node}</div>
    )
}

export default Component