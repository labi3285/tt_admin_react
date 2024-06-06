
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

    maxLength?: number

    onChange?: (value: string | undefined) => void
    onSearch?: (value: string | undefined) => void

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
    const onSearch = () => {
        if (props.onSearch) {
            if (props.value === undefined || props.value === null || props.value === '') {
                props.onSearch(undefined)
            } else {
                props.onSearch(props.value)
            }
        }
    }
    return (
        <Input.Search
            value={props.value}
            placeholder={props.placeholder || '请输入搜索内容'}
            allowClear={props.clear || true}
            disabled={props.disabled}

            prefix={props.prefix}
            suffix={props.suffix}
            addonBefore={props.addBefore}
            addonAfter={props.addAfter}

            maxLength={props.maxLength || 255}

            enterButton='搜索'

            onChange={onChange}
            onSearch={onSearch}

            size='middle'
            className={props.className}
            style={props.style}
        />
    )
}

export default Component