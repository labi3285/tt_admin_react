import { CSSProperties } from 'react'

export interface Props {
    width?: number | string
    height?: number | string
    fill?: string

    className?: string
    style?: CSSProperties
}
export default (props: Props) => {
    return (
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3234"
            width={props.width}
            height={props.height}
            fill={props.fill || '#FF0000'}
            className={props.className}
            style={props.style}
            >
            <path d="M509.262713 5.474574c281.272162 0 509.262713 228.02238 509.262713 509.262713 0 281.272162-227.990551 509.262713-509.262713 509.262713s-509.262713-227.990551-509.262713-509.262713c0-281.240333 227.990551-509.262713 509.262713-509.262713z m135.050106 278.725849L509.262713 419.250528l-135.050106-135.050105-90.012184 90.012184L419.186871 509.262713l-135.018277 135.081935 90.012184 90.012184L509.262713 599.274897l135.050106 135.050106 90.012184-90.012184L599.274897 509.262713l135.050106-135.050106-90.012184-90.012184z" p-id="3235"></path>
        </svg>
    )
}

