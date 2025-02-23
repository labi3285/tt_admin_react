
import { CSSProperties, ReactNode, ChangeEvent, useState } from 'react'
import { Upload, Button } from 'antd'
import IconClose from '../res/icon_close.png'

import './index.scss'

export interface Props {
    value?: string
    placeholder?: string
    clear?: boolean
    disabled?: boolean

    tip?: string

    api: (file: File) => Promise<string>

    accept?: string

    onChange?: (value: string | undefined) => void


    className?: string
    style?: CSSProperties
}
const Component = (props: Props) => {
    //@ts-ignore
    const message = window.tt_message
    const [loading, setLoading] = useState(false)
    const onUpload = async (file: any) => {
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
    const uploadButton = (
        <Upload.Dragger
            accept={props.accept}
            disabled={props.disabled}
            showUploadList={false}
            customRequest={onUpload}

            className={props.className}
            style={props.style}
        >
            <p className="ant-upload-drag-icon">
            <i className="anticon anticon-inbox"></i>
            </p>
            <p className="ant-upload-text">点击或将拖拽文件到此区域</p>
            <p className="ant-upload-hint">{ props.tip || '上传单个文件'}</p>
        </Upload.Dragger>
    )
    return (
        <div className='upload-file'>
            {props.value &&
                <div className='upload-file__file'>
                    <Button>上传的文件</Button>
                    <img onClick={onClose} src={IconClose} />
                </div>
            }
            {!props.value && uploadButton}
        </div>
    )
}

export default Component