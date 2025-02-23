import { useEffect, useRef, useState, useMemo } from 'react'

import { formatTimestamp } from '@/tt_core/utils/date'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Preview from '@/tt_core/components/Preview/index'
import * as Dialog from '@/tt_core/components/Dialog/index'
import { Steps } from 'antd'

import { post, upload } from '@/utils/request'

import { Order, OrderItem } from './types'

export interface Props {
  order?: Order,
  onChange?: () => void,
}
export default (props: Props) => {

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

  const [steps, setSteps] = useState<{ title: string, description: string }[]>([])
  const [houseInfo, setHouseInfo] = useState<{
    building_length?: number,
    building_width?: number,
    total_length?: number
    total_width?: number
    floor_heights?: string
  }>({})

  useEffect(() => {
    setup()
  }, [])

  const setup = () => {
    loadHouseInfo()
    loadSteps()
  }

  const loadHouseInfo = async () => {
    const info: any = await post('/order_house_assembly_unit_style/find_house_info', {
      order_id: props.order?.id,
    })
    setHouseInfo(info)
  }
  const loadSteps = async () => {
    const arr: any = await post('/order_status_record/get', {
      order_id: props.order?.id,
    })
    const steps = arr.map((e: any) => {
      let title = e.order_status
      for (const o of statusOptions) {
        if (o.value == e.order_status) {
          title = o.label
          break
        }
      }

      return {
        title,
        description: formatTimestamp(e.create_time)
      }
    })
    setSteps(steps)
  }

  // --------------------------------------------- 查询 ---------------------------------------------
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<OrderItem>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '户型', valueKey: 'house_name', width: 150 },
    { title: '分组', valueKey: 'part_name', width: 150 },
    { title: '组件', valueKey: 'unit_name', width: 150 },
    { title: '样式', valueKey: 'style_name', width: 150 },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]

  const tableOperationColumn = undefined
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/order_house_assembly_unit_style/get', {
      order_id: props.order?.id,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  return (
    <>
      <Form.Form
        preview={true}
        initData={props.order}
      >
        {/* <Form.Title>订单信息</Form.Title> */}
        <Form.Section>
          <Form.Item label="订单编号" valueKey='order_no'><Preview.Text /></Form.Item>
          <Form.Item label="产品名称" valueKey='title'><Preview.Text /></Form.Item>
          <Form.Item label="支付方式" valueKey='pay_type_name'><Preview.Text /></Form.Item>
          <Form.Item label="备注" fullWidth={true} valueKey='remark'><Preview.Text /></Form.Item>
        </Form.Section>

        <Form.Title>配送地址</Form.Title>
        <Form.Section>
          <Form.Item label="配送接收人" valueKey='deliver_name'><Preview.Text /></Form.Item>
          <Form.Item label="接收电话" valueKey='deliver_phone'><Preview.Text /></Form.Item>
          <Form.Item label="邮政编码：" valueKey='deliver_area_code'><Preview.Text /></Form.Item>
          <Form.Item label="详细地址" valueKey='deliver_address'><Preview.Text /></Form.Item>
        </Form.Section>

        <Form.Title>订单状态</Form.Title>
        <Steps
          direction="vertical"
          current={steps.length - 1}
          items={steps}
        />

        <Form.Title>用户定制</Form.Title>
        <Form.Section>
          <Form.Item label="建筑长" valueKey='none'>{ houseInfo.building_length }米</Form.Item>
          <Form.Item label="建筑宽" valueKey='none'>{ houseInfo.building_width }米</Form.Item>
          <Form.Item label="宅基地长" valueKey='none'>{ houseInfo.total_length }米</Form.Item>
          <Form.Item label="宅基地宽" valueKey='none'>{ houseInfo.total_width }米</Form.Item>
          <Form.Item label="层高" valueKey='none'>{ houseInfo.floor_heights }</Form.Item>
          
        </Form.Section>

        <Form.Title>零部件列表</Form.Title>
        <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />

      </Form.Form>

    </>
  )
}
