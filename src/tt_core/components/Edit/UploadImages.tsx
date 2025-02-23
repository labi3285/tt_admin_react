
import { CSSProperties, ReactNode, ChangeEvent, useState } from 'react'
import { Image, Upload, Flex } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import PicImageFallback from '../res/pic_image_fallback.png'
import IconClose from '../res/icon_close.png'

import './index.scss'

export interface Props {
    value?: string[]
    placeholder?: string
    clear?: boolean
    disabled?: boolean

    api: (file: File) => Promise<string>

    maxSize?: number
    maxCount?: number

    onChange?: (value: string[] | undefined) => void


    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    //@ts-ignore
    const message = window.tt_message
    const [loading, setLoading] = useState(false)
    const onUpload = async (file: any) => {
        if (props.maxSize && file.size > props.maxSize) {
            message.error('图片过大');
            return
        }
        if (!props.api) {
            message.error('请设置上传api');
            return
        }
        console.log(file)
        setLoading(true)
        try {
            const url = await props.api(file.file)
            if (props.onChange) {
                const urls = props.value || []
                urls.push(url)
                props.onChange(urls)
            }
        } catch (err: any) {
            if (!err.code || err.code > 0) {
                message.error(err.message || '系统异常')
            }
        } finally {
            setLoading(false)
        }
    }
    const onClose = (i: number) => {
        if (props.onChange) {
            let urls = props.value || []
            urls.splice(i, 1)
            console.log(i, urls)
            if (urls.length > 0) {
                props.onChange([...urls])
            } else {
                props.onChange(undefined)
            }
        }
    }
    const imageViews = () => {
        let nodes: ReactNode[] = []
        if (props.value && props.value.length > 0) {
            for (let i = 0; i < props.value.length; i ++) {
                const url = props.value[i]
                nodes.push((
                    <div className='upload-images__image' key={i}>
                        <Image
                            src={url}
                            preview={true}
                            fallback={PicImageFallback}
                            width={'100px'}
                            height={'100px'}
                        />
                        {(props.clear || true) && <img onClick={() => {
                            onClose(i)
                        }} src={IconClose} className='upload-images__image__close' />}
                    </div>
                ))
            }
        }
        return nodes
    }
    const uploadButton = (
        <Upload
            accept='.png,.jpg'
            disabled={props.disabled}
            showUploadList={false}
            customRequest={onUpload}

            className={props.className}
            style={props.style}
        >
            
            <div className='upload-images__button'>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, fontSize: '12px' }}>点击上传</div>
            </div>
        </Upload>
    )
    return (
        <div className='upload-images'>
            <Flex gap={5} wrap='wrap'>
                {imageViews()}
                {props.value && props.value.length == props.maxCount ? '' : uploadButton}
            </Flex>
        </div>
    )
}

export default Component