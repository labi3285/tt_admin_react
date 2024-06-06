import { useEffect, useRef, useState } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import PermissionPage from './permission'

import { post } from '@/utils/request'

import { Menu } from './types'

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
  const tableColumns: Table.Column<Menu>[] = [
    { title: '权限码', valueKey: 'code', width: 150 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '更新时间', valueKey: 'update_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<Menu> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '权限列表',
        type: 'primary',
        onClick: (item: Menu, _: number) => {
          onItems(item)
        },
      },
      {
        title: '编辑',
        type: 'default',
        onClick: (item: Menu, i: number) => {
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
        onClick: async (row: Menu, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/permission_menu/get', {
      code: queryRef.current.code,
      name: queryRef.current.name,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<Menu | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm(undefined)
  }
  const onEdit = (item: Menu, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.code ? '/permission_menu/edit' : '/permission_menu/add', {
      code: itemRef.current?.code,
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
            <Form.Item label="权限码" required={true} valueKey='code'>
              <Edit.Input disabled={itemRef.current != null} />
            </Form.Item>
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
  const doDelete = async (item: Menu, i: number) => {
    await post('/permission_menu/del', { code: item.code })
    tableRef.current?.removeRow(i)
  }


  // --------------------------------------------- 子菜单 ---------------------------------------------
  const onItems = (menu: Menu) => {
    Dialog.dialog({
      title: '权限列表',
      width: 'calc(100vw - 30px)',
      children: (
        <PermissionPage menu={menu} />
      ),
    })
  }

  return (
    <>
      <Form.Form initData={queryRef.current} onReset={onReset} onSubmit={onQuery} >
        <Form.Section>
          <Form.Item label="权限码" valueKey='code'>
            <Edit.Input />
          </Form.Item>
          <Form.Item label="名称" valueKey='name'>
            <Edit.Input />
          </Form.Item>
          <Form.ItemQueryReset />
        </Form.Section>
      </Form.Form>
      <Table.Bar>
          <Button.Add onClick={onAdd} />
      </Table.Bar>
      <Table.PageTable ref={tableRef} columns={tableColumns} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
