import { useEffect, useRef, useState, useMemo } from 'react'
import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import { post } from '@/utils/request'

import { PermissionTree, UserRole } from './types'

export interface Props {
  onChange?: () => void,
}
export default (props: Props) => {

  const [PermissionTree, setPermissionTree] = useState<PermissionTree[]>([])
  const menuOptions = useMemo(() => {
    const tree = (e: PermissionTree) => {
      let option: any = { value: e.code, label: e.name }
      if (e.items) {
        option.children = e.items.map(e => ({ value: e.code, label: e.name }))
      }
      return option
    }
    return PermissionTree.map(e => tree(e))
  }, [PermissionTree])

  useEffect(() => {
    post('/permission/get_tree').then(res => {
      setPermissionTree(res)
    })
  }, [])


  // --------------------------------------------- 查询 ---------------------------------------------
  const initQuery = () => { return {} }
  const queryRef = useRef<Record<string, any>>({})
  const onQuery = async (form: Record<string, any>) => {
    queryRef.current = form
    tableRef.current?.reload()
  }
  const onReset = () => {
  }


  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<UserRole>[] = () => [
    { title: '角色码', valueKey: 'code', width: 200 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '描述', valueKey: 'desc', width: 300 },
  ]

  const tableOperationColumn = undefined
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/user_role/get', { ...queryRef.current, page_num, page_size })
    return {
      rows: page.list,
      total: page.total
    }
  }

  return (
    <>
      <Form.FormQuery initData={initQuery()} onReset={onReset} onSubmit={onQuery} >
        <Form.ItemQuery width={170} valueKey='code'>
          <Edit.Input placeholder="角色码" />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='search'>
          <Edit.Input placeholder="搜索" />
        </Form.ItemQuery>
        <Form.ItemQueryReset />
      </Form.FormQuery>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}