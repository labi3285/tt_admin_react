
import { CSSProperties, ReactNode, useMemo } from 'react'
import { Select } from 'antd'
import { Option } from '../index'

export interface Props<T extends number | string> {
    value?: T[],
    placeholder?: string
    onChange?: (value: T[] | undefined) => void
    options: Option<T>[]
    clear?: boolean
    disabled?: boolean

    className?: string
    style?: CSSProperties
}
const Component = <T extends number | string>(props: Props<T>) => {
    const items = useMemo(() => {
        const arr: ReactNode[] = []
        for (let i = 0; i < props.options.length; i++) {
            arr.push(<Select.Option key={i} value={props.options[i].value}>{props.options[i].label}</Select.Option>)
        }
        return arr
    }, [props.options])
    const onChange = (value: any[]) => {
        if (props.onChange) {
            if (value === undefined || value === null || value.length == 0) {
                props.onChange(undefined)
            } else {
                props.onChange(value)
            }
        }
    }
    return (
        <Select
            mode='multiple'
            value={props.value}
            placeholder={props.placeholder || '请选择'}
            allowClear={props.clear || true}
            disabled={props.disabled}

            onChange={onChange}

            size='middle'
            className={props.className}
            style={props.style}
        >
            {items}
        </Select>
    )
}

export default Component