
import { Option } from '../../index'

import Tag from '../../Tag/index'

const Render = <T,O extends number | string>(options: Option<O>[]) => {
    return (value: any, _: T, __: number, ___?: string) => {
        if (value === undefined || value === null || value === '') {
            return undefined
        }
        return (
            <Tag value={value} options={options} />
        )
    }
}

export default Render