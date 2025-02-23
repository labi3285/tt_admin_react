
import { CSSProperties, ReactNode, ChangeEvent, useState } from 'react'
import { App, Image, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import PicImageFallback from '../res/pic_image_fallback.png'
import IconClose from '../res/icon_close.png'

import './index.scss'

export interface Props {
    value?: string
    placeholder?: string
    clear?: boolean
    disabled?: boolean

    api: (file: File) => Promise<string>

    maxSize?: number

    onChange?: (value: string | undefined) => void


    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    //@ts-ignore
    const message = window.tt_message
    const [loading, setLoading] = useState(false)
    const onUpload = async (file: any) => {
        if (props.maxSize && file.size > props.maxSize) {
            message.error('视频过大');
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
            props.onChange && props.onChange(url)
        } catch (err: any) {
            if (!err.code || err.code > 0) {
                message.error(err.message || '系统异常')
            }
        } finally {
            setLoading(false)
        }
    }
    const onClose = () => {
        props.onChange && props.onChange(undefined)
    }
    const videoView = (
        <div className='upload-video__video'>
            <video
                src={props.value}
                controls
                width={'200px'}
                height={'160px'}
                />
            {(props.clear || true) && <img onClick={onClose} src={IconClose} className='upload-video__video__close' />}
        </div>
    )
    const uploadButton = (
        <Upload
            accept='.mp4'
            disabled={props.disabled}
            showUploadList={false}
            customRequest={onUpload}

            className={props.className}
            style={props.style}
        >
            <div className='upload-video__button'>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8, fontSize: '12px' }}>点击上传</div>
            </div>
        </Upload>
    )
    return (
        <div className='upload-video'>
            {props.value && videoView}
            {!props.value && uploadButton}
        </div>
    )
}

export default Component