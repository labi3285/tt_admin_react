import { useState } from 'react'
import { Space } from 'antd'
import { Option } from '@/tt_core/components/index'

import * as Edit from '@/tt_core/components/Edit/index'

import { post } from '@/utils/demo_request'

export default () => {


  const options: Option<number>[] = [
    { label: 'Option0', value: 0 },
    { label: 'Option1', value: 1 },
    { label: 'Option2', value: 2 },
  ]

  const [input, setInput] = useState<string | undefined>()
  const [inputField, setInputField] = useState<string | undefined>()
  const [inputNumber, setInputNumber] = useState<number | undefined>()

  const [selectVal, setSelectVal] = useState<number | undefined>(1)
  const [selectVals, setSelectVals] = useState<number[] | undefined>([1])

  const [tags, setTags] = useState<string[] | undefined>(['tag1', 'tag2'])
  const [bool, setBool] = useState<boolean | undefined>(false)

  const [pic, setPic] = useState<string | undefined>()

  const uploadImageApi = async (file: File) => {
    const res: any = await post('/upload_pic', {})
    return res.url
  }

  return (

    <>
      <Space direction="vertical">

        <Edit.Input style={{ width: '200px' }} value={input} onChange={(val: string | undefined) => {
          console.log('change ->', val)
          setInput(val)
        }} />

        <Edit.InputPassword style={{ width: '200px' }} value={input} onChange={(val: string | undefined) => {
          console.log('change ->', val)
          setInput(val)
        }} />

        <Edit.Search style={{ width: '200px' }} value={input} onChange={(val: string | undefined) => {
          console.log('change ->', val)
          setInput(val)
        }} onSearch={(val: string | undefined) => {
          console.log('search ->', val)
          setInput(val)
        }}/>

        <Edit.InputField style={{ width: '200px' }} value={inputField} onChange={(val: string | undefined) => {
          console.log('change ->', val)
          setInputField(val)
        }} />

        <Edit.InputNumber style={{ width: '200px' }} value={inputNumber} min={0} max={99} step={0.01} dec={2} onChange={(val: number | undefined) => {
          console.log('change ->', val)
          setInputNumber(val)
        }} />

        <Edit.Select style={{ width: '200px' }} options={options} value={selectVal} onChange={(val: number | undefined) => {
          console.log('change ->', val)
          setSelectVal(val)
        }} />

        <Edit.SelectMultiple style={{ width: '200px' }} options={options} value={selectVals} onChange={(val: number[] | undefined) => {
          console.log('change ->', val)
          setSelectVals(val)
        }} />

        <Edit.Radio style={{ width: '200px' }} options={options} value={selectVal} onChange={(val: number | undefined) => {
          console.log('change ->', val)
          setSelectVal(val)
        }} />

        <Edit.Checkbox style={{ width: '200px' }} options={options} value={selectVals} onChange={(val: number[] | undefined) => {
          console.log('change ->', val)
          setSelectVals(val)
        }} />

        <Edit.EditTags style={{ width: '200px' }} value={tags} onChange={(val: string[] | undefined) => {
          console.log('change ->', val)
          setTags(val)
        }} />

        <Edit.Switch value={bool} onChange={(val: boolean | undefined) => {
          console.log('change ->', val)
          setBool(val)
        }} />

        <Edit.UploadImage value={pic} api={uploadImageApi} onChange={(val: string | undefined) => {
          console.log('change ->', val)
          setPic(val)
        }} />

      </Space>
    </>
  )
}