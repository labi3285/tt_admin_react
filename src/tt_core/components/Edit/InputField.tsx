
import { CSSProperties, ReactNode, ChangeEvent, } from 'react'
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

    minRows?: number
    maxRows?: number
    maxLength?: number

    onChange?: (value: string | undefined) => void

    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onChange) {
            if (event.target.value === undefined || event.target.value === null || event.target.value === '') {
                props.onChange(undefined)
            } else {
                props.onChange(event.target.value)
            }
        }
    }
    return (
        <Input.TextArea
            value={props.value}
            placeholder={props.placeholder || '请输入内容'}
            allowClear={props.clear || true}
            disabled={props.disabled}

            autoSize={{ minRows: props.minRows || 3, maxRows: props.maxRows || 10 }}
            count={{ max: 99, show: true }}

            maxLength={props.maxLength || 9999}

            onChange={onChange}

            size='middle'
            className={props.className}
            style={{ marginBottom: '16px', ...props.style }}
        />
    )
}

export default Component