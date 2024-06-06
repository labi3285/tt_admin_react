import { formatTimestamp } from '../../../utils/date'

const Render = <T,>(format: string) => {
    return (value: any, _: T, __: number, ___?: string) => {
        if (value === undefined || value === null || value === '') {
            return undefined
        }
        return (
            formatTimestamp(value, format)
        )
    }
}

export default Render