import { useState } from 'react'
import { Table } from '@/tt_core/components/Table/index'
import Confirm, { confirm } from '@/tt_core/components/Confirm'

import { DemoItem, DEMO, demoColumns } from './index'

export default () => {

  const rows: DemoItem[] = [

    DEMO('普通Confirm', '普通确认框', () => {
      setOpen(true)
    }),

    DEMO('普通Confirm - 异步请求', '普通确认框', () => {
      setOpen1(true)
    }),

    DEMO('动态Confirm', '通过代码生成', () => {
      confirm({
        title: '确认框',
        message: '这里是提示',
        onConfirm: onConfirm
      })
    }),

    DEMO('动态Confirm - 异步请求', '通过代码生成', () => {
      confirm({
        title: '确认框',
        message: '这里是提示',
        onConfirm: onRequest
      })
    }),

  ]


  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  const onClose1 = () => {
    setOpen1(false)
  }

  const delay = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000);
    })
  }
  const onRequest = async () => {
    await delay()
  }
  const onConfirm = () => {
  }

  return (
    <>
      <Table columns={demoColumns} rows={rows} />
      <Confirm open={open} title='普通Dialog' onClose={onClose} onConfirm={onConfirm} />
      <Confirm open={open1} title='普通Dialog' onClose={onClose1} onConfirm={onRequest} />
    </>
  )
}