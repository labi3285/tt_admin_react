import { useState } from 'react'
import { Button } from 'antd'


import { Option } from '@/tt_core/components/index'

import * as Form from '@/tt_core/components/Form/index'
import * as Edit from '@/tt_core/components/Edit/index'
import * as Preview from '@/tt_core/components/Preview/index'

export default () => {

  const [preview, setPreview] = useState(true)

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
  }

  const onSubmit = (form: Record<string, any>) => {

    console.log(form)

  }

  return (

    <>

      <Form.Form
        preview={preview}
        initData={initData}
        onSubmit={onSubmit}
      >

        <Form.Title>预览切换</Form.Title>
        <Form.Section>
          <Form.Item label="字符串" required={true} valueKey='aString'>
            {preview ? <Preview.Text /> : <Edit.Input />}
          </Form.Item>
          <Form.Item label="选择" required={true} valueKey='aSelect'>
            {preview ? <Preview.Text options={options} /> : <Edit.Select options={options} />}
          </Form.Item>
          <Form.Item label="多选" required={true} valueKey='aSelectMutiple'>
            {preview ? <Preview.Text options={options} /> : <Edit.SelectMultiple options={options} />}
          </Form.Item>
          <Form.Item label="单选" required={true} valueKey='aRadio'>
            {preview ? <Preview.Tag options={options} /> : <Edit.Radio options={options} />}
          </Form.Item>
          <Form.Item label="单选" required={true} valueKey='aCheckbox'>
            {preview ? <Preview.Tag options={options} /> : <Edit.Checkbox options={options} />}
          </Form.Item>
        </Form.Section>

        <Form.Handler>
          <Form.ItemAction title={preview ? '编辑' : '预览'} action={() => {
            setPreview(!preview)
          }} />
          {!preview && <Form.ItemReset />}
          {!preview && <Form.ItemSubmit />} 
        </Form.Handler>
      </Form.Form>
    </>
  )
}