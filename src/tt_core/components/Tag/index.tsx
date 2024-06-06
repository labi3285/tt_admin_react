
import { useMemo } from 'react'
import { Tag } from 'antd'

import { Option } from '../index'

export interface Props<T extends number | string> {
    value: T
    options?: Option<T>[]
}
const Component = <T extends number | string>(props: Props<T>) => {
    const label = useMemo(() => {
        if (props.options) {
            for (const e of props.options) {
                if (e.value == props.value) {
                    return e.label
                }
            }
        }
        return props.value
    }, [props.value, props.options])
    const color = useMemo(() => {
        if (props.options) {
            for (const e of props.options) {
                if (e.value == props.value) {
                    return e.color
                }
            }
        }
        return undefined
    }, [props.value, props.options])
    return (
        <Tag color={color}>{label}</Tag>
    )
}

export default Component