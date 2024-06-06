
import { CSSProperties, ReactNode, useMemo } from 'react'
import { Flex, Space, Button } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'

const ListItem = (props: {
    value: Record<string, any>
    children: ReactNode
    move?: boolean
    moveUp?: boolean
    moveDown?: boolean
    onAdd?: () => void
    onMinus?: () => void
    onMoveUp?: () => void
    onMoveDown?: () => void
}) => {
    return (
        <Flex gap='0 10px' align='flex-start'>
            {props.children}
            <Space>
                <Button onClick={props.onAdd} icon={<PlusOutlined />} />
                <Button onClick={props.onMinus} icon={<MinusOutlined />} />
                {props.move && <Button disabled={!props.moveUp} onClick={props.onMoveUp} icon={<ArrowUpOutlined />} />}
                {props.move && <Button disabled={!props.moveDown} onClick={props.onMoveDown} icon={<ArrowDownOutlined />} />}
            </Space>
        </Flex>
    )
}

export interface Props {
    value?: Record<string, any>[]
    itemRender: (value: Record<string, any>, i: number) => ReactNode
    onChange?: (value: Record<string, any>[] | undefined) => void
    disabled?: boolean
    move?: boolean

    limit?: number

    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {

    console.log(props.value)

    const onAdd = (i: number | null) => {
        if (props.onChange) {
            let arr = props.value
            if (arr === undefined || arr === null || arr.length === 0) {
                arr = []
            }
            if (i === null) {
                arr = [...arr, {}]
            } else {
                arr.splice(i, 0, {})
            }
            props.onChange([...arr])
        }
    }
    const onMinus = (i: number) => {
        if (props.onChange) {
            let arr = props.value
            if (arr === undefined || arr === null || arr.length === 0) {
                arr = []
            }
            arr.splice(i, 1)
            props.onChange([...arr])
        }
    }
    const onMoveUp = (i: number) => {
        if (props.onChange) {
            let arr = props.value
            if (arr === undefined || arr === null || arr.length === 0) {
                arr = []
            }
            const e = arr.splice(i, 1)[0]
            arr.splice(i - 1, 0, e)
            props.onChange([...arr])
        }
    }
    const onMoveDown = (i: number) => {
        if (props.onChange) {
            let arr = props.value
            if (arr === undefined || arr === null || arr.length === 0) {
                arr = []
            }
            const e = arr.splice(i, 1)[0]
            arr.splice(i + 1, 0, e)
            props.onChange([...arr])
        }
    }


    const nodes = useMemo(() => {
        const arr: ReactNode[] = []
        if (props.value) {
            props.value.forEach((e, i) => {
                arr.push(
                    <ListItem
                        key={i}
                        value={e}
                        move={props.move}
                        moveUp={i > 0}
                        moveDown={i < props.value!.length - 1}
                        onAdd={() => onAdd(i)}
                        onMinus={() => onMinus(i)}
                        onMoveUp={() => onMoveUp(i)}
                        onMoveDown={() => onMoveDown(i)}
                    >
                        {props.itemRender(e, i)}
                    </ListItem>
                )
            })
        }
        return arr
    }, [props.value])
    const add = () => {
        if (props.limit && props.value && props.value.length >= props.limit) {
            return ''
        } else {
            return <Button type="dashed" onClick={() => onAdd(null)} icon={<PlusOutlined />}>添加</Button>
        }
    }
    return (
        <Flex gap='10px 0' vertical={true} >{nodes}{add()}</Flex>
    )
}

export default Component