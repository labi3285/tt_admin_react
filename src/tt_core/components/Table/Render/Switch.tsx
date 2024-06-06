import { useState, useMemo, useEffect } from 'react'
import { BooleanValueType } from '../../index'

import Switch from '../../Edit/Switch'

export interface Props<T> {
    row: Record<string, any>
    valueKey?: string
    i: number
    valueType?: BooleanValueType
    disabled?: boolean | ((value: T, row: Record<string, any>, i: number) => boolean)
    onChange?: ((value: T, row: Record<string, any>) => boolean) | ((value: T, row: Record<string, any>) => Promise<void>)
}
const Component = <T,>(props: Props<T>) => {

    //@ts-ignore
    const message = window.tt_message

    const [value, setValue] = useState(props.row[props.valueKey!])
    const [loading, setLoading] = useState(false)

    let disabled = useMemo(() => {
        let val = props.disabled
        if (val !== undefined && val !== null) {
            if (typeof val === 'function') {
                val = val(props.row[props.valueKey!], props.row, props.i)
            }
        }
        return val
    }, [])

    const onChange = (val: T | undefined) => {
        if (props.onChange) {
                const res: any = props.onChange(val!, props.row)
                if (res instanceof Promise) {
                    setLoading(true)
                    res.then(() => {
                        props.row[props.valueKey!] = val
                        setValue(val)
                    }).catch(err => {
                        if (!err.code || err.code > 0) {
                            message.error(err.message || '系统异常')
                        }
                    }).finally(() => {
                        setLoading(false)
                    })
                } else {
                    if (res) {
                        props.row[props.valueKey!] = val
                        setValue(val)
                    }
                
                }

        } else {
            props.row[props.valueKey!] = val
            setValue(val)
        }
    }
    return (
        <Switch loading={loading} disabled={disabled} value={value} valueType={props.valueType} onChange={onChange} />
    )
}

const Render = <T,>(options: {
    valueType?: BooleanValueType
    disabled?: boolean | ((value: T, row: Record<string, any>, i: number) => boolean)
    onChange?: ((value: T, row: Record<string, any>) => boolean) | ((value: T, row: Record<string, any>) => Promise<void>)
}) => {
    return (_: Record<string, any>, row: Record<string, any>, i: number, key?: string) => {
        return (
            <Component disabled={options.disabled} row={row} i={i} valueType={options.valueType} valueKey={key} onChange={options.onChange} />
        )
    }
}

export default Render