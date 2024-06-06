
import { CSSProperties, ReactNode, useMemo } from 'react'
import { Radio, RadioChangeEvent } from 'antd'
import { Option } from '../index'

export interface Props<T extends number | string> {
    value?: T,
    onChange?: (value: T | undefined) => void
    options: Option<T>[]
    disabled?: boolean

    className?: string
    style?: CSSProperties
}
const Component = <T extends number | string>(props: Props<T>) => {
    const items = useMemo(() => {
        const arr: ReactNode[] = []
        for (let i = 0; i < props.options.length; i++) {
            arr.push(<Radio.Button key={i} value={props.options[i].value}>{props.options[i].label}</Radio.Button>)
        }
        return arr
    }, [props.options])
    const onChange = (event: RadioChangeEvent) => {
        if (props.onChange) {
            if (event.target.value === undefined || event.target.value === null || event.target.value === '') {
                props.onChange(undefined)
            } else {
                props.onChange(event.target.value)
            }
        }
    }
    return (
        <Radio.Group
            value={props.value}
            disabled={props.disabled}

            onChange={onChange}

            buttonStyle='outline'
            size='middle'
            className={props.className}
            style={props.style}
        >
            {items}
        </Radio.Group>
    )
}

export default Component