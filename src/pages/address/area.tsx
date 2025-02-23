import { useRef } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'

import { Option } from '@/tt_core/components/index'

import { post } from '@/utils/request'

import { City, Area } from './types'

export interface Props {
  city?: City,
  onChange?: () => void,
}
export default (props: Props) => {

  const openOptions: Option<boolean>[] = [
    { label: '开放', value: true },
    { label: '不开放', value: false }
  ]

  // --------------------------------------------- 查询 ---------------------------------------------
  const initQuery = () => {
    if (props.city) {
      queryRef.current = {
        province_code: props.city.province_code,
        city_code: props.city.code,
      }
      return {
        province_code: props.city.province_code,
        city_code: props.city.code,
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
  const tableColumns: () => Table.Column<Area>[] = () => [
    { title: '编码', valueKey: 'code', width: 100 },
    { title: '名称', valueKey: 'name', width: 300 },
    {
      title: '开放', valueKey: 'is_open', width: 50, render: Table.RenderSwitch({
        valueType: 'boolean',
        onChange: onOpenChange
      })
    },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<Area> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '编辑',
        type: 'default',
        onClick: (item: Area, i: number) => {
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
        onClick: async (row: Area, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/area/get', {
      ...queryRef.current,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<Area | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm({
      province_code: queryRef.current?.province_code,
      city_code: queryRef.current?.city_code,
    })
  }
  const onEdit = (item: Area, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.code ? '/area/edit' : '/area/add', {
      code: itemRef.current?.code,
      ...form
    })
    tableRef.current?.reload()
  }
  const onOpenChange = async (val: boolean, row: any) => {
    await post('/area/edit_open', {
      code: row.code, is_open: val
    })
  }
  const showEditForm = (initData: Record<string, any> | undefined) => {
    Form.dialog({
      title: itemRef.current ? '编辑' : '新增',
      width: '500px',
      initData,
      children: (
        <>
          <Form.Section>
            <Form.Item label="编码" required={true} valueKey='code'>
              <Edit.Input disabled={itemRef.current != undefined} />
            </Form.Item>
            <Form.Item label="城市编码" required={true} valueKey='city_code'>
              <Edit.Input disabled={true} />
            </Form.Item>
            <Form.Item label="省份编码" required={true} valueKey='province_code'>
              <Edit.Input disabled={true} />
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
  const doDelete = async (item: Area, i: number) => {
    await post('/area/del', { code: item.code })
    tableRef.current?.removeRow(i)
  }

  return (
    <>
      <Form.FormQuery initData={initQuery()} onReset={onReset} onSubmit={onQuery} >
        <Form.ItemQuery width={170} valueKey='code'>
          <Edit.Input placeholder="编码" />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='city_code'>
          <Edit.Input />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='province_code'>
          <Edit.Input placeholder="省份编码" />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='search'>
          <Edit.Input placeholder="名称" />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='is_open'>
          <Edit.Select placeholder="开放" options={openOptions} />
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
