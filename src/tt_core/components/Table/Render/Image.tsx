

import Image from '../../Image/Image'

const Render = (options: {
    preview?: boolean,
    width: number,
    height?: number,
    placeholder?: string,
    handleSrc?: (value: any) => string
}) => {
    return (value: any, _: any, __: number, ___?: string) => {
        if (value === undefined || value === null || value === '') {
            if (!options.placeholder) {
                return undefined
            }
        }
        return (
            <Image
                value={options.handleSrc ? options.handleSrc(value) : value}
                preview={options.preview || true}
                width={options.width}
                height={options.height}
                placeholder={options?.placeholder}
                />
        )
    }
}

export default Render