
import { Image } from 'antd'

import PicImageFallback from '../res/pic_image_fallback.png'

export interface Props {
    value?: string
    preview?: boolean,
    width?: number,
    height?: number,
    placeholder?: string,
    onClick?: () => void
}
const Component = (props: Props) => {
    console.log(props.value, props.placeholder)
    return (
        <Image
            src={props.value ? props.value : props.placeholder}
            preview={props.preview}
            width={props.width}
            height={props.height}
            fallback={PicImageFallback}
            onClick={props.onClick}
            />
    )
}

export default Component