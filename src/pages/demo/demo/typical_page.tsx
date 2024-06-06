import { useRef, useState } from 'react'

import { Option } from '@/tt_core/components/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'

import { post } from '@/utils/demo_request'

import { Button } from 'antd'

interface Item {
  id: number,
  name: string
  pic?: string
  gender: number
  labels: string[]
  remark: string
}

export default () => {

  const [preview, setPreview] = useState(true)

  const genders: Option<number>[] = [
    { label: '男', value: 0, color: 'blue' },
    { label: '女', value: 1, color: 'pink' },
    { label: '其它', value: 2, color: 'gray' },
  ]

  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: Table.Column<Item>[] = [
    { title: 'ID', valueKey: 'id', width: 50 },
    { title: '性别', valueKey: 'gender', width: 50, render: Table.RenderTag(genders) },
    { title: '头像', valueKey: 'pic', width: 80, render: Table.RenderImage({ width: 60, placeholder: '/demo/default_user.jpg' }) },
    { title: '昵称', valueKey: 'name', width: 100 },
    { title: '标签', valueKey: 'labels', width: 200, render: Table.RenderTags() },
    { title: '备注', valueKey: 'remark', width: 200 },
  ]
  const tableOperationColumn: Table.OperationColumn<Item> = {
    title: '操作',
    width: 200,
    actions: [
      {
        title: '编辑',
        type: 'primary',
        onClick: (item: Item, i: number) => {
          onEdit(item, i)
        },
      },
    ],
    foldActions: [
      {
        title: '删除',
        type: 'primary',
        danger: true,
        confirm: {
          message: '你确定要删除吗？'
        },
        onClick: async (row: Item, i: number) => {
          await onDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page: number, size: number) => {
    const data: any = await post('/user_page', { page, size })
    return {
      rows: data.items,
      total: data.total
    }
  }

  const onDelete = async (item: Item, i: number) => {
    await post('/delete', { id: item.id })
    tableRef.current?.removeRow(i)
  }
  const onEdit = (item: Item, i: number) => {
    showEditForm(item, i)
  }
  const doEdit = async () => {
    await post('/edit', {})
    tableRef.current?.reload()
  }

  const showEditForm = (initData: Item | undefined, i: number) => {
    Form.dialog({
      title: '编辑内容',
      width: '500px',
      initData,
      
      children: (
        <>
          <Form.Section>
            <Form.Item label="性别" required={true} valueKey='gender'>
              <Edit.Select options={genders} />
            </Form.Item>
            <Form.Item label="姓名" required={true} valueKey='name'>
              <Edit.Input />
            </Form.Item>
            <Form.Item label="标签" required={true} valueKey='labels'>
              <Edit.EditTags />
            </Form.Item>
            <Form.Item label="备注" required={true} valueKey='remark'>
              <Edit.InputField />
            </Form.Item>
          </Form.Section>


          {/* <Button onClick={() => {
        setPreview(false)
      }}>xxxx</Button> */}
        </>
      ),
      onConfirm: doEdit
    })
  }

  return (
    <>
      <Table.PageTable ref={tableRef} columns={tableColumns} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}