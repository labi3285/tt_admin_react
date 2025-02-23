
import { Button } from 'antd'
import { ButtonType } from '../../index'

const Render = <T,>(options: {
    title?: string,
    type?: ButtonType,
    onClick?: (value: T) => void,
    titleHandler?: (value: any) => string
}) => {
    const title = (value: any) => {
        if (options.title) {
            return options.title
        } else if (options.titleHandler) {
            return options.titleHandler(value)
        } else {
            return '点击操作'
        }
    }
    return (value: any, row: T, __: number, ___?: string) => {
        return (
            <Button onClick={() => {
                options.onClick && options.onClick(row)
            }}>{title(value)}</Button>
        )
    }
}

export default Render