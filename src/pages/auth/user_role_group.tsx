import { useEffect, useRef, useState, useMemo } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import { Option } from '@/tt_core/components/index'

import UserRolePage from './user_role'

import { post } from '@/utils/request'

import { UserRole, UserRoleGroup } from './types'

export default () => {

  const [roles, setRoles] = useState<UserRole[]>([])
  const rolesOptions = useMemo(() => {
    return roles.map(e => ({ value: e.id, label: e.name }))
  }, [roles])

  useEffect(() => {
    post('/user_role/get').then(res => {
      setRoles(res)
    })
  }, [])


  // --------------------------------------------- 查询 ---------------------------------------------
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
    { title: '更新时间', valueKey: 'update_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 150, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<UserRoleGroup> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '编辑',
        type: 'default',
        onClick: (item: UserRoleGroup, i: number) => {
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
        onClick: async (row: UserRoleGroup, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/user_role_group/get', {
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
  const itemRef = useRef<UserRoleGroup | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm(undefined)
  }
  const onEdit = (item: UserRoleGroup, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const onEditRole = () => {
    Dialog.dialog({
      title: '角色列表',
      width: 'calc(100vw - 30px)',
      children: (
        <UserRolePage />
      ),
    })
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.id ? '/user_role_group/edit' : '/user_role_group/add', {
      code: itemRef.current?.id,
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
            <Form.Item label="角色" required={true} valueKey='role_ids'>
              <Edit.SelectMultiple options={rolesOptions} />
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
  const doDelete = async (item: UserRoleGroup, i: number) => {
    await post('/user_role_group/del', { code: item.id })
    tableRef.current?.removeRow(i)
  }

  post('/user/get_my_info')


  return (
    <>
      <Form.Form initData={queryRef.current} onReset={onReset} onSubmit={onQuery} >
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
