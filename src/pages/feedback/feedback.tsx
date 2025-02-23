import { useEffect, useRef, useState, useMemo } from 'react'

import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'

// import FeedbackPage from './user_role'

import { post } from '@/utils/request'

import { Feedback } from './types'

export default () => {

  // --------------------------------------------- 查询 ---------------------------------------------
  const queryRef = useRef<Record<string, any>>({})
  const onQuery = async (form: Record<string, any>) => {
    queryRef.current = form
    tableRef.current?.reload()
  }
  const onReset = () => {
  }
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<Feedback>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '封面', valueKey: 'pic', width: 150, render: Table.RenderImage({ width: 130 }) },
    { title: '描述', valueKey: 'content', width: 400 },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<Feedback> = {
    title: '操作',
    width: 180,
    actions: [
    ],
    foldActions: [
      {
        title: '删除',
        type: 'primary',
        danger: true,
        confirm: { message: '你确定要删除吗？' },
        onClick: async (row: Feedback, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/feedback/get', {
      ...queryRef.current,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 删除 ---------------------------------------------
  const doDelete = async (item: Feedback, i: number) => {
    await post('/user_role_group/del', { code: item.id })
    tableRef.current?.removeRow(i)
  }

  return (
    <>
      <Form.FormQuery initData={queryRef.current} onReset={onReset} onSubmit={onQuery} >
          <Form.ItemQuery width={170} valueKey='id'>
            <Edit.InputNumber placeholder='ID' controls={false} dec={0} />
          </Form.ItemQuery>
          <Form.ItemQueryReset />
      </Form.FormQuery>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
