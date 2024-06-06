
import { CSSProperties, ReactNode, useMemo } from 'react'
import { Option } from '../index'

export interface Props<T extends number | string> {
    value?: T,
    options?: Option<T>[]
    render?: (value: T | undefined) => ReactNode

    className?: string
    style?: CSSProperties
}
const Component = <T extends number | string>(props: Props<T>) => {
    const node = useMemo(() => {
        if (props.render) {
            return props.render(props.value)
        } else if (props.options) {
            if (props.value) {
                if (Array.isArray(props.value)) {
                    const labels: ReactNode[] = []
                    props.value.forEach((v, i) => {
                        let find: Option<T> | null = null
                        for (const o of props.options!) {
                            if (o.value == v) {
                                find = o
                            }
                        }
                        if (find) {
                            labels.push(find.label)
                        } else {
                            labels.push(v)
                        }
                        if (i < (props.value as any).length - 1) {
                            labels.push(<span key={i}>, </span>)
                        }
                    })
                    return labels
                } else {
                    for (const o of props.options) {
                        if (o.value == props.value) {
                            return o.label
                        }
                    }
                    return ''
                }
            }
            return ''
        } else {
            return props.value
        }
    }, [props.value, props.options, props.render])
    return (
        <div
            className={props.className}
            style={props.style}
        >{node}</div>
    )
}

export default Component