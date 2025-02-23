import { useEffect, useRef, useState, useMemo } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import { Option } from '@/tt_core/components/index'

import HouseAssemblyUnitStylePage from './house_assembly_unit_style'

import { post, upload } from '@/utils/request'

import { House, HousePart, HouseAssemblyUnit } from './types'

export interface Props {
  housePart?: HousePart,
  onChange?: () => void,
}
export default (props: Props) => {


  const modelTypeOptions: Option<number>[] = [
    { label: '组装件', value: 0, color: '#0b66dd' },
    { label: '背景', value: 1, color: '#a5a5a5' }
  ]

  const setup = () => {

  }

  // --------------------------------------------- 查询 ---------------------------------------------
  const onRefresh = () => {
    setup()
    tableRef.current?.reload()
  }
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<HouseAssemblyUnit>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '类型', valueKey: 'model_type', width: 150, render: Table.RenderTag(modelTypeOptions) },
    { title: '描述', valueKey: 'desc', width: 300 },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<HouseAssemblyUnit> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '样式',
        type: 'primary',
        onClick: (item: HouseAssemblyUnit, i: number) => {
          onEditAssemblyUnitStyles(item, i)
        },
      },
      {
        title: '编辑',
        type: 'default',
        onClick: (item: HouseAssemblyUnit, i: number) => {
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
        onClick: async (row: HouseAssemblyUnit, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/house_assembly_unit/get', {
      house_id: props.housePart?.house_id,
      part_id: props.housePart?.id,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<HouseAssemblyUnit | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm({
      house_id: props.housePart?.house_id,
      part_id: props.housePart?.id,
    })
  }
  const onEdit = (item: HouseAssemblyUnit, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const onEditAssemblyUnitStyles = (item: HouseAssemblyUnit, i: number) => {
    Dialog.dialog({
      title: '样式',
      width: 'calc(100vw - 30px)',
      children: (
        <HouseAssemblyUnitStylePage assemblyUnit={item} />
      ),
    })
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.id ? '/house_assembly_unit/edit' : '/house_assembly_unit/add', {
      id: itemRef.current?.id,
      house_id: props.housePart?.house_id,
      part_id: props.housePart?.id,
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
            <Form.Item label="类型" required={true} valueKey='model_type'>
              <Edit.Select options={modelTypeOptions} />
            </Form.Item>
            <Form.Item label="描述" valueKey='desc'>
              <Edit.InputField />
            </Form.Item>
          </Form.Section>
        </>
      ),
      onConfirm: doEdit
    })
  }

  // --------------------------------------------- 删除 ---------------------------------------------
  const doDelete = async (item: HouseAssemblyUnit, i: number) => {
    await post('/house_assembly_unit/del', { id: item.id })
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
