
import { CSSProperties, ReactNode, useMemo } from 'react'
import { InputNumber } from 'antd'

export interface Props {
    value?: number,
    placeholder?: string
    controls?: boolean
    disabled?: boolean

    min?: number
    max?: number
    step?: number
    dec?: number

    prefix?: ReactNode
    suffix?: ReactNode
    addBefore?: ReactNode
    addAfter?: ReactNode

    onChange?: (value: number | undefined) => void

    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    const onChange = (value: string | null) => {
        if (props.onChange) {
            if (value === undefined || value === null || value === '') {
                props.onChange(undefined)
            } else {
                props.onChange(parseFloat(value))
            }
        }
    }
    const _value = useMemo(() => {
        if (props.value) {
            return `${props.value}`
        }
        return undefined
    }, [props.value])
    return (
        <InputNumber
            value={_value}
            placeholder={props.placeholder || '请输入数值'}
            controls={props.controls == undefined ? true : props.controls}
            disabled={props.disabled}

            min={props.min ? `${props.min}` : undefined}
            max={props.max ? `${props.max}` : undefined}
            step={props.step ? `${props.step}` : 0.01}
            precision={props.dec}

            prefix={props.prefix}
            suffix={props.suffix}
            addonBefore={props.addBefore}
            addonAfter={props.addAfter}

            onChange={onChange}

            size='middle'
            className={props.className}
            style={{ width: '100%', ...props.style }}
        />
    )
}

export default Component