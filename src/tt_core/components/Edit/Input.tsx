
import { CSSProperties, ReactNode, ChangeEvent, useEffect } from 'react'
import { Input } from 'antd'

export interface Props {
    value?: string
    placeholder?: string
    clear?: boolean
    disabled?: boolean

    prefix?: ReactNode
    suffix?: ReactNode
    addBefore?: ReactNode
    addAfter?: ReactNode

    maxLength?: number

    onChange?: (value: string | undefined) => void

    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            if (event.target.value === undefined || event.target.value === null || event.target.value === '') {
                props.onChange(undefined)
            } else {
                props.onChange(event.target.value)
            }
        }
    }
    return (
        <Input
            value={props.value}
            placeholder={props.placeholder || '请输入文本'}
            allowClear={props.clear === undefined ? true : false}
            disabled={props.disabled}

            prefix={props.prefix}
            suffix={props.suffix}
            addonBefore={props.addBefore}
            addonAfter={props.addAfter}

            maxLength={props.maxLength || 255}

            onChange={onChange}

            size='middle'
            className={props.className}
            style={props.style}
        />
    )
}

export default Component