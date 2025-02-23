import { useEffect, useRef, useState, useMemo } from 'react'
import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Preview from '@/tt_core/components/Preview/index'
import * as Dialog from '@/tt_core/components/Dialog/index'


import { post } from '@/utils/request'

import { User, UserRole, UserRoleGroup } from './types'

export default () => {

  const [groups, setGroups] = useState<UserRoleGroup[]>([])
  const [roles, setRoles] = useState<UserRole[]>([])
  const groupOptions = useMemo(() => {
    return groups.map(e => {
      let color = '#666666'
      if (e.code == 'admin_group') {
        color = '#ff0000'
      }
      return { value: e.code, label: e.name, color }
    })
  }, [groups])
  const roleOptions = useMemo(() => {
    return roles.map(e => {
      return { value: e.code, label: e.name }
    })
  }, [groups])
  useEffect(() => {
    post('/user_role_group/get').then(res => {
      setGroups(res)
    })
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
  const tableColumns: () => Table.Column<User>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '账户名', valueKey: 'account', width: 150 },
    { title: '用户组', valueKey: 'role_group_code', width: 150, render: Table.RenderTag(groupOptions) },
    { title: '昵称', valueKey: 'nickname', width: 150 },
    { title: '电话', valueKey: 'phone', width: 150 },
    { title: '邮箱', valueKey: 'email', width: 150 },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<User> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '修改用户组',
        type: 'primary',
        show: (item: User) => !item.is_reserved,
        onClick: (item: User, i: number) => {
          onEditUserGroup(item, i)
        },
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/user/get', {
      ...queryRef.current,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<User | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm(undefined)
  }
  const onEditUserGroup = (item: User, _i: number) => {
    itemRef.current = item
    showEditUserRoleForm(item)
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.id ? '/user/edit' : '/user/add', {
      id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }
  const doEditUserGroup = async (form: Record<string, any>) => {
    await post('/user/edit_role_group', {
      id: itemRef.current?.id,
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
            <Form.Item label="账户名" required={true} valueKey='account'>
              <Edit.Input />
            </Form.Item>
            <Form.Item label="角色组" required={true} valueKey='role_group_code'>
              <Edit.Select options={groupOptions} />
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
  const showEditUserRoleForm = (initData: Record<string, any> | undefined) => {
    Form.dialog({
      title: '修改用户组',
      width: '500px',
      initData,
      children: (
        <>
          <Form.Section>
            <Form.Item label="账户名" required={true} valueKey='account'>
              <Preview.Text />
            </Form.Item>
            <Form.Item label="用户组" valueKey='role_group_code'>
              <Edit.Select options={groupOptions} />
            </Form.Item>
          </Form.Section>
        </>
      ),
      onConfirm: doEditUserGroup
    })
  }

  return (
    <>
      <Form.FormQuery initData={queryRef.current} onReset={onReset} onSubmit={onQuery} >
        <Form.ItemQuery width={170} valueKey='id'>
          <Edit.InputNumber placeholder='ID' controls={false} dec={0} />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='role_group_code'>
          <Edit.Select options={groupOptions} placeholder='角色组' />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='role_code'>
          <Edit.Select options={roleOptions} placeholder='角色' />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='account'>
          <Edit.Input placeholder='账号' />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='phone'>
          <Edit.Input placeholder='手机号' />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='email'>
          <Edit.Input placeholder='邮箱' />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='nickname'>
          <Edit.Input placeholder='昵称' />
        </Form.ItemQuery>
        <Form.ItemQueryReset />
      </Form.FormQuery>
      <Table.Bar>
        <Button.Add onClick={onAdd} />
      </Table.Bar>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
