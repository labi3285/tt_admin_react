
import { CSSProperties, useMemo } from 'react'
import { Switch } from 'antd'

import { BooleanValueType } from '../index'


export interface Props<T extends boolean | string | number> {
    value?: T,
    valueType?: BooleanValueType
    loading?: boolean
    disabled?: boolean
    onChange?: (value: T | undefined) => void

    className?: string
    style?: CSSProperties
}
const Component = <T extends boolean | string | number>(props: Props<T>) => {
    const onChange = (checked: boolean) => {
        if (props.onChange) {
            if (props.valueType === 'number_0/1') {
                props.onChange(checked ? 1 : 0 as any)
            } else if (props.valueType === 'string_0/1') {
                props.onChange(checked ? '1' : '0' as any)
            } else if (props.valueType === 'string_TRUE/FALSE') {
                props.onChange(checked ? 'TRUE' : 'FALSE' as any)
            } else {
                props.onChange(checked as any)
            }
        }
    }
    const value = useMemo(() => {
        if (props.valueType === 'number_0/1') {
            return props.value && props.value == 1 ? true : false
        } else if (props.valueType === 'string_0/1') {
            return props.value && props.value == '1' ? true : false
        } else if (props.valueType === 'string_TRUE/FALSE') {
            return props.value && props.value == 'TRUE' ? true : false
        } else {
            return props.value ? true : false
        }
    }, [props.value, props.valueType])
    return (
        <Switch
            value={value}
            loading={props.loading}
            disabled={props.disabled}
            onChange={onChange}

            size='default'
            className={props.className}
            style={props.style}
        />
    )
}

export default Component