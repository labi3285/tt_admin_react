
import { CSSProperties, ChangeEvent, ReactNode, useState, useRef, useEffect, MouseEvent, useMemo } from 'react'
import { Space, Button, Modal } from 'antd'

import './index.scss'

import { UploadOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { Item } from './types'
import { Add } from '../../Button'

import UploadImage from '../UploadImage'


export interface Props {
    value?: string,
    loading?: boolean
    disabled?: boolean
    onChange?: (value: string | undefined) => void

    uploadImageApi: (file: File) => Promise<string>

    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {

    //@ts-ignore
    const message = window.tt_message

    const itemsRef = useRef<Item[]>([])
    const selectIndexRef = useRef(-1)

    useEffect(() => {
        if (props.value) {
            const items = JSON.parse(props.value)
            itemsRef.current = items
            updateNodes()
        } else {
            itemsRef.current = []
            updateNodes()
        }
    }, [props.value])

    const onChange = () => {
        const arr: Item[] = []
        for (const e of itemsRef.current) {
            if (e.content) {
                arr.push(e)
            }
        }
        if (arr.length > 0) {
            const value = JSON.stringify(arr)
            props.onChange && props.onChange(value)
        } else {
            props.onChange && props.onChange(undefined)
        }
    }

    const onAdd = (i: number) => {
        selectIndexRef.current = i
        updateNodes()
    }
    const onMinus = (i: number) => {
        let arr = [...itemsRef.current]
        arr.splice(i, 1)
        itemsRef.current = arr
        selectIndexRef.current = -1
        updateNodes()
        onChange()
    }
    const onAddText = (i: number) => {
        let arr = [...itemsRef.current]
        arr.splice(i, 0, {
            type: 'text',
        })
        itemsRef.current = arr
        selectIndexRef.current = -1
        updateNodes()
    }

    const [uploadImage, setUploadImage] = useState(false)
    const imageIndexRef = useRef(-1)
    const onAddImage = (i: number) => {
        imageIndexRef.current = i
        setUploadImage(true)
    }
    const onImageCancel = () => {
        imageIndexRef.current = -1
        setUploadImage(false)
    }
    const onImageChange = (value: string | undefined) => {
        if (value) {
            let arr = [...itemsRef.current]
            arr.splice(imageIndexRef.current, 0, {
                type: 'image',
                content: value
            })
            itemsRef.current = arr
            selectIndexRef.current = -1
            onImageCancel()
            updateNodes()
            onChange()
        }
    }

    const onTextChange = (i: number, e: ChangeEvent<HTMLTextAreaElement>) => {
        let arr = [...itemsRef.current]
        arr[i].content = e.target.value
        itemsRef.current = arr
        onChange()
    }

    const [nodes, setNodes] = useState<ReactNode[]>([])
    const updateNodes = () => {
        const arr: ReactNode[] = []
        const AddItem = (i: number) => {
            return (
                <div className='item-add' key={'add' + i} onClick={() => onAdd(i)} >
                    { selectIndexRef.current != i && <PlusOutlined /> }
                    { selectIndexRef.current == i && <Space>
                        <Button onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation()
                            onAddText(i)
                        }}>文本</Button>
                        <Button onClick={(e: MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation()
                            onAddImage(i)
                        }}>图片</Button>
                    </Space> }
                </div>
            )
        }
        // arr.push(AddItem(0))
        itemsRef.current.map((item, i) => {
            let content: ReactNode;
            if (item.type == 'text') {
                content =
                <div className='content content-text'>
                    <textarea
                        value={itemsRef.current[i].content}
                        placeholder='输入文本'
                        onChange={(v: ChangeEvent<HTMLTextAreaElement>) => { onTextChange(i, v) }}
                    />
                </div>
            } else if (item.type == 'image') {
                content =
                <div className='content content-image'>
                    <img src={itemsRef.current[i].content} />
                </div>
            }
            arr.push(
                <div className='item' key={i}>
                    {content}
                    <div className='edit'>
                        <Space>
                            <Button onClick={() => onMinus(i)} icon={<MinusOutlined />} />
                        </Space>
                    </div>
                </div>
            )
            // arr.push(AddItem(i + 1))
        })
        arr.push(AddItem(itemsRef.current.length))

        setNodes(arr)
    }

    useEffect(() => {
        updateNodes()
    }, [])

    return (
        <>
            <div
                className={props.className + ' tt-rich-content'}
                style={props.style}
                >
                {nodes}
            </div>

            <Modal
                title="上传图片"
                open={uploadImage}
                width="200px"
                onCancel={onImageCancel}
                footer={(<></>)}
            >
                <UploadImage api={props.uploadImageApi} onChange={onImageChange} />
            </Modal>
            
        </>

    )
}

export default Component