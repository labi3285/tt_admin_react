import { useEffect, useRef, useState } from 'react'
import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import PermissionItemPage from './permission_item'

import { post } from '@/utils/request'

import { Permission } from './types'

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
  const tableColumns: Table.Column<Permission>[] = [
    { title: '菜单码', valueKey: 'code', width: 200 },
    { title: '名称', valueKey: 'name', width: 150 },
  ]
  const tableOperationColumn: Table.OperationColumn<Permission> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '权限列表',
        type: 'primary',
        onClick: (item: Permission, _: number) => {
          onItems(item)
        },
      },
    ],
    foldActions: []
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/permission/get', {
      code: queryRef.current.code,
      name: queryRef.current.name,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 子菜单 ---------------------------------------------
  const onItems = (item: Permission) => {
    Dialog.dialog({
      title: '权限列表',
      width: 'calc(100vw - 30px)',
      children: (
        <PermissionItemPage permission={item} />
      ),
    })
  }

  return (
    <>
      <Form.FormQuery initData={queryRef.current} onReset={onReset} onSubmit={onQuery} >
        <Form.ItemQuery width={170} valueKey='code'>
          <Edit.Input placeholder="菜单码" />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='name'>
          <Edit.Input placeholder="菜单名称" />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='menu_code'>
          <Edit.Input placeholder="菜单码" />
        </Form.ItemQuery>
        <Form.ItemQueryReset />
      </Form.FormQuery>
      <Table.PageTable ref={tableRef} columns={tableColumns} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
