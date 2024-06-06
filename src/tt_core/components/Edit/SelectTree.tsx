
import { CSSProperties, ReactNode, useMemo } from 'react'
import { TreeSelect } from 'antd'
import { Option } from '../index'

export interface Props<T extends number | string> {
    value?: T,
    placeholder?: string
    onChange?: (value: T | undefined) => void
    options: Option<T>[]
    clear?: boolean
    disabled?: boolean
    loading?: boolean

    className?: string
    style?: CSSProperties
}
const Component = <T extends number | string>(props: Props<T>) => {

    const option2tree = (o: Option<T>) => {
        const children: any = o.children ? o.children.map(e => option2tree(e)) : null
        return {
            title: o.label,
            value: o.value,
            key: o.value,
            children
        }
    }
    const treeData = useMemo(() => {
        return props.options.map(e => option2tree(e))
    }, [props.options])
    const onChange = (value: any) => {
        console.log(value)
        if (props.onChange) {
            if (value === undefined || value === null || value === '') {
                props.onChange(undefined)
            } else {
                props.onChange(value)
            }
        }
    }
    return (
        <TreeSelect
            value={props.value}
            treeData={treeData}
            placeholder={props.placeholder || '请选择'}
            allowClear={props.clear || true}
            disabled={props.disabled}
            loading={props.loading}

            treeCheckable={true}
            showCheckedStrategy={TreeSelect.SHOW_PARENT}

            onChange={onChange}

            size='middle'
            className={props.className}
            style={props.style}
        />
    )
}

export default Component