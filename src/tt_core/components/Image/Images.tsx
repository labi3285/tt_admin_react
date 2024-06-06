
import { ReactNode, useMemo, useState } from 'react'
import { Flex, Image as _Image } from 'antd'
import Image from './Image'

export interface Props {
    value?: string[]
    preview?: boolean,
    itemWidth: number,
    itemHeight?: number,
    itemMargin?: number
    showType?: '1' | '2' | '2x2' | '3' | '3x2' | '3x3' | '4' | '5',
}
const Component = (props: Props) => {
    const [index, setIndex] = useState(0)
    const onClick = (i: number) => {
        setIndex(i)
    }
    const image = (index: number, value: string, width: number, height: number | undefined) => {
        return <Image
            key={index}
            value={value}
            preview={props.preview}
            width={width}
            height={height}
            onClick={() => {
                onClick(index)
            }}
        />
    }
    const info = useMemo(() => {
        const nodes: ReactNode[] = []
        const gap = props.itemMargin || 2
        let limit = 1
        let width: number | undefined = undefined
        if (props.showType == '1') {
            limit = 1
            width = undefined
        } else if (props.showType == '2') {
            limit = 2
            width = undefined
        } else if (props.showType == '3') {
            limit = 3
            width = undefined
        } else if (props.showType == '4') {
            limit = 4
            width = undefined
        } else if (props.showType == '5') {
            limit = 5
            width = undefined
        } else if (props.showType == '2x2') {
            limit = 4
            if (props.value) {
                if (props.value.length <= 0) {
                    width = undefined
                } else if (props.value.length == 1) {
                    width = props.itemWidth
                } else {
                    width = props.itemWidth * 2 + gap
                }
            } else {
                width = undefined
            }
        } else if (props.showType == '3x2') {
            limit = 6
            if (props.value) {
                if (props.value.length <= 0) {
                    width = undefined
                } else if (props.value.length == 1) {
                    width = props.itemWidth
                } else if (props.value.length == 2) {
                    width = props.itemWidth * 2 + gap
                } else {
                    width = props.itemWidth * 3 + gap * 2
                }
            } else {
                width = undefined
            }
        } else if (props.showType == '3x3') {
            limit = 9
            if (props.value) {
                if (props.value.length <= 0) {
                    width = undefined
                } else if (props.value.length == 1) {
                    width = props.itemWidth
                } else if (props.value.length == 2) {
                    width = props.itemWidth * 2 + gap
                } else {
                    width = props.itemWidth * 3 + gap * 2
                }
            } else {
                width = undefined
            }
        } else {
            limit = -1
        }
        if (props.value) {
            props.value.forEach((value, i) => {
                if (i < limit || limit == -1) {
                    nodes.push(image(i, value, props.itemWidth, props.itemHeight))
                }
            })
        }
        return {
            nodes,
            width,
        }
    }, [props.value, props.showType, props.itemWidth, props.itemMargin])

    return (
        <_Image.PreviewGroup preview={{
            current: index,
            onChange: (i: number) => {
                setIndex(i)
            }
        }} items={props.value}>
            <Flex style={{ width: info.width }} wrap='wrap' gap={props.itemMargin || 2}>
                {info.nodes}
            </Flex>
        </_Image.PreviewGroup>
    )
}

export default Component