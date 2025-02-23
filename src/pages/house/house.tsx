import { useEffect, useRef, useState, useMemo } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import HousePartPage from './house_part'

import { post, upload } from '@/utils/request'

import { House } from './types'

export default () => {

  useEffect(() => {
    setup()
  }, [])

  const setup = () => {
  }

  // --------------------------------------------- 查询 ---------------------------------------------
  const onRefresh = () => {
    setup()
    tableRef.current?.reload()
  }
  const queryRef = useRef<Record<string, any>>({})
  const onQuery = async (form: Record<string, any>) => {
    queryRef.current = form
    tableRef.current?.reload()
  }
  const onReset = () => {
  }
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<House>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '封面', valueKey: 'pic', width: 200, render: Table.RenderImage({ width: 160 }) },
    { title: '描述', valueKey: 'desc', width: 300 },
    {
      title: '发布', valueKey: 'is_publish', width: 80, render: Table.RenderSwitch({
        valueType: 'boolean',
        onChange: onPublishChange
      })
    },
    { title: '中心点', valueKey: 'center_model_url', width: 100, render: Table.RenderButton({ onClick: onEditCenter, titleHandler: (v: any) => v ? '编辑' : '添加' }) },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<House> = {
    title: '操作',
    width: 220,
    actions: [
      {
        title: '详情',
        type: 'primary',
        onClick: (item: House, i: number) => {
          onEditDetail(item, i)
        },
      },
      {
        title: '分组',
        type: 'primary',
        onClick: (item: House) => {
          onEditParts(item)
        },
      },
      {
        title: '编辑',
        type: 'default',
        onClick: (item: House, i: number) => {
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
        onClick: async (row: House, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/house/get', {
      ...queryRef.current,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<House | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm(undefined)
  }
  const onEdit = (item: House, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const onEditCenter = (item: House) => {
    itemRef.current = item
    Form.dialog({
      title: '编辑中心点',
      width: '500px',
      initData: {
        ...item,
      },
      children: (
        <>
          <Form.Section>
            <Form.Item label="模型" required={true} valueKey='center_model_url'>
              <Edit.UploadFile api={uploadGltfApi} accept='.glb' tip='请上传单个.glb文件' />
            </Form.Item>
          </Form.Section>
        </>
      ),
      onConfirm: doEditCenter
    })
  }
  const doEditCenter = async (form: Record<string, any>) => {
    await post('/house/edit_center_model', {
      id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }
  const onEditParts = (item: House) => {
    Dialog.dialog({
      title: '分组',
      width: 'calc(100vw - 30px)',
      children: (
        <HousePartPage house={item} />
      ),
    })
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.id ? '/house/edit' : '/house/add', {
      id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }
  const onPublishChange = async (val: boolean, row: any) => {
    await post('/house/edit_publish', {
      id: row.id, is_publish: val
    })
  }
  const uploadPicApi = async (file: File) => {
    return await upload("/upload/upload_to_path", "pic", file);
  }
  const uploadGltfApi = async (file: File) => {
    return await upload("/upload/upload_to_path", "glb", file);
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
            <Form.Item label="封面" required={true} valueKey='pic'>
              <Edit.UploadImage api={uploadPicApi} />
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

  const onEditDetail = async (item: House, _i: number) => {
    itemRef.current = item
    const detail: any = await post('/house_detail/find', { house_id: item.id })
    Form.dialog({
      title: '详情',
      width: 'calc(100vw - 40px)',
      initData: detail,
      children: (
        <>
          <Form.Section>
            <Form.Item label="内容" required={true} valueKey='content' fullWidth={true}>
              <Edit.RichContent uploadImageApi={uploadApi} />
            </Form.Item>
          </Form.Section>
        </>
      ),
      onConfirm: doEditDetail
    })
  }
  const uploadApi = async (file: File) => {
    return await upload("/upload/upload_to_path", "pic", file);
  }
  const doEditDetail = async (form: Record<string, any>) => {
    await post('/house_detail/add_or_edit', {
      house_id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }

  // --------------------------------------------- 删除 ---------------------------------------------
  const doDelete = async (item: House, i: number) => {
    await post('/house/del', { id: item.id })
    tableRef.current?.removeRow(i)
  }

  return (
    <>
      <Form.FormQuery initData={queryRef.current} onReset={onReset} onSubmit={onQuery} >
        <Form.ItemQuery width={170} valueKey='id'>
          <Edit.InputNumber placeholder='ID' controls={false} dec={0} />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='search'>
          <Edit.Input placeholder='搜索' />
        </Form.ItemQuery>
        <Form.ItemQueryReset />
      </Form.FormQuery>
      <Table.Bar>
        <Button.Refresh onClick={onRefresh} />
        <Button.Add onClick={onAdd} />
      </Table.Bar>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
