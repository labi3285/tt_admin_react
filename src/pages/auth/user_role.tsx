import { useEffect, useRef, useState, useMemo } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import { post } from '@/utils/request'

import { MenuTree, UserRole } from './types'

export interface Props {
  onChange?: () => void,
}
export default (props: Props) => {

  const [menuTree, setMenuTree] = useState<MenuTree[]>([])
  const menuOptions = useMemo(() => {
    const tree = (e: MenuTree) => {
      let option: any = { value: e.code, label: e.name }
      if (e.permissions) {
        option.children = e.permissions.map(e => ({ value: e.code, label: e.name }))
      }
      return option
    }
    return menuTree.map(e => tree(e))
  }, [menuTree])

  useEffect(() => {
    post('/permission_menu/get_tree').then(res => {
      setMenuTree(res)
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
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '描述', valueKey: 'desc', width: 300 },
    { title: '启用', valueKey: 'status', width: 50, render: Table.RenderSwitch({
      valueType: 'number_0/1',
      onChange: onStatusChange
    }) },

    { title: '更新时间', valueKey: 'update_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]



  const tableOperationColumn: Table.OperationColumn<UserRole> = {
    title: '操作',
    width: 200,
    actions: [
      {
        title: '编辑',
        type: 'default',
        onClick: async (item: UserRole, i: number) => {
          await onEdit(item, i)
        },
      },
    ],
    foldActions: [
      {
        title: '删除',
        type: 'primary',
        danger: true,
        confirm: { message: '你确定要删除吗？' },
        onClick: async (row: UserRole, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/user_role/get', { ...queryRef.current, page_num, page_size })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<UserRole | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm({
      menu_code: queryRef.current?.menu_code
    })
  }
  const onEdit = async (item: UserRole, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current ? '/user_role/edit' : '/user_role/add', {
      id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }
  const onStatusChange = async (val: number, row: any) => {
    await post('/user_role/edit_status', {
      id: row.id, status: val
    })
  }

  const showEditForm = (initData: Record<string, any> | undefined) => {
    Form.dialog({
      title: itemRef.current ? '编辑' : '新增',
      width: '400px',
      initData,
      children: (
        <>
          <Form.Section>
            <Form.Item label="名称" required={true} valueKey='name'>
              <Edit.Input />
            </Form.Item>
            <Form.Item label="权限" valueKey='permission_codes'>
              <Edit.SelectTree options={menuOptions} />
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
  const doDelete = async (item: UserRole, i: number) => {
    await post('/user_role/del', { code: item.id })
    tableRef.current?.removeRow(i)
  }

  return (
    <>
      <Form.Form initData={initQuery()} onReset={onReset} onSubmit={onQuery} >
        <Form.Section>
          <Form.Item label="ID" valueKey='id'>
            <Edit.InputNumber controls={false} dec={0} />
          </Form.Item>
          <Form.Item label="关键词" valueKey='search'>
            <Edit.Input />
          </Form.Item>
          <Form.ItemQueryReset />
        </Form.Section>
      </Form.Form>
      <Table.Bar>
        <Button.Add onClick={onAdd} />
      </Table.Bar>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}