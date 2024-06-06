
import { CSSProperties, ReactNode, useMemo, useState, useEffect, useRef, ChangeEvent } from 'react'
import { Tag, Input, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'

export interface Props {
    value?: string[],
    onChange?: (value: string[] | undefined) => void
    disabled?: boolean

    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    const inputRef = useRef<InputRef>(null)
    const [input, setInput] = useState(false)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (input) {
            inputRef.current?.focus()
        }
    }, [input])

    useEffect(() => {
        if (props.disabled) {
            setInput(false)
            setInputValue('')
            inputRef.current?.blur()
        }
    }, [props.disabled])

    const onAdd = () => {
        setInput(true)
    }
    const onRemove = (i: number) => {
        if (props.disabled) {
            return
        }
        const arr = props.value!
        arr.splice(i, 1)
        props.onChange && props.onChange(arr.length > 0 ? arr : undefined)
    }
    const nodes = useMemo(() => {
        const arr: ReactNode[] = []
        if (props.value) {
            props.value.forEach((v, i) => {
                arr.push(<Tag key={i} closeIcon onClose={() => {
                    onRemove(i)
                }}>{v}</Tag>)
            })
        }
        return arr
    }, [props.value])

    const onInputConfirm = () => {
        if (inputValue === undefined || inputValue === null || inputValue === '') {
        } else {
            if (props.value && props.value.length > 0) {
                if (inputValue && !props.value.includes(inputValue)) {
                    props.onChange && props.onChange([...props.value, inputValue])
                }
            } else {
                props.onChange && props.onChange([inputValue])
            }
        }
        setInputValue('')
        setInput(false)
    }
    const add = () => {
        if (input) {
            return <Input
                ref={inputRef}
                style={{ width: '60px' }}
                type="text"
                size="small"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInputValue(e.target.value)
                }}
                onBlur={onInputConfirm}
                onPressEnter={onInputConfirm}
            />
        } else {
            return <Tag style={{ borderStyle: 'dashed' }} icon={<PlusOutlined />} onClick={onAdd}>新标签</Tag>
        }
    }
    return (
        <Flex className={props.className} style={props.style} gap='4px 2px' wrap='wrap' >{nodes}{add()}</Flex>
    )
}

export default Component