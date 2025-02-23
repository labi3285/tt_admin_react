import { useEffect, useRef, useState, useMemo } from 'react'

import * as Button from '@/tt_core/components/Button/index'
import * as Table from '@/tt_core/components/Table/index'
import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Dialog from '@/tt_core/components/Dialog/index'

// import HousePage from './user_role'

import { post, upload } from '@/utils/request'

import { House, HousePart, HouseAssemblyUnit, HouseAssemblyUnitStyle } from './types'

export interface Props {
  assemblyUnit?: HouseAssemblyUnit,
  onChange?: () => void,
}
export default (props: Props) => {

  const setup = () => {

  }

  // --------------------------------------------- 查询 ---------------------------------------------
  const onRefresh = () => {
    setup()
    tableRef.current?.reload()
  }
  const tableRef = useRef<Table.PageTableInterface>(null)
  const tableColumns: () => Table.Column<HouseAssemblyUnitStyle>[] = () => [
    { title: 'ID', valueKey: 'id', width: 80 },
    { title: '名称', valueKey: 'name', width: 150 },
    { title: '封面', valueKey: 'pic', width: 200, render: Table.RenderImage({ width: 160 }) },
    { title: '描述', valueKey: 'desc', width: 300 },
    { title: '发布', valueKey: 'is_publish', width: 80, render: Table.RenderSwitch({
      valueType: 'boolean',
      onChange: onPublishChange
    }) },
    { title: '更新时间', valueKey: 'update_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
    { title: '创建时间', valueKey: 'create_time', width: 180, render: Table.RenderDate('YYYY-MM-DD HH:mm:ss') },
  ]
  const tableOperationColumn: Table.OperationColumn<HouseAssemblyUnitStyle> = {
    title: '操作',
    width: 180,
    actions: [
      {
        title: '编辑',
        type: 'default',
        onClick: (item: HouseAssemblyUnitStyle, i: number) => {
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
        onClick: async (row: HouseAssemblyUnitStyle, i: number) => {
          await doDelete(row, i)
        }
      },
    ]
  }
  const onLoad = async (page_num: number, page_size: number) => {
    const page: any = await post('/house_assembly_unit_style/get', {
      house_id: props.assemblyUnit?.house_id,
      part_id: props.assemblyUnit?.part_id,
      assembly_unit_id: props.assemblyUnit?.id,
      page_num, page_size
    })
    return {
      rows: page.list,
      total: page.total
    }
  }

  // --------------------------------------------- 编辑 ---------------------------------------------
  const itemRef = useRef<HouseAssemblyUnitStyle | null>(null)
  const onAdd = () => {
    itemRef.current = null
    showEditForm({
      house_id: props.assemblyUnit?.house_id,
      part_id: props.assemblyUnit?.part_id,
      assembly_unit_id: props.assemblyUnit?.id,
    })
  }
  const onEdit = (item: HouseAssemblyUnitStyle, _i: number) => {
    itemRef.current = item
    showEditForm(item)
  }
  const onEditAssemblyUnits = (item: HouseAssemblyUnitStyle, i: number) => {
    Dialog.dialog({
      title: '角色列表',
      width: 'calc(100vw - 30px)',
      children: (
        <div />
      ),
    })
  }
  const doEdit = async (form: Record<string, any>) => {
    await post(itemRef.current?.id ? '/house_assembly_unit_style/edit' : '/house_assembly_unit_style/add', {
      id: itemRef.current?.id,
      house_id: props.assemblyUnit?.house_id,
      part_id: props.assemblyUnit?.part_id,
      assembly_unit_id: props.assemblyUnit?.id,
      ...form
    })
    tableRef.current?.reload()
  }
  const onPublishChange = async (val: boolean, row: any) => {
    await post('/house_assembly_unit_style/edit_publish', {
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
            <Form.Item label="模型" required={true} valueKey='model_url'>
              <Edit.UploadFile api={uploadGltfApi} accept='glb' tip='请上传单个.glb文件' />
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
  const doDelete = async (item: HouseAssemblyUnitStyle, i: number) => {
    await post('/house_assembly_unit_style/del', { id: item.id })
    tableRef.current?.removeRow(i)
  }

  return (
    <>
      <Table.Bar>
        <Button.Refresh onClick={onRefresh} />
        <Button.Add onClick={onAdd} />
      </Table.Bar>
      <Table.PageTable ref={tableRef} columns={tableColumns()} operationColumn={tableOperationColumn} onLoad={onLoad} />
    </>
  )
}
