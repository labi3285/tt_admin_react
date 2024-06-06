
import { ReactNode } from 'react'
import { Divider } from 'antd'

import './index.scss'

export interface Props {
    children?: ReactNode
}
export default (props: Props) => {
    return (
        <>
            <div className='form__title'>{props.children}</div>
            <Divider style={{ margin: '5px 0 20px 0' }} />
        </>
    )
}