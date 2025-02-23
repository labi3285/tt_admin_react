
import { CSSProperties, useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import { Column, OperationColumn } from './Table'
import Table from './Table'
import Pagination from './Pagination'

export interface Interface {
    reload: () => void
    removeRow: (i: number) => void
}
export interface Props<T> {
    columns: Column<T>[]
    operationColumn?: OperationColumn<T>

    onLoad: (page: number, size: number) => Promise<{
        rows: T[],
        total?: number
    }>

    defaultPageOne?: boolean
    preventDefaultLoad?: boolean
    page_sizeOptions?: number[]

    className?: string
    style?: CSSProperties
}
const Component = <T extends object>(props: Props<T>, ref: any) => {

    //@ts-ignore
    const message = window.tt_message

    const [rows, setRows] = useState<T[]>([])
    const [total, setTotal] = useState<number | undefined>(undefined)
    const pageNumRef = useRef(props.defaultPageOne ? 1 : 0)
    const pageSizeRef = useRef(15)

    // const [page_num, setPageNum] = useState(props.defaultPageOne ? 1 : 0)
    // const [page_size, setPageSize] = useState(15)
    const [loading, setLoading] = useState(false)
    const [emptyText, setEmptyText] = useState<string | undefined>()

    const onPageChange = (pageNum: number) => {
        pageNumRef.current = pageNum
        loadData()
    }
    const onPageSizeChange = (pageSize: number) => {
        pageSizeRef.current = pageSize
        loadData()
    }
    const loadData = () => {
        setLoading(true)
        props.onLoad(pageNumRef.current, pageSizeRef.current).then(data => {
            setRows(data.rows)
            setTotal(data.total)
            setEmptyText(undefined)
        }).catch(err => {
            setRows([])
            setTotal(undefined)
            setEmptyText(err.message || '系统异常')
            if (!err.code || err.code > 0) {
                message.error(err.message || '系统异常')
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (!props.preventDefaultLoad) {
            setTimeout(() => {
                loadData()
            }, 10);
        }
    }, [])

    useImperativeHandle<any, Interface>(ref, () => ({
        reload() {
            loadData()
        },
        removeRow(i: number) {
            rows.splice(i, 1)
            setRows([...rows])
        }
    }))

    return (
        <>
            <Table<T>
                columns={props.columns}
                operationColumn={props.operationColumn}
                rows={rows}
                loading={loading}
                emptyText={emptyText}
                onRetry={loadData}
                />

            <Pagination
                total={total}
                page={pageNumRef.current}
                size={pageSizeRef.current}
                disabled={loading}
                sizeOptions={props.page_sizeOptions}
                defaultPageOne={props.defaultPageOne}
                onPageChange={onPageChange}
                onSizeChange={onPageSizeChange}
                />
        </>
    )
}

export default forwardRef<Interface, Props<any>>(Component)