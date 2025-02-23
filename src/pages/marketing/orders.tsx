import { useRef, useState, useMemo, useEffect } from 'react'
import { App } from 'antd'
import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

import { post, upload } from '@/utils/request'

import { Order } from './types'
import { House } from '../house/types'

import OrderDetailPage from './order_detail'

export default () => {

  const statusOptions = [
    { value: 0, label: '待支付', color: '#999999' },
    { value: 1, label: '已完成', color: 'green' },
    { value: 2, label: '已支付', color: 'orange' },
    { value: 3, label: '支付失败', color: 'red' },
    { value: 4, label: '订单取消', color: '#999999' },
    { value: 5, label: '订单锁定', color: 'blue' },
    { value: 6, label: '生产中', color: 'blue' },
    { value: 7, label: '已生产', color: 'blue' },
    { value: 8, label: '已发货', color: 'blue' },
    { value: 9, label: '已收货', color: 'blue' },
    { value: 10, label: '实施中', color: 'blue' },
    { value: 11, label: '已实施', color: 'blue' },
  ]

  const [houses, setHouses] = useState<House[]>([])
  const houseOptions = useMemo(() => {
    return houses.map(e => {
      return { value: e.id, label: e.name }
    })
  }, [houses])
  useEffect(() => {
    post('/house/get', { is_publish: true }).then(res => {
      setHouses(res)
    })
  }, [])

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
  const tableColumns: () => Table.Column<Order>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '订单编号', valueKey: 'order_no', width: 260 },
    { title: '订单状态', valueKey: 'status', width: 80, render: Table.RenderTag(statusOptions) },
    { title: '图片', valueKey: 'pic', width: 100, render: Table.RenderImage({ width: 60 }) },
    { title: '户型', valueKey: 'title', width: 200 },
    { title: '销售ID', valueKey: 'associated_user_id', width: 200 },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<Order> = {
    title: '操作',
    width: 240,
    actions: [
      {
        title: '订单详情',
        type: 'default',
        onClick: (item: Order, i: number) => {
          onDetail(item)
        },
      },
      {
        title: '修改状态',
        type: 'primary',
        onClick: (item: Order, i: number) => {
          onEditStatus(item)
        },
      },
      {
        title: '同步ERP',
        type: 'primary',
        onClick: (item: Order, i: number) => {
          alert('建设中')
        },
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/order/get', {
      ...queryRef.current,
      type_code: 0,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  const onDetail = (item: Order) => {
    Dialog.dialog({
      title: '订单详情',
      width: 'calc(100vw - 30px)',
      children: (
        <OrderDetailPage order={item} />
      ),
    })
  }

  const itemRef = useRef<Order | null>(null)
  const onEditStatus = (item: Order) => {
    itemRef.current = item
    Form.dialog({
      title: '修改订单状态',
      width: '500px',
      initData: item,
      children: (
        <>
          <Form.Section>
            <Form.Item label="订单状态" valueKey='status'>
              <Edit.Select options={statusOptions} />
            </Form.Item>
          </Form.Section>
        </>
      ),
      onConfirm: doEditStatus
    })
  }
  const doEditStatus = async (form: Record<string, any>) => {
    await post('/order/edit_status', {
      id: itemRef.current?.id,
      ...form
    })
    tableRef.current?.reload()
  }

  return (
    <>
      <Form.FormQuery initData={queryRef.current} onReset={onReset} onSubmit={onQuery} >
        <Form.ItemQuery width={170} valueKey='id'>
          <Edit.InputNumber placeholder='ID' controls={false} dec={0} />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='order_no'>
          <Edit.Input placeholder='订单编号' />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='target_id'>
          <Edit.Select options={houseOptions} placeholder='户型' />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='associated_user_id'>
          <Edit.InputNumber placeholder='销售ID' controls={false} dec={0} />
        </Form.ItemQuery>
        <Form.ItemQuery width={170} valueKey='status'>
          <Edit.Select options={statusOptions} placeholder='订单状态' />
        </Form.ItemQuery>
        <Form.ItemQueryReset />
      </Form.FormQuery>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )



}
