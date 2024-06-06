import { useEffect, useRef, useState, useMemo } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'

import { post } from '@/utils/request'

import { Menu, Permission } from './types'


export interface Props {
  menu?: Menu,
  onChange?: () => void,
}
export default (props: Props) => {

  const [menus, setMenus] = useState<Menu[]>([])
  const menuOptions = useMemo(() => {
    return menus.map(e => ({ value: e.code, label: e.name }))
  }, [menus])

  useEffect(() => {
    if (props.menu) {
      queryRef.current = {
        menu_code: props.menu.code
      }
    }
    post('/permission_menu/get').then(res => {
      setMenus(res)
    })
  }, [props.menu])



  // --------------------------------------------- 查询 ---------------------------------------------
  const initQuery = () => {
    if (props.menu) {
      return {
        menu_code: props.menu.code
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
  const tableColumns: Table.Column<Permission>[] = [
    { title: '权限码', valueKey: 'code', width: 150 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '菜单权限码', valueKey: 'menu_code', width: 150 },
    { title: '菜单名称', valueKey: 'menu_name', width: 150 },
    { title: '更新时间', valueKey: 'update_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<Permission> = {
    title: '操作',
    width: 200,
    actions: [
      {
        title: '编辑',
        type: 'primary',
        onClick: (item: Permission, i: number) => {
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
        onClick: async (row: Permission, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/permission/get_with_menu_name', { ...queryRef.current, page_num, page_size })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<Permission | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm({
      menu_code: queryRef.current?.menu_code
    })
  }
  const onEdit = (item: Permission, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current ? '/permission/edit' : '/permission/add', {
      code: itemRef.current?.code,
      menu_code: itemRef.current?.menu_code,
      ...form
    })
    tableRef.current?.reload()
  }
  const showEditForm = (initData: Record<string, any> | undefined) => {
    Form.dialog({
      title: itemRef.current ? '编辑' : '新增',
      width: '400px',
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
            <Form.Item label="权限菜单" required={true} valueKey='menu_code'>
              <Edit.Select disabled={itemRef.current != null} options={menuOptions} />
            </Form.Item>
          </Form.Section>
        </>
      ),
      onConfirm: doEdit
    })
  }

  // --------------------------------------------- 删除 ---------------------------------------------
  const doDelete = async (item: Permission, i: number) => {
    await post('/permission/del', { code: item.code })
    tableRef.current?.removeRow(i)
  }

  return (
    <>
      <Form.Form initData={initQuery()} onReset={onReset} onSubmit={onQuery} >
        <Form.Section>
          <Form.Item label="权限码" valueKey='code'>
            <Edit.Input />
          </Form.Item>
          <Form.Item label="菜单权限码" valueKey='menu_code'>
            <Edit.Select options={menuOptions} />
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