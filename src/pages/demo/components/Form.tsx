import { useState } from 'react'
import { Button } from 'antd'


import { Option } from '@/tt_core/components/index'

import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'

import { Form as AForm, Input, Flex } from 'antd'

const DemoListItem = (props: {
  value?: Record<string, any>
  onChange?: (value: Record<string, any>) => void
}) => {
  return (          
    <Flex gap='5px 5px'>
      <Edit.Input clear={false} placeholder='aaa' value={props.value?.aaa} onChange={(val) => {
        props.value!.aaa = val
        props.onChange && props.onChange({ ...props.value })
      }} />
      <Edit.Input clear={false} placeholder='bbb' value={props.value?.bbb} onChange={(val) => {
        props.value!.bbb = val
        props.onChange && props.onChange({ ...props.value })
      }} />
      <Edit.Input clear={false} placeholder='ccc' value={props.value?.ccc} onChange={(val) => {
        props.value!.ccc = val
        props.onChange && props.onChange({ ...props.value })
      }} />
    </Flex>
  )
}

export default () => {

  const options: Option<number>[] = [
    { label: 'Option0', value: 0 },
    { label: 'Option1', value: 1 },
    { label: 'Option2', value: 2 },
  ]

  const initData = {
    'aString': 'hello',
    'aSelect': 1,
    'aSelectMutiple': [0, 1],
    'aRadio': 1,
    'aCheckbox': [1],
    'aList': [
      {
        aaa: 'aaa'
      },
      {
        bbb: 'bbb'
      },
      {
        ccc: 'ccc'
      },
    ]
  }

  const onSubmit = (form: Record<string, any>) => {

    console.log(form)

  }

  return (

    <>

      <Form.Form
        initData={initData}
        onSubmit={onSubmit}
      >
        <Form.Title>预览切换</Form.Title>
        <Form.Section>
          <Form.Item label="字符串" required={true} valueKey='aString'>
            <Edit.Input />
          </Form.Item>
          <Form.Item label="选择" required={true} valueKey='aSelect'>
            <Edit.Select options={options} />
          </Form.Item>
          <Form.Item label="多选" required={true} valueKey='aSelectMutiple'>
            <Edit.SelectMultiple options={options} />
          </Form.Item>
          <Form.Item label="单选" required={true} valueKey='aRadio'>
            <Edit.Radio options={options} />
          </Form.Item>
          <Form.Item label="单选" required={true} valueKey='aCheckbox'>
            <Edit.Checkbox options={options} />
          </Form.Item>
        </Form.Section>

        <Form.Title>表单验证</Form.Title>
        <Form.Section>
          <Form.Item label="手机号" required={true} valueKey='aPhone' validator={(val: any) => {
            if (val.length != 11) {
              return '请输入手机号 位数不对'
            }
            if (!val.startsWith('1')) {
              return '请输入手机号'
            }
            return null
          }} >
            <Edit.Input placeholder='请输入手机号' />
          </Form.Item>
        </Form.Section>

        <Form.Title>列表</Form.Title>
        <Form.Section>
          <Form.Item label="列表" required={true} fullWidth={true} valueKey='aList'>
            <Form.SubList move={true} itemRender={(item, i) => {

              return <Form.SubItem key={i} index={i} validator={(val: Record<string, any>) => {
                if (!val.aaa) {
                  return 'aaa不能为空'
                }
                if (!val.bbb) {
                  return 'bbb不能为空'
                }
                if (!val.ccc) {
                  return 'ccc不能为空'
                }
                return null
              }}>
                <DemoListItem />
              </Form.SubItem>
            }} />




          </Form.Item>
        </Form.Section>

        <Form.Handler>

          <Form.ItemReset />
          <Form.ItemSubmit />
        </Form.Handler>

      </Form.Form>

    </>
  )
}