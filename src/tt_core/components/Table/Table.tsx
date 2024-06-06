
import { CSSProperties, ReactNode, useMemo } from 'react'
import { App, Table } from 'antd'
import type { TableProps } from 'antd'

import Empty from '../Placeholder/Empty'

import { ButtonType } from '../index'
import OperationItems  from './Operations/index'

export interface Column<T> {
    title: string
    width: number
    align?: 'left' | 'center' | 'right'
    valueKey?: string
    render?: (value: any, row: T, i: number, key?: string) => ReactNode
    show?: () => boolean
}

export interface OperationColumn<T> {
    title: string
    actions: Action<T>[]
    foldActions?: Action<T>[]
    width: number
    align?: 'left' | 'center' | 'right'
    render?: (row: T) => ReactNode
    show?: (row: T) => boolean
}

export interface ActionConfirm {
    title?: string
    message?: string
    cancelText?: string
    confirmText?: string
    icon?: ReactNode
}

export interface Action<T> {
    title: string
    type?: ButtonType
    icon?: ReactNode
    danger?: boolean
    onClick?: ((row: T, i: number) => void) | ((row: T, i: number) => Promise<void>)
    render?: (row: T) => ReactNode
    confirm?: ActionConfirm
    show?: (row: T) => boolean
}

export interface Props<T> {
    columns: Column<T>[]
    operationColumn?: OperationColumn<T>
    rows: T[]

    loading?: boolean

    emptyText?: string
    onRetry?: () => void

    className?: string
    style?: CSSProperties
}
const Component = <T extends object,>(props: Props<T>) => {

    //@ts-ignore
    const message = window.tt_message

    const columns: {
        array: TableProps<T>['columns'],
        totalWidth: number
    } = useMemo(() => {
        const arr: any[] = []
        let totalWidth = 0
        let key = 0
        for (const column of props.columns) {
            if (column.show && !column.show()) {
                continue
            }
            let render = null
            if (column.render) {
                render = (value: any, row: T, i: number) => {
                    return column.render!(value, row, i, column.valueKey)
                }
            }
            totalWidth += column.width
            arr.push({
                title: column.title,
                dataIndex: column.valueKey,
                width: column.width,
                align: column.align || 'left',
                key,
                render
            })
            key += 1
        }
        if (props.operationColumn) {
            totalWidth += props.operationColumn.width
            arr.push({
                title: '操作',
                width: props.operationColumn.width,
                key,
                fixed: 'right',
                align: props.operationColumn.align || 'center',
                render: (_: any, item: T, index: number) => {
                    return OperationItems(message, props.operationColumn!, item, index)
                }
            })
            key += 1
        }
        return {
            array: arr,
            totalWidth
        }
    }, [props.columns])

    const dataSource = useMemo(() => {
        const arr: any[] = []
        let i = 0
        for (const item of props.rows) {
            arr.push({
                ...item,
                key: i
            })
            i += 1
        }
        return arr
    }, [props.rows])

    const locale = useMemo(() => {
        return {
            emptyText: <Empty message={props.emptyText || '暂无数据'} onRetry={props.onRetry} />
        }
    }, [props.emptyText, props.onRetry])

    return (
        <Table
            className={props.className}
            style={props.style}

            locale={locale}

            loading={props.loading}
            scroll={{ x: columns.totalWidth }}
            pagination={false}
            columns={columns.array}
            dataSource={dataSource}
            />
    )
}

export default Component