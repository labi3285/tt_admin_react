import { useRef, useState, useMemo } from 'react'
import { App } from 'antd'
import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import { post, upload } from '@/utils/request'

import { News } from './types'

export default () => {

  const { message } = App.useApp()

  // --------------------------------------------- 查询 ---------------------------------------------
  const queryRef = useRef<Record<string, any>>({})
  const onQuery = async (form: Record<string, any>) => {
    queryRef.current = form
    tableRef.current?.reload()
  }
  const onReset = () => {
  }
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<News>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '标题', valueKey: 'title', width: 200 },
    { title: '封面', valueKey: 'pic', width: 150, render: Table.RenderImage({ width: 130 }) },
    { title: '描述', valueKey: 'desc', width: 400 },
    {
      title: '发布', valueKey: 'is_publish', width: 80, render: Table.RenderSwitch({
        valueType: 'boolean',
        onChange: onPublishChange
      })
    },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<News> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '详情',
        type: 'primary',
        onClick: (item: News, i: number) => {
          onEditDetail(item, i)
        },
      },
      {
        title: '编辑',
        type: 'default',
        onClick: (item: News, i: number) => {
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
        onClick: async (row: News, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/news/get', {
      ...queryRef.current,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<News | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm(undefined)
  }
  const onEdit = async (item: News, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.id ? '/news/edit' : '/news/add', {
      id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }
  const uploadApi = async (file: File) => {
    return await upload("/upload/upload_to_path", "news", file);
  }
  const onPublishChange = async (val: boolean, row: any) => {
    await post('/news/edit_publish', {
      id: row.id, is_publish: val
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
            <Form.Item label="标题" required={true} valueKey='title'>
              <Edit.Input />
            </Form.Item>
            <Form.Item label="封面" required={true} valueKey='pic'>
              <Edit.UploadImage api={uploadApi} />
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
  const onEditDetail = async (item: News, _i: number) => {
    itemRef.current = item
    const detail: any = await post('/news/find', { id: item.id })
    Form.dialog({
      title: '详情',
      width: 'calc(100vw - 40px)',
      initData: detail,
      children: (
        <>
          {/* <Form.Section>
            <Form.Item label="轮播图" required={true} valueKey='pics' fullWidth={true}>
              <Edit.UploadImages api={uploadApi} />
            </Form.Item>
          </Form.Section> */}
          <Form.Section>
            <Form.Item label="视频" required={true} valueKey='video'>
              <Edit.UploadVideo api={uploadApi} />
            </Form.Item>
          </Form.Section>
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
  const doEditDetail = async (form: Record<string, any>) => {
    await post('/news/edit_detail', {
      id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }

  // --------------------------------------------- 删除 ---------------------------------------------
  const doDelete = async (item: News, i: number) => {
    await post('/news/del', { id: item.id })
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
        <Button.Add onClick={onAdd} />
      </Table.Bar>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
