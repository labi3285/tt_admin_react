
import { CSSProperties, useMemo } from 'react'
import { Checkbox } from 'antd'
import { Option } from '../index'

export interface Props<T extends string | number> {
    value?: T[],
    options: Option<T>[]
    placeholder?: string
    disabled?: boolean

    onChange?: (value: T[] | undefined) => void

    className?: string
    style?: CSSProperties
}
const Component = <T extends string | number>(props: Props<T>) => {
    const options = useMemo(() => {
        return props.options.map(e => {
            return {
                label: e.label,
                value: e.value,
                checked: true
            }
        })
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
        <Checkbox.Group
            value={props.value}
            disabled={props.disabled}

            options={options}
            onChange={onChange}

            className={props.className}
            style={props.style}
        />
    )
}

export default Component