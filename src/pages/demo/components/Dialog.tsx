import { useState } from 'react'
import Table from '@/tt_core/components/Table/Table'
import { DemoItem, DEMO, demoColumns } from './index'

import Dialog, { dialog } from '@/tt_core/components/Dialog/index'

export default () => {

  const rows: DemoItem[] = [

    DEMO('普通Dialog', '普通确认框', () => {
      setOpen(true)
    }),

    DEMO('普通Dialog - 异步请求', '普通确认框', () => {
      setOpen1(true)
    }),

    DEMO('动态Dialog', '通过代码生成', () => {
      dialog({
        title: '标题',
        onConfirm: onConfirm,
        children: <p>这里是内容</p>,
      })
    }),

    DEMO('动态Dialog - 异步请求', '通过代码生成', () => {
      dialog({
        title: '标题',
        onConfirm: onRequest,
        children: <p>这里是内容</p>,
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
    console.log('onRequest')
  }
  const onConfirm = () => {
    console.log('onConfirm')
  }

  return (
    <>
      <Table columns={demoColumns} rows={rows} />

      <Dialog open={open} title='标题' onClose={onClose} onConfirm={onConfirm}>
        <p>这里是内容</p>
      </Dialog>

      <Dialog open={open1} title='标题' onClose={onClose1} onConfirm={onRequest}>
        <p>这里是内容</p>
      </Dialog>
    </>
  )
}