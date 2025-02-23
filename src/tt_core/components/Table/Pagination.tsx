
import { CSSProperties } from 'react'
import { Pagination, Flex } from 'antd'

export interface Props {
    total?: number

    page: number
    size: number

    sizeOptions?: number[]

    disabled?: boolean

    defaultPageOne?: boolean

    onSizeChange?: (size: number) => void
    onPageChange?: (page: number) => void

    className?: string
    style?: CSSProperties
}
 const Component = (props: Props) => {

    return (
        <Flex justify='flex-end'>
            <Pagination
                className={props.className}
                style={{ margin: '10px 0', ...props.style }}

                total={props.total}
                size='default'

                current={props.defaultPageOne ? props.page : props.page + 1}

                hideOnSinglePage={false}
                disabled={props.disabled}

                pageSize={props.size}
                pageSizeOptions={props.sizeOptions || [ 15, 30, 50, 100 ]}

                showSizeChanger
                showQuickJumper
                showTotal={total => (total != undefined && total != null) ? `共${total}条` : undefined }

                onChange={(page, _) => {
                    props.onPageChange && props.onPageChange(props.defaultPageOne ? page : page - 1)
                }}
                onShowSizeChange={(_, size) => {
                    props.onSizeChange && props.onSizeChange(size)
                }}
                />
        </Flex>
    )
}

export default Component