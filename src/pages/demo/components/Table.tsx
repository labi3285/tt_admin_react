import { useState } from 'react'

import { Option } from '@/tt_core/components/index'
import * as Table from '@/tt_core/components/Table/index'

interface Item {
  aId: number,
  aShortText: string
  aBool: boolean
  aPic: string
  aPics: string[]
  aLongText: string
  aType: number
  aLabels: string[]
}
export default () => {

  const types: Option<number>[] = [
    { label: '类型0', value: 0, color: 'blue' },
    { label: '类型1', value: 1, color: 'pink' },
    { label: '类型2', value: 2, color: 'gray' },
  ]

  const columns: Table.Column<Item>[] = [
    { title: 'ID', valueKey: 'aId', width: 50 },
    { title: '类型', valueKey: 'aType', width: 50, render: Table.RenderTag(types) },
    { title: '短字符串', valueKey: 'aShortText', width: 100 },
    { title: '开关', valueKey: 'aBool', width: 50, render: Table.RenderSwitch({
    }) },

    { title: '图片', valueKey: 'aPic', width: 80, render: Table.RenderImage({ width: 60 }) },
    { title: '图片集', valueKey: 'aPics', width: 100, render: Table.RenderImages({ itemWidth: 40 }) },

    { title: '标签', valueKey: 'aLabels', width: 200, render: Table.RenderTags() },
    { title: '长字符串', valueKey: 'aLongText', width: 100 },
  ]
  const operationColum: Table.OperationColumn<Item> = {
    title: '操作',
    width: 200,
    actions: [
      {
        title: '操作1',
        onClick: (row: Item, i: number) => {
          console.log(row, i)
        },
      },
      {
        title: '操作2',
        type: 'primary',
        danger: true,
        confirm: {
          message: '你确定要操作2吗？'
        },
        onClick: async (row: Item, i: number) => {
          console.log(row, i)
          rows.splice(i, 1)
          setRows([...rows])
        }
      },
    ],
    foldActions: [
      {
        title: '操作3',
        type: 'primary',
        danger: true,
        confirm: {
          message: '你确定要操作3吗？'
        },
        onClick: async (row: Item, i: number) => {
          console.log(row, i)
          rows.splice(i, 1)
          setRows([...rows])
        }
      },
    ]
  }

  const [rows, setRows] = useState([
    {
      aId: 1,
      aShortText: 'Jack',
      aBool: true,
      aPic: '/demo/pic0.jpg',
      aPics: ['/demo/pic0.jpg', '/demo/pic1.jpg', '/demo/pic2.jpg', '/demo/pic3.jpg'],

      aLongText: 'ahdjskajdkas',
      aType: 0,
      aLabels: ['aa', 'bb']
    },
    {
      aId: 2,
      aShortText: 'Helen',
      aBool: false,
      aPic: '/demo/pic0.jpg',
      aPics: ['/demo/pic0.jpg', '/demo/pic1.jpg', '/demo/pic2.jpg', '/demo/pic3.jpg'],
      aLongText: 'ahdjskajdkas',
      aType: 1,
      aLabels: ['aa', 'bb']
    },
  ])

  return (
    <>
      <Table.Table columns={columns} operationColumn={operationColum} rows={rows} />
    </>
  )
}