import { useEffect, useRef, useState, useMemo } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import HouseAssemblyUnitPage from './house_assembly_unit'

import { post, upload } from '@/utils/request'

import { House, HousePart } from './types'

export interface Props {
  house?: House,
  onChange?: () => void,
}
export default (props: Props) => {

  const setup = () => {
  }

  // --------------------------------------------- 查询 ---------------------------------------------
  const onRefresh = () => {
    setup()
    tableRef.current?.reload()
  }
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<HousePart>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<HousePart> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '组件',
        type: 'primary',
        onClick: (item: HousePart, i: number) => {
          onEditAssemblyUnits(item, i)
        },
      },
      {
        title: '编辑',
        type: 'default',
        onClick: (item: HousePart, i: number) => {
          onEdit(item, i)
        },
      },
    ],
    foldActions: [
      {
        title: '删除',
        type: 'primary',
        danger: true,
        confirm: { message: '你确定要删除吗？' },
        onClick: async (row: HousePart, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/house_part/get', {
      house_id: props.house?.id,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<HousePart | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm({
      house_id: props.house?.id
    })
  }
  const onEdit = (item: HousePart, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const onEditAssemblyUnits = (item: HousePart, i: number) => {
    Dialog.dialog({
      title: '组件',
      width: 'calc(100vw - 30px)',
      children: (
        <HouseAssemblyUnitPage housePart={item} />
      ),
    })
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.id ? '/house_part/edit' : '/house_part/add', {
      id: itemRef.current?.id,
      house_id: props.house?.id,
      ...form
    })
    tableRef.current?.reload()
  }
  const showEditForm = (initData: Record<string, any> | undefined) => {
    Form.dialog({
      title: itemRef.current ? '编辑' : '新增',
      width: '500px',
      initData,
      children: (
        <>
          <Form.Section>
            <Form.Item label="名称" required={true} valueKey='name'>
              <Edit.Input />
            </Form.Item>
          </Form.Section>
        </>
      ),
      onConfirm: doEdit
    })
  }

  // --------------------------------------------- 删除 ---------------------------------------------
  const doDelete = async (item: HousePart, i: number) => {
    await post('/house_part/del', { id: item.id })
    tableRef.current?.removeRow(i)
  }

  return (
    <>
      <Table.Bar>
        <Button.Refresh onClick={onRefresh} />
        <Button.Add onClick={onAdd} />
      </Table.Bar>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
