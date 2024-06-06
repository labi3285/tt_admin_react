import { useRef } from 'react'

import * as Table from '@/tt_core/components/Table/index'
import { post } from '@/utils/demo_request'

interface Item {
  aId: number,
  aShortText: string
}

export default () => {

  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: Table.Column<Item>[] = [
    { title: 'ID', valueKey: 'aId', width: 50 },
    { title: '短字符串', valueKey: 'aShortText', width: 100 },
  ]
  const tableOperationColumn: Table.OperationColumn<Item> = {
    title: '操作',
    width: 200,
    actions: [
      {
        title: '删除',
        type: 'primary',
        danger: true,
        onClick: (row: Item, i: number) => {
          console.log(row, i)
          tableRef.current?.removeRow(i)
        },
      },
    ],
  }
  const onLoad = async (page: number, size: number) => {
    const data: any = await post('/page', { page, size }, {
      items: [
        {
          aId: 1,
          aShortText: 'Jack',
          aLongText: 'ahdjskajdkas',
          aType: 0,
          aLabels: ['aa', 'bb']
        },
        {
          aId: 2,
          aShortText: 'Helen',
          aLongText: 'ahdjskajdkas',
          aType: 1,
          aLabels: ['aa', 'bb']
        },
      ],
      total: 99
    })
    return {
      rows: data.items,
      total: data.total
    }
  }

  return (
    <>
      <Table.PageTable ref={tableRef} columns={tableColumns} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}