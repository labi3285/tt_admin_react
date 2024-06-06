import { ReactNode } from 'react'
import { Flex } from 'antd'

import { Option } from '../../index'

import Tag from '../../Tag/index'

const Render = <T,O extends number | string>(options?: Option<O>[]) => {
    return (values: any[], _: T, __: number, ___?: string) => {
        if (values == undefined || values == null || values.length == 0) {
            return undefined
        }
        const nodes: ReactNode[] = []
        let i = 0
        for (const value of values) {
            nodes.push(<Tag key={i} value={value} options={options} />)
            i += 1
        }
        return (
            <Flex gap='4px 2px' wrap='wrap' >{nodes}</Flex>
        )
    }
}

export default Render