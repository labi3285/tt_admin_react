import { useEffect, useRef, useState, useMemo } from 'react'
import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'

import { post } from '@/utils/request'

import { Permission, PermissionItem } from './types'


export interface Props {
  permission?: Permission,
  onChange?: () => void,
}
export default (props: Props) => {

  const [permissions, setPermissions] = useState<Permission[]>([])
  const menuOptions = useMemo(() => {
    return permissions.map(e => ({ value: e.code, label: e.name }))
  }, [permissions])

  useEffect(() => {
    if (props.permission) {
      queryRef.current = {
        permission_code: props.permission.code
      }
    }
    post('/permission/get').then(res => {
      setPermissions(res)
    })
  }, [props.permission])



  // --------------------------------------------- 查询 ---------------------------------------------
  const initQuery = () => {
    if (props.permission) {
      return {
        permission_code: props.permission.code
      }
    } else {
      return {}
    }
  }
  const queryRef = useRef<Record<string, any>>({})
  const onQuery = async (form: Record<string, any>) => {
    queryRef.current = form
    tableRef.current?.reload()
  }
  const onReset = () => {
  }
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: Table.Column<PermissionItem>[] = [
    { title: '权限码', valueKey: 'code', width: 200 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '菜单权限码', valueKey: 'menu_code', width: 200 },
    { title: '菜单名称', valueKey: 'permission_name', width: 150 },
  ]
  const tableOperationColumn = undefined
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/permission_item/get_with_permission_name', { ...queryRef.current, page_num, page_size })
    return {
      rows: page.list,
      total: page.total
    }
  }

  return (
    <>
      <Form.FormQuery initData={initQuery()} onReset={onReset} onSubmit={onQuery} >
        <Form.ItemQuery width={170} valueKey='code'>
          <Edit.Input placeholder="权限码" />
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