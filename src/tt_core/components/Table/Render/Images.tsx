
import Images from '../../Image/Images'

const Render = (options: {
    preview?: boolean,
    itemWidth: number,
    itemHeight?: number,
    handleSrc?: (value: any) => string
}) => {
    return (value: any, _: any, __: number, ___?: string) => {
        if (value === undefined || value === null || value === '' || value.length == 0) {
            return undefined
        }
        return (
            <Images
                value={options?.handleSrc ? options.handleSrc(value) : value}
                preview={options?.preview || true}
                itemWidth={options.itemWidth}
                itemHeight={options.itemHeight}
                />
        )
    }
}

export default Render